import * as hash from '../../immu-hash/index.js'
import * as immu from '../../immu-rfc6962/index.js'
import * as toBinary from '../../immu-binary-format/index.js'
import Long from 'long'
import { InclusionProof__Output } from 'proto/immudb/schema/InclusionProof.js'
import { Entry__Output } from 'proto/immudb/schema/Entry.js'
import { VerifiableTx__Output } from 'proto/immudb/schema/VerifiableTx.js'
import { ZAddRequest__Output } from 'proto/immudb/schema/ZAddRequest.js'



/**
 * This alghoritm proves that previous tx to refTx is
 * in Mht of previous tx to refTx and previous tx to entry tx.
 * 
 * This is not the same that entry Tx is in Mht of entry Tx
 * and entry Tx Mht contain refTx.
 * 
 * We will not try to convince ourself that it is the same,
 * so this method will always return false.
 * 
 * (This alghoritm is absurd, we want banana not gorilla without banana,
 * but for now, unfortunately it is this way.)
 */
export function verifyTxZEntryInTxAfterRefTx(props: {
    zEntry: ZAddRequest__Output,
    txInRefTxProof: VerifiableTx__Output,
    refTx: {
        hash: Buffer,
        id: Long,
    }
}) {

    // ************************************************
    // Z Entry
    // ************************************************

    if(typeof props.zEntry.score !== 'number') {
        throw 'zEntry score must be number'
    }

    // hash entry: (KV entry data kept in hash are only: key, value, metadata)
    const entryRefHash = hash.ofZEntry({
        zSet: props.zEntry.set,
        refKeySeenFromTxId: props.zEntry.atTx,
        refKey: props.zEntry.key,
        score: props.zEntry.score
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

    // assume content of Ref Tx
    // this will be source in this case

    // tx proofs must be available
    if (!props.txInRefTxProof.dualProof) {
        throw 'Proofs must be defined'
    }
    const proofs = props.txInRefTxProof.dualProof


    // assume refTx data
    if (!props.txInRefTxProof.dualProof.sourceTxHeader) {
        throw 'proof refTx must be defined'
    }
    const refTx = props.txInRefTxProof.dualProof.sourceTxHeader

    // compute hash of refTx from proof
    const refTxHash = toBinary.fromTxHeader__Output_v1(refTx)
    const refTxHashLeaf = hash.leaf(refTxHash)

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
    // After ref tx
    // ************************************************

    // Assume content 

    // assume afterRefTx data - in this case `targetTxHeader`
    // means intermediate transaction on which join to
    // afterRefTx will happen
    if (!props.txInRefTxProof.dualProof.targetTxHeader) {
        throw 'proof refTx must be defined'
    }
    const afterRefTx = props.txInRefTxProof.dualProof.targetTxHeader

    // compute hash of afterRefTx from proof
    const afterRefTxHash = toBinary.fromTxHeader__Output_v1(afterRefTx)

    
    // check if proof afterRefTx id is greater than refTx id
    if (afterRefTx.id.greaterThan(props.refTx.id) === false) {
        throw 'refTx id does not match proof refTx id'
    }
    // check if proof afterRefTx previous tx id matches afterRefTx id - 1
    if (afterRefTx.id.sub(1).notEquals(afterRefTx.blTxId)) {
        throw 'afterRefTx id - 1 value does not match proof afterRefTx previous tx id'
    }


    // ************************************************
    // Inclusions
    // ************************************************

    // refTx is included in afterRefTx
    // (refTx hash is included in mht of previous tx to afterRefTx)


    // compute mht of transactions previous to afterRefTx
    // using assumed tx hash and inclusion proof
    const computedPreviousTxMhtToAfterRefTx = immu.rootFromInclusionProof({
        leaf:                   refTxHashLeaf,
        leafId:                 props.refTx.id,
        lastLeafId:             afterRefTx.id.sub(1),
        inclusionProofNodes:    proofs.inclusionProof
    })

    // check if refTx previous tx mht matches computed value
    // (or in another words if tx is in refTx)
    if (afterRefTx.blRoot.equals(computedPreviousTxMhtToAfterRefTx) === false) {
        throw 'entry tx is not included in afterRefTx'
    }



    // ************************************************
    // Consistency (afterRefTx contains refTx)
    // ************************************************

    // refTx in refTx mht and refTx in previous transaction to afterRefTx mht
    // have common proof nodes
    const {
        sourceRoot: computedTxMhtOfTxPreviousToRefTx,
        targetRoot: computedTxMhtOfTxPreviousToAfterRefTx,
    } = immu.rootsFromConsistencyProof({
        proofNodes: proofs.consistencyProof,
        sourceSize: props.refTx.id.sub(1),
        targetSize: afterRefTx.id.sub(1),
    })
    // check if refTx previous tx mht matches computed value
    // (or in another words if tx is in refTx)
    if (afterRefTx.blRoot.equals(computedTxMhtOfTxPreviousToAfterRefTx) === false) {
        throw 'tx previous to refTx is not included in Mht of tx previous to afterRefTx in consistency proof'
    }
    if (refTx.blRoot.equals(computedTxMhtOfTxPreviousToRefTx) === false) {
        throw 'tx previous to refTx is not included in Mht of tx previous to refTx in consistency proof'
    }
    // weird that proof contains leaf...
    if(refTx.prevAlh.equals(proofs.consistencyProof[0])) {
        throw 'tx previous to refTx does not match.'
    }

    // ************************************************
    // Last Inclusion 
    // (previous tx to afterRefTx contains previous tx to afterRefTx)
    // (this seems unneccessary since that was proven in Consistency)
    // ************************************************


    const computedTxMhtOfTxPreviousToAfterRefTx2 = immu.rootFromLastLeafInclusionProof({
        lastLeafInclusionProofNodes: proofs.lastInclusionProof,
        lastLeaf: hash.leaf(afterRefTx.prevAlh),
        lastLeafId: afterRefTx.id.sub(1)
    })
    // check if refTx previous tx mht matches computed value
    // (or in another words if tx is in refTx)
    if (afterRefTx.blRoot.equals(computedTxMhtOfTxPreviousToAfterRefTx2) === false) {
        throw 'tx previous to refTx is not included in Mht of tx previous to afterRefTx in last inclusion proof'
    }

    // ************************************************
    // Summary
    // ************************************************

    // Above proves that previous transaction is in Mht of previous tx of new tx
    // state. This is absurd, not what we wanted, and not proves what we wanted.
    
    return {
        verifies: false as const,
        refTx: props.refTx,
        // newRefTx: afterRefTx,
    }

    // for fixed proof we would return:
    // return {
    //     verifies: true as const,
    //     refTx: afterRefTx,
    // }
}