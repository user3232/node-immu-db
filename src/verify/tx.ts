import * as hash from '../immu-hash/index.js'
import * as prove from '../immu-rfc6962/index.js'
import type { RefToTx } from 'types/Tx.js'
import type { 
    RefTxInTxProof, 
    TxInRefTxProof, 
    TxIsRefTxProof, 
    TxProofProps
} from 'types/Proof-Tx.js'






export function txInRefTx(props: {
    refTx:  RefToTx,
    proof:  TxInRefTxProof
}) {

    if(props.proof.txTx.id.greaterThanOrEqual(props.refTx.id)) {
        throw 'proof must be for txInRefTx'
    }

    // ************************************************
    // Tx in Ref prev txes Mht
    // ************************************************

    const txHash = hash.ofTxHeader(props.proof.txTx)
    const txHashLeaf = hash.leaf(txHash)

    const refPrevTxesMhtFromTx = prove.rootFromInclusionProof({
        leaf:                   txHashLeaf,
        leafId:                 props.proof.txTx.id,
        lastLeafId:             props.refTx.id.sub(1),
        inclusionProofNodes:    props.proof.txInRefPrevTxesMht
    })

    if (refPrevTxesMhtFromTx.equals(props.proof.refTx.prevTxesMht) === false) {
        throw 'proved refPrevTxesMhtFromtx must match proof.refTx.prevTxesMht'
    }

    // ************************************************
    // Ref prev tx in Ref prev txes Mht
    // ************************************************

    const refPrevTxHashLeaf = hash.leaf(props.proof.refTx.prevTxHash)

    const refPrevTxesMhtFromRefPrevTx = prove.rootFromInclusionProof({
        leaf:                   refPrevTxHashLeaf,
        leafId:                 props.refTx.id.sub(1),
        lastLeafId:             props.refTx.id.sub(1),
        inclusionProofNodes:    props.proof.refPrevTxInRefPrevTxesMht
    })

    if (refPrevTxesMhtFromRefPrevTx.equals(props.proof.refTx.prevTxesMht) === false) {
        throw 'proved refPrevTxesMhtFromRefPrevTx must match proof.refTx.prevTxesMht'
    }

    // ************************************************
    // Ref tx hash matches proof ref tx hash
    // ************************************************

    const refTxHash = hash.ofTxHeader(props.proof.refTx)

    if (refTxHash.equals(props.refTx.hash) === false) {
        throw 'computed refTxHash must match refTx.hash'
    }

    return true as const
}







export function refTxInTx(props: {
    refTx: RefToTx,
    proof: RefTxInTxProof
}) {

    if(props.refTx.id.greaterThanOrEqual(props.proof.txTx.id)) {
        throw 'proof must be for refTxInTx'
    }
    

    // ************************************************
    // Ref tx hash matches proof ref tx hash
    // ************************************************


    const refTxHash = hash.ofTxHeader(props.proof.refTx)

    if (refTxHash.equals(props.refTx.hash) === false) {
        throw 'computed proof.refTx must match refTx.hash'
    }


    // ************************************************
    // Ref prev tx in:
    //   Ref prev txes Mht 
    //   and Tx prev txes Mht
    // ************************************************

    if(props.proof.refTx.id.isEven()) {
        if (hash.leaf(props.proof.refTx.prevTxHash).equals(props.proof.refTxInRefPrevTxesMhtAndTxPrevTxesMht[0]) === false) {
            console.log('fail 2: hash.leaf(props.proof.refTx.prevTxHash)')
            // throw 'hash.leaf(props.proof.refTx.prevTxHash) must match proof.refTxInRefPrevTxesMhtAndTxPrevTxesMht[0]'
        }
    }


    const {
        sourceRoot: refPrevTxesMht,
        targetRoot: txPrevTexsMht,
    } = prove.rootsFromConsistencyProof({
        sourceSize: props.refTx.id.sub(1),
        targetSize: props.proof.txTx.id.sub(1),
        proofNodes: props.proof.refTxInRefPrevTxesMhtAndTxPrevTxesMht
    })
    

    if (refPrevTxesMht.equals(props.proof.refTx.prevTxesMht) === false) {
        throw 'refPrevTxesMht must match proof.refTx.prevTxesMht'
    }
    if (txPrevTexsMht.equals(props.proof.txTx.prevTxesMht) === false) {
        throw 'txPrevTexsMht must match proof.txTx.prevTxesMht'
    }


    // ************************************************
    // Tx prev tx in: Tx prev txes
    // ************************************************

    const txPrevTxHashLeaf = hash.leaf(props.proof.txTx.prevTxHash)

    const txPrevTxesMhtFromTxPrevTx = prove.rootFromLastLeafInclusionProof({
        lastLeaf:                       txPrevTxHashLeaf,
        lastLeafId:                     props.proof.txTx.id.sub(1),
        lastLeafInclusionProofNodes:    props.proof.txPrevTxInTxPrevTxesMht
    })

    if (txPrevTxesMhtFromTxPrevTx.equals(props.proof.txTx.prevTxesMht) === false) {
        throw 'proved txPrevTxesMhtFromTxPrevTx must match proof.txTx.prevTxesMht'
    }


    

    

    return true as const
}





export function txIsRefTx(props: {
    refTx: RefToTx,
    proof: TxIsRefTxProof
}) {

    if(props.proof.txTx.id.notEquals(props.refTx.id)) {
        throw 'proof must be for txIsRefTx'
    }

    
    // ************************************************
    // Tx and Ref prev tx in Tx and Ref prev txes Mht
    // ************************************************

    const entryAndRefPrevTxHashLeaf = hash.leaf(props.proof.txTx.prevTxHash)

    const entryAndRefPrevTxesMhtFromEntryAndRefPrevTx = prove.rootFromInclusionProof({
        leaf:                   entryAndRefPrevTxHashLeaf,
        leafId:                 props.refTx.id.sub(1),
        lastLeafId:             props.refTx.id.sub(1),
        inclusionProofNodes:    props.proof.txPrevTxInRefPrevTxesMht
    })

    if (entryAndRefPrevTxesMhtFromEntryAndRefPrevTx.equals(props.proof.txTx.prevTxesMht) === false) {
        throw 'proved entryAndRefPrevTxesMhtFromEntryAndRefPrevTx must match proof.entryAndRefTx.prevTxesMht'
    }

    // ************************************************
    // Ref tx hash matches proof ref tx hash
    // ************************************************

    const entryAndRefTxHash = hash.ofTxHeader(props.proof.txTx)

    if (entryAndRefTxHash.equals(props.refTx.hash) === false) {
        throw 'computed entryAndRefTxHash must match refTx.hash'
    }

    return true as const
}







export function tx(props: TxProofProps) {

    switch(props.type) {
        case 'txIsRefTx': return txIsRefTx(props.data)
        case 'txInRefTx': return txInRefTx(props.data)
        case 'refTxInTx': return refTxInTx(props.data)
    }
    
}