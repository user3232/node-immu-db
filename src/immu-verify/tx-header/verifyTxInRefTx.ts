import * as hash from '../../immu-hash/hash.js'
import * as immu from '../../immu-rfc6962/index.js'
import * as toBinary from '../../immu-binary-format/index.js'
import Long from 'long'
import { Buffer } from 'node:buffer'
import { VerifiableTx__Output } from 'proto/immudb/schema/VerifiableTx.js'
import { TxHeader__Output } from 'proto/immudb/schema/TxHeader.js'



/**
 * Vefifies tx is in Mht of tx previous to refTx. More strightforward
 * would be tx is in refTx Mht, period ., but it also is valid proof.
 */
 export function verifyTxInRefTx(props: {
    tx: TxHeader__Output,
    txInRefTxProof: VerifiableTx__Output,
    refTx: {
        hash: Buffer,
        id: Long,
    }
}) {


    // ************************************************
    // Tx
    // ************************************************

    const tx = props.tx

    // make assumed tx into hash, and leaf
    const txHash = toBinary.fromTxHeader__Output_v1(tx)
    const txHashLeaf = hash.leaf(txHash)


    // ************************************************
    // Ref Tx
    // ************************************************


    // tx proofs must be available
    if (!props.txInRefTxProof.dualProof) {
        throw 'Proofs must be defined'
    }
    const proofs = props.txInRefTxProof.dualProof

    

    // assume refTx data
    if (!props.txInRefTxProof.dualProof.targetTxHeader) {
        throw 'proof refTx must be defined'
    }
    const refTx = props.txInRefTxProof.dualProof.targetTxHeader

    // compute hash of refTx from proof
    const refTxHash = toBinary.fromTxHeader__Output_v1(refTx)

    // check if proof refTx hash matches refTx hash
    if (props.refTx.hash.equals(refTxHash) === false) {
        throw 'refTx hash does not match proof refTx hash'
    }
    // check if proof refTx id matches refTx id
    if (props.refTx.id.notEquals(refTx.id)) {
        throw 'refTx id does not match proof refTx id'
    }
    // check if proof refTx previous tx id matches refTx id - 1
    if (props.refTx.id.sub(1).notEquals(refTx.blTxId)) {
        throw 'refTx id - 1 value does not match proof refTx previous tx id'
    }


    // ************************************************
    // Inclusions
    // ************************************************


    // compute mht of transactions previous to refTx
    // using assumed tx hash and inclusion proof
    const previousTxToRefTxMht = immu.rootFromInclusionProof({
        leaf:                   txHashLeaf,
        leafId:                 tx.id,
        lastLeafId:             props.refTx.id.sub(1),
        inclusionProofNodes:    proofs.inclusionProof
    })

    // check if refTx previous tx mht matches computed value
    // (or in another words if tx is in refTx)
    if (refTx.blRoot.equals(previousTxToRefTxMht) === false) {
        throw 'entry tx is not included in refTx'
    }


    // ************************************************
    // Summary
    // ************************************************


    // that is it! (weird..., more strightforward would be tx is in refTx Mht,
    // period ., but it is valid proof.):
    // - entry is in tx hash matching proof tx
    // - reference tx hash matches proof reference tx
    // - entry tx hash is included in reference tx previous tx mht
    //
    // this concludes that entity giving proof was in possesion (at some time at
    // least) of all transactions up to reference tx allowing to compute mht and
    // entry inclusion
    return {
        verifies: true as const,
        refTx: props.refTx,
    }
}