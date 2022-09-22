import { type ImmuServiceClient } from 'immudb-grpcjs/immudb/schema/ImmuService.js'
import type * as immu from '../types/index.js'
import * as grpcjs from '@grpc/grpc-js'
import * as immuGrpc from '../immu-grpc/index.js'
import * as igt from '../immu-grpc-tx/index.js'
import * as ige from '../immu-grpc-entry/index.js'
import * as igp from '../immu-grpc-precond/index.js'
import * as ver from '../immu-verification/index.js'
import * as ike from '../immu-kvm-entry/index.js'
import { Chunk } from 'immudb-grpcjs/immudb/schema/Chunk.js'
import Long from 'long'


export type SetVEntryProps = {
    /**
     * Array of key value pairs to set.
     */
    kvms: immu.KeyValMeta[], 
    /**
     * All conditions must be fullfilled for all key values.
     */
    preconditions?: immu.ValOrRefKeyPrecondition[], 
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
                KVs:            props.kvms.map(ike.kvmToGrpcKeyValue),
                noWait:         props.options?.dontWaitForIndexer,
                preconditions:  props.preconditions?.map(
                    igp.precondToGrpcPrecond
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

            const txCore = igt.grpcTxHeaderToTxCore(txGrpc)
            const valEntries = props.kvms.map(
                grpcEntry => ike.kvmToValTxEntry(grpcEntry, txCore.id)
            )

            return {valEntries, txCore}
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
        .then(igt.grpcTxHeaderToTxCore)
        
    }
}



export type ProofRequestProps = {
    refTxId:    Long,
    refHash:    Buffer,
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
                    KVs:            props.kvms.map(ike.kvmToGrpcKeyValue),
                    noWait:         props.options?.dontWaitForIndexer,
                    preconditions:  props.preconditions?.map(
                        igp.precondToGrpcPrecond
                    ),
                },
                proveSinceTx: props.refTxId,
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('VerifiableTx__Output must be defined')
        )
        .then(grpcVerTx => {
            if(grpcVerTx.tx?.header == undefined) {
                throw 'grpcVerTx.tx?.header must be defined'
            }
            return ver.verificationAndTxFromGrpcVerTx({
                grpcVerTx,
                refHash: props.refHash,
                refTxId: props.refTxId,
            })
            
        })
    }
}

























