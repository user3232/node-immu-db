import { VerifiableTx__Output } from '../proto/immudb/schema/VerifiableTx.js';
import * as immu from '../types/A.js'
import * as binEntry from '../immu-entry/index.js'
import Long from 'long'
import * as txCore from '../immu-tx-core.js'


export function checkVerificationType(props: {
    verId: Long,
    refId: Long,
}): immu.VerificationTxType {
    switch(props.verId.compare(props.refId)) {
        case -1:    return 'tx-prev-in-ref-prev'
        case 0:     return 'tx-is-ref'
        case 1:     return 'ref-prev-in-tx-prev'
    }

    throw 'bad comparizon value'
}




export function verificationAndTxFromGrpcVerTx(props: {
    grpcVerTx:  VerifiableTx__Output,
    txId:       Long,
    refTxId:    Long,
    refHash:    Buffer,
}): {
    transaction: immu.Transaction,
    verification: immu.Verification,
} {
            
    const grpcTx = props.grpcVerTx.tx
    const grpcProof = props.grpcVerTx.dualProof

    if(grpcTx?.header == undefined) {
        throw 'transaction must be defined'
    }
    if(grpcProof?.sourceTxHeader == undefined) {
        throw 'sourceTxHeader must be defined'
    }
    if(grpcProof?.targetTxHeader == undefined) {
        throw 'targetTxHeader must be defined'
    }

    // console.log('grpcProof')
    // console.dir(grpcProof, {depth: 10})
    

    const entries:  immu.Entry[]    = grpcTx.entries.map(binEntry.grpcEntryToEntry)
    const tx:       immu.TxCore     = txCore.fromGrpcTxHeader(grpcTx.header)
    
    

    // grpcProof.targetBlTxAlh


    const verificationEntries: immu.VerificationEntriesAllOf = {
        type:           'all-of',
        allEntries:     entries,
        allEntriesMht:  tx.allEntriesMht,
    }

    let verificationTx: immu.VerificationTx
    const txVerificationType = checkVerificationType({
        verId: props.txId,
        refId: props.refTxId,
    })

    // console.log('txVerificationType:', txVerificationType)

    switch(txVerificationType) {
        case 'tx-prev-in-ref-prev':
            verificationTx = {
                type: 'tx-prev-in-ref-prev',
                ref:  txCore.fromGrpcTxHeader(grpcProof.targetTxHeader),
                refHash: {
                    type:       'tx-hash',
                    version:    '1',
                    txHash:     props.refHash,
                    id:         props.refTxId,
                },
                tx,
                refPrevTxInRefPrevTxesMht:  grpcProof.lastInclusionProof,
                txPrevInRefPrevTxesMht:     grpcProof.inclusionProof,
            }
            break
        case 'ref-prev-in-tx-prev':
            verificationTx = {
                type: 'ref-prev-in-tx-prev',
                ref:  txCore.fromGrpcTxHeader(grpcProof.sourceTxHeader),
                refHash: {
                    type:       'tx-hash',
                    version:    '1',
                    txHash:     props.refHash,
                    id:         props.refTxId,
                },
                tx,
                txPrevTxInTxPrevTxesMht:    grpcProof.inclusionProof,
                refPrevTxInRefPrevTxesMhtAndTxPrevTxesMht: grpcProof.consistencyProof
            }
            break
        case 'tx-is-ref':
            verificationTx = {
                type: 'tx-is-ref',
                refHash: {
                    type:       'tx-hash',
                    version:    '1',
                    txHash:     props.refHash,
                    id:         props.refTxId,
                },
                tx,
                txPrevTxInRefPrevTxesMht: grpcProof.lastInclusionProof
            }
            break
    }

    const verification: immu.Verification = {
        entries:    verificationEntries,
        tx:         verificationTx
    }



    const transaction: immu.Transaction = {
        id:         props.txId,
        timestamp:  tx.timestamp,
        entries:    entries,
    }


    return {
        transaction,
        verification
    }

}