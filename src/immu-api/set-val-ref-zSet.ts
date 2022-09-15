import { type ImmuServiceClient } from '../proto/immudb/schema/ImmuService.js'
import type * as types from '../types/index.js'
import * as immuConvert from '../immu-convert/index.js'
import * as grpcjs from '@grpc/grpc-js'
import * as immuGrpc from '../immu-grpc/index.js'
import * as buffer from '../buffer.js'
import Long from 'long'
import { Op } from 'proto/immudb/schema/Op.js'
import { SetVEntryProps } from './set-val-entry.js'
import { SetRefEntryProps } from './set-ref-entry.js'
import { SetZEntryProps } from './set-z-entry.js'
import { Chunk } from 'proto/immudb/schema/Chunk.js'


/**
 * Specifies how to set Entry.
 */
export type SetEntryProps = {
    /**
     * Operation options.
     */
    options?: {
        /**
         * Do not wait for ImmuDb to update database indexes, setting this
         * value to `true` may cause operation to speed up in exchange for
         * stale database latest keys values.
         *
         * For example geting key value will return key value pointed by
         * indexer. If indexer is not up to date, returned value may be not
         * latest value.
         *
         * Default value is `false`.
         */
        dontWaitForIndexer?: boolean,
    },
    /**
     * All conditions must be fullfilled for all key values.
     */
    preconditions?: types.ValOrRefKeyPrecondition[],
    /**
     * Operations.
     */
    ops: SetOperation[],
}


export type SetOperation = 
    | ({ type: 'val'  } & types.ValEntryData)
    | ({ type: 'ref'  } & SetRefEntryProps) 
    | ({ type: 'zSet' } & SetZEntryProps)


export function createSetEntries(client: ImmuServiceClient) {
    const execAllGrpc = immuGrpc.unaryCall.createExecAll(client)

    
    return function setEntries(props: SetEntryProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return execAllGrpc({
            request: {
                Operations:     props.ops.map(operationToGrpcOperation),
                preconditions:  props.preconditions?.map(
                    immuConvert.toPreconditionFromKVEntryPrecondition
                ),
                noWait:         props.options?.dontWaitForIndexer,
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('TxHeader__Output  must be defined')
        )
        .then(grpcTx => {
            const tx = immuConvert.toTxFromTxHeader__Output(grpcTx)
            return props.ops.map((entry, entryIndex) => operationToVerifiableOperation(
                entry, 
                tx, 
                entryIndex
            ))
        })
    }
}



function operationToGrpcOperation(op: SetOperation): Op {
    
    switch(op.type) {
        case 'val': return {
            operation: 'kv',
            kv: immuConvert.toKeyValueFromKVEntry(op)
        }
        case 'ref': return {
            operation: 'ref',
            ref: {
                referencedKey:  op.referToKey,
                key:            op.key,
                atTx:           op.keyTxId,
                boundRef:       op.boundRef,
                noWait:         op.options?.dontWaitForIndexer,
                preconditions:  op.preconditions?.map(
                    immuConvert.toPreconditionFromKVEntryPrecondition
                ),
            }
        }
        case 'zSet': return {
            operation: 'zAdd',
            zAdd: {
                set:        op.set,
                key:        op.key,
                score:      op.keyIndex,
                atTx:       op.keyTxId,
                noWait:     op.options?.dontWaitForIndexer,
                boundRef:   op.boundRef,
            },
        }
    }

    
}



function operationToVerifiableOperation(
    op: SetOperation, 
    tx: types.Tx,
    entryIndex: number
): types.ZEntryVerifiable | types.RefEntryVerifiable | types.ValEntryVerifiable {

    switch(op.type) {
        case 'val': return {
            type: 'val',
            entry: {
                key: op.key,
                val: op.val,
                meta: op.meta,
            },
            txId: tx.id,
            tx,
            id: entryIndex + 1,
        }
        case 'ref': return {
            type: 'ref',
            entry: {
                key: op.key,
                refKey: op.referToKey,
                refKeySeenFromTxId: op.keyTxId !== undefined
                    ? op.keyTxId
                    : op.boundRef === true 
                        ? tx.id
                        : Long.UZERO,
                meta: undefined,
            },
            txId: tx.id,
            tx: tx,
            id: entryIndex + 1,
        }
        case 'zSet': return {
            type: 'zSet',
            entry: {
                refKey: op.key,
                refKeySeenFromTxId: op.keyTxId ?? Long.UZERO,
                score: op.keyIndex,
                zSet: op.set,
            },
            txId: tx.id,
            tx: tx,
            id: entryIndex + 1,
        }
    }

}






export type SetEntriesStreamingProps = {
    chunks: AsyncIterable<Chunk>
}

export function createSetEntriesStreaming(client: ImmuServiceClient) {
    const streamExecAllGrpc = immuGrpc.writerCall.createStreamExecAll(client)

    
    /**
     * 
     * Example usage:
     * 
     * ```ts
     * 
     * const tx = setEntriesStreaming({chunks: fromExecEntriesGen([
     *     {
     *          type: 'kv', 
     *          entry: {
     *              key: Buffer.from('some key'), 
     *              val: Buffer.from('some val'),
     *          },
     *      },
     *     {
     *          type: 'zAdd', 
     *          entry: {
     *              set: Buffer.from('my set'), 
     *              score: 2, 
     *              key: Buffer.from('some key'),
     *          },
     *      },
     * ])})
     * 
     * ```
     */
    return function setEntriesStreaming(props: SetEntriesStreamingProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return streamExecAllGrpc({
            request: props.chunks,
            credentials: props.credentials,
        })
        .then(({res, info}) => res
            ? res 
            : Promise.reject('TxHeader__Output must be defined')
        )
        .then(txGrpc => immuConvert.toTxFromTxHeader__Output(txGrpc))
        
    }
}