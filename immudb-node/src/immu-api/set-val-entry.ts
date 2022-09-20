import { type ImmuServiceClient } from 'immudb-grpcjs/immudb/schema/ImmuService.js'
import type * as types from '../types/index.js'
import * as immuConvert from '../immu-convert/index.js'
import * as grpcjs from '@grpc/grpc-js'
import * as immuGrpc from '../immu-grpc/index.js'
import * as buffer from '../buffer.js'
import * as hash from '../immu-hash/index.js'
import * as rfc6962 from '../immu-rfc6962/index.js'
import type * as immu from '../types/A.js'

import { Chunk } from 'immudb-grpcjs/immudb/schema/Chunk.js'
import Long from 'long'
import { RefToTx, Tx, TxProofProps, TxWithKVEntryProofProps } from '../types/index.js'
import { VerifiableTx__Output } from 'immudb-grpcjs/immudb/schema/VerifiableTx.js'


export type SetVEntryProps = {
    /**
     * Array of key value pairs to set.
     */
    kvs: types.ValEntryData[], 
    /**
     * All conditions must be fullfilled for all key values.
     */
    preconditions?: types.ValOrRefKeyPrecondition[], 
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
    }
}


export function createSetValEntries(client: ImmuServiceClient) {
    const setGrpc = immuGrpc.unaryCall.createSet(client)

    /**
     * Sets key-value pair(s) for given session defined in credentials
     */
    return function setVEntries(props: SetVEntryProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        

        return setGrpc({
            request: {
                KVs:            props.kvs.map(immuConvert.toKeyValueFromKVEntry),
                noWait:         props.options?.dontWaitForIndexer,
                preconditions:  props.preconditions?.map(
                    immuConvert.toPreconditionFromKVEntryPrecondition
                ),
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('tx must be defined')
        )
        .then(txGrpc => {
            const tx = immuConvert.toTxFromTxHeader__Output(txGrpc)
            const vEntries: (types.ValEntryVerifiable & {id: number})[] = props.kvs.map((vEntry, entryIndex) => ({
                type: 'val',
                entry: vEntry,
                txId: tx.id,
                tx,
                id: entryIndex + 1,
            }))

            return vEntries
        })
    }
}



export type SetValEntriesStreamingProps = {
    chunks: AsyncIterable<Chunk>
}

export function createSetValEntriesStreaming(client: ImmuServiceClient) {
    const streamSetGrpc = immuGrpc.writerCall.createStreamSet(client)

    
    /**
     * 
     * Example usage: 
     * 
     * ```ts
     * 
     * const tx = setValEntriesStreaming({chunks: fromKVEntries([
     *     {
     *          key: Buffer.from('some key'), 
     *          val: Buffer.from('some val'),
     *      },
     *     {
     *          key: Buffer.from('other key'), 
     *          val: Buffer.from('other val'),
     *      },
     * ])})
     * 
     * ```
     */
    return function setValEntriesStreaming(props: SetValEntriesStreamingProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return streamSetGrpc({
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



export type ProofRequestProps = {
    refTx: RefToTx
}



export function createSetValEntriesGetProof(client: ImmuServiceClient) {
    const setGrpc = immuGrpc.unaryCall.createVerifiableSet(client)

    /**
     * Sets key-value pair(s) for given session defined in credentials
     */
    return function setValEntriesGetProof(props: SetVEntryProps & ProofRequestProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        

        return setGrpc({
            request: {
                setRequest: {
                    KVs:            props.kvs.map(immuConvert.toKeyValueFromKVEntry),
                    noWait:         props.options?.dontWaitForIndexer,
                    preconditions:  props.preconditions?.map(
                        immuConvert.toPreconditionFromKVEntryPrecondition
                    ),
                },
                proveSinceTx: props.refTx.id,
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('VerifiableTx__Output must be defined')
        )
        .then(verifiableTxGrpc => {
            // console.log('set value result:')
            // console.dir(verifiableTxGrpc, {depth: 10})

            const tx = immuConvert.toTxFromTxHeader__Output(verifiableTxGrpc?.tx?.header)
            const valEntries: types.ValEntryVerifiable[] = props.kvs.map((vEntry, entryIndex) => ({
                type: 'val',
                entry: vEntry,
                txId: tx.id,
                tx,
                id: entryIndex + 1,
            }))
            
            
            const entriesHashes = valEntries.map(vEntry => hash.ofEntry(vEntry.entry))
            const entriesMhtHash = new rfc6962.MemoryMht(entriesHashes).getRoot()

            if(tx.entriesMht.equals(entriesMhtHash) === false) {
                throw 'tx.entriesMht must equal computed entriesMhtHash'
            }


            // const proof = grpcValProofToValProof(verifiableTxGrpc, props.refTx)
            // verify.tx(proof)

            return {
                entries: valEntries,
                // verified: proof,
            }
        })
    }
}

























