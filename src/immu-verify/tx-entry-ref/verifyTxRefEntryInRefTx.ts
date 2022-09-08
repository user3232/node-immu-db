import * as hash from '../../immu-hash/index.js'
import * as immu from '../../immu-rfc6962/index.js'
import * as toBinary from '../../immu-binary-format/index.js'
import * as conv from '../../immu-convert/index.js'
import Long from 'long'
import { InclusionProof__Output } from 'proto/immudb/schema/InclusionProof.js'
import { Entry__Output } from 'proto/immudb/schema/Entry.js'
import { VerifiableTx__Output } from 'proto/immudb/schema/VerifiableTx.js'


/**
 * Vefifies tx entry reference is in Mht of tx previous to refTx. More strightforward
 * would be tx is in refTx Mht, but it also is valid proof.
 */
export function verifyTxRefEntryInRefTx(props: {
    entry: Entry__Output,
    txInRefTxProof: VerifiableTx__Output,
    refTx: {
        hash: Buffer,
        id: Long,
    }
}) {

    // ************************************************
    // Ref Entry
    // ************************************************

    if(props.entry.referencedBy === null) {
        throw 'This should be ref entry'
    }
    // compute entries MHT

    // hash entry: (KV entry data kept in hash are only: key, value, metadata)
    const entryRefHash = hash.ofRefEntry({
        key:            props.entry.key,
        refKey:  props.entry.referencedBy.key,
        refKeySeenFromTxId:         props.entry.referencedBy.atTx,
        meta:       conv.toEntryMetadataFromKVMetadata__Output(
            props.entry.referencedBy.metadata
        )
    })
    const entryRefHashLeaf = hash.leaf(entryRefHash)


    // compute entries mht (from entry hash and entryInTxProof)
    const entriesMht = entryRefHashLeaf


    // entries mht must be in transaction of entry
    if (props.txInRefTxProof.tx?.header?.eH.equals(entriesMht) === false) {
        throw 'Transaction entries mht does not mach between computed and proof'
    }


    // ************************************************
    // Tx
    // ************************************************

    // assume content entry tx

    if (!props.txInRefTxProof.tx?.header) {
        throw 'Transaction of entry must be defined in txInRefTxProof'
    }
    const tx = props.txInRefTxProof.tx?.header

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
    // but it is valid proof.):
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