import * as grpc from '@grpc/grpc-js'
import * as gi from '../../grpc/index.js'
import * as common from '../../common/index.js'
import * as getKV from './get.js'

import type { VerifiableGetRequest } from 'proto/immudb/schema/VerifiableGetRequest.js'
import type { VerifiableEntry__Output } from 'proto/immudb/schema/VerifiableEntry.js'
import type Long from 'long'



/**
 * 
 */
export function getVerifableKeyValue(
    ctx: {
        immudbGrpcApi:          gi.ImmudbGrpcApi,
        sessionCredentials?:    grpc.CallCredentials
    }, 
    props: VerifableGetKeyValueProps,
) {
    const {immudbGrpcApi, sessionCredentials} = ctx
    
    return immudbGrpcApi.verifiableGet({
        request: toRequest(props),
        credentials: sessionCredentials,
    })
    .then(result => ({
        info: result.info, 
        data: fromResponse(result.data)
    }))
    
}




export type VerifableGetKeyValueProps = {
    /**
     * Key to obtain
     */
    key: getKV.GetKeyValueProps,
    /**
     * Transaction number since when proof should be constructed
     */
    proveSinceTx: Long,
}


/**
 * Transforms CreateDatabaseProps to CreateDatabaseRequest.
 */
function toRequest(props: VerifableGetKeyValueProps): VerifiableGetRequest {
    
    return {
        keyRequest: getKV.toRequest(props.key),
        proveSinceTx: props.proveSinceTx,
    }
}




export type TransactionHeaderResult = {
    id:             Long,
    prevAlh:        Buffer,
    ts:             Long,
    nentries:       number,
    eH:             Buffer,
    blTxId:         Long,
    blRoot:         Buffer,
    version:        number,
}

export type TransactionEntryResult = {
    key:    Buffer,
    hValue: Buffer,
    vLen:   number,
    metadata?: {
        deleted:        boolean,
        expiration?:    Long,
        nonIndexable:   boolean,
    },
    value: Buffer,
}

export type ZEntryResult =  {
    set:    Buffer,
    key:    Buffer,
    entry?: getKV.GetKeyValueResult,
    score:  number | string,
    atTx:   Long,
}


export type GetVerifableKeyValueResult = {

    /**
     * Value of key as key-value with metadata and context
     */
    keyValue?: getKV.GetKeyValueResult,
    

    /**
     * 
     */
    verifiableTx?: {
        tx?: {
            header?:    TransactionHeaderResult,
            entries:    TransactionEntryResult[],
            kvEntries:  getKV.GetKeyValueResult[],
            zEntries:   ZEntryResult[]
        },
        signature?: {
            publicKey: Buffer,
            signature: Buffer,
        },
        dualProof?: {
            sourceTxHeader?:    TransactionHeaderResult,
            targetTxHeader?:    TransactionHeaderResult,
            inclusionProof:     Buffer[],
            consistencyProof:   Buffer[],
            lastInclusionProof: Buffer[],
            linearProof?: {
                sourceTxId:     Long,
                TargetTxId:     Long,
                terms:          Buffer[],
            },
            targetBlTxAlh:      Buffer,
        }
    },

    /**
     * Data needed from server to check key-value inclusion in
     * server database at client side
     */
    inclusionProof?: {
        leaf: number,
        width: number,
        terms: Buffer[]
    },
}

function fromResponse(response: VerifiableEntry__Output): GetVerifableKeyValueResult {
    
    return {
        keyValue: response.entry ? getKV.fromResponse(response.entry) : undefined,

        inclusionProof: response.inclusionProof ? {
            leaf:   response.inclusionProof.leaf,
            width:  response.inclusionProof.width,
            terms:  response.inclusionProof.terms,
        } : undefined,

        verifiableTx: response.verifiableTx ? {

            signature: response.verifiableTx.signature ? {
                publicKey:  response.verifiableTx.signature.publicKey,
                signature:  response.verifiableTx.signature.signature,
            } : undefined,

            dualProof: response.verifiableTx.dualProof ? {
                consistencyProof:   response.verifiableTx.dualProof.consistencyProof,
                inclusionProof:     response.verifiableTx.dualProof.inclusionProof,
                lastInclusionProof: response.verifiableTx.dualProof.lastInclusionProof,
                targetBlTxAlh:      response.verifiableTx.dualProof.targetBlTxAlh,
                linearProof:        response.verifiableTx.dualProof.linearProof
                                        ? response.verifiableTx.dualProof.linearProof
                                        : undefined,
                sourceTxHeader:     response.verifiableTx.dualProof.sourceTxHeader
                                        ? response.verifiableTx.dualProof.sourceTxHeader
                                        : undefined,
                targetTxHeader:     response.verifiableTx.dualProof.targetTxHeader
                                        ? response.verifiableTx.dualProof.targetTxHeader
                                        : undefined,
            } : undefined,

            tx: response.verifiableTx.tx ? {
                header: response.verifiableTx.tx.header ? {
                    blRoot:     response.verifiableTx.tx.header.blRoot,
                    blTxId:     response.verifiableTx.tx.header.blTxId,
                    eH:         response.verifiableTx.tx.header.eH,
                    id:         response.verifiableTx.tx.header.id,
                    nentries:   response.verifiableTx.tx.header.nentries,
                    prevAlh:    response.verifiableTx.tx.header.prevAlh,
                    ts:         response.verifiableTx.tx.header.ts,
                    version:    response.verifiableTx.tx.header.version,
                } : undefined,
                entries:    response.verifiableTx.tx.entries.map(entry => ({
                    hValue: entry.hValue,
                    key: entry.key,
                    value: entry.value,
                    vLen: entry.vLen,
                    metadata: entry.metadata ? {
                        deleted: entry.metadata.deleted,
                        nonIndexable: entry.metadata.nonIndexable,
                        expiration: entry.metadata.expiration?.expiresAt
                    } : undefined
                })),
                kvEntries:  response.verifiableTx.tx.kvEntries.map(getKV.fromResponse),
                zEntries:   response.verifiableTx.tx.zEntries.map(zEntry => ({
                    atTx: zEntry.atTx,
                    key: zEntry.key,
                    score: zEntry.score,
                    set: zEntry.set,
                    entry: zEntry.entry ? getKV.fromResponse(zEntry.entry) : undefined,
                })),
            } : undefined,

        } : undefined,
        
    }
}