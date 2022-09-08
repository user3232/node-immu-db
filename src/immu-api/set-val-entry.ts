import { type ImmuServiceClient } from '../proto/immudb/schema/ImmuService.js'
import type * as types from '../types/index.js'
import * as immuConvert from '../immu-convert/index.js'
import * as grpcjs from '@grpc/grpc-js'
import * as immuGrpc from '../immu-grpc/index.js'
import * as buffer from '../buffer.js'
import * as verify from '../verify/index.js'
import * as hash from '../immu-hash/index.js'
import * as rfc6962 from '../immu-rfc6962/index.js'

import { Chunk } from 'proto/immudb/schema/Chunk.js'
import Long from 'long'
import { RefTx, Tx, TxProofProps, TxWithKVEntryProofProps } from '../types/index.js'
import { VerifiableTx__Output } from 'proto/immudb/schema/VerifiableTx.js'


export type SetVEntryProps = {
    /**
     * Array of key value pairs to set.
     */
    kvs: types.ValEntry[], 
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
    refTx: RefTx
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


            const proof = grpcValProofToValProof(verifiableTxGrpc, props.refTx)
            verify.tx(proof)

            return {
                entries: valEntries,
                verified: proof,
            }
        })
    }
}






function grpcValProofToValProof(
    proofGrpc: VerifiableTx__Output,
    refTx: RefTx,
): TxProofProps {

    if(proofGrpc.tx?.header == undefined) {
        throw 'verTx must be defined'
    }
    const verTx = immuConvert.toTxFromTxHeader__Output(proofGrpc.tx?.header)
    // console.log('verTx')
    // console.log(verTx)
    // console.log('refTx')
    // console.log(refTx)


    if(proofGrpc.dualProof == undefined) {
        throw 'DualProof__Output must be defined'
    }

    // console.log('proofGrpc.dualProof.consistencyProof.length')
    // console.log(proofGrpc.dualProof.consistencyProof.length)
    // console.log('proofGrpc.dualProof.inclusionProof.length')
    // console.log(proofGrpc.dualProof.inclusionProof.length)
    // console.log('proofGrpc.dualProof.lastInclusionProof.length')
    // console.log(proofGrpc.dualProof.lastInclusionProof.length)

    const type = verTxAndRefTxToProofType(verTx, refTx)
    // console.log('type')
    // console.log(type)

    switch(type) {
        case 'txInRefTx': return {
            type,
            data: {
                refTx,
                proof: {
                    txTx: verTx,
                    refTx: refTx.tx 
                        ? refTx.tx
                        : immuConvert.toTxFromTxHeader__Output(proofGrpc.dualProof?.targetTxHeader),
                    txInRefPrevTxesMht:         proofGrpc.dualProof.inclusionProof,
                    refPrevTxInRefPrevTxesMht:  proofGrpc.dualProof.lastInclusionProof,
                }
            }
        } 
        case 'refTxInTx': return {
            type,
            data: {
                refTx,
                proof: {
                    txTx: verTx,
                    refTx: refTx.tx 
                        ? refTx.tx
                        : immuConvert.toTxFromTxHeader__Output(proofGrpc.dualProof?.sourceTxHeader),
                    txPrevTxInTxPrevTxesMht:                proofGrpc.dualProof.lastInclusionProof,
                    refTxInRefPrevTxesMhtAndTxPrevTxesMht:  proofGrpc.dualProof.consistencyProof,
                }
            }
        }
        case 'txIsRefTx': return {
            type,
            data: {
                refTx,
                proof: {
                    txTx: verTx,
                    txPrevTxInRefPrevTxesMht: proofGrpc.dualProof.lastInclusionProof,
                }
            }
        }
    }

    
}


function verTxAndRefTxToProofType(
    verTx: Tx,
    refTx: RefTx,
): TxProofProps['type'] {
    switch(verTx.id.compare(refTx.id)) {
        case -1:    return 'txInRefTx'
        case 0:     return 'txIsRefTx'
        case 1:     return 'refTxInTx'
    }

    throw 'verTx.id id to refTx.id comparizon unknown value.'
}