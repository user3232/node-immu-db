import * as hash from '../immu-hash/index.js'
import * as prove from '../immu-rfc6962/index.js'
import Long from 'long'
import type { ValEntryData } from '../types/index.js'
import { 
    refTxInTx, 
    txInRefTx, 
    txIsRefTx 
} from './tx.js'
import type { 
    EntryInTxEntriesMhtProof,
    RefTxInTxWithEntryProof, 
    TxWithEntryInRefTxProof, 
    TxWithEntryIsRefTxProof, 
} from 'types/Proof-Entry.js'
import type { RefToTx } from 'types/Tx.js'
import type { TxWithKVEntryProofProps } from 'types/Proof-Entry-KV.js'




export function entryInTxEntriesMht(props: {
    entry:  ValEntryData,
    proof:  EntryInTxEntriesMhtProof
}) {

    const entryHash = hash.ofEntry(props.entry)
    const entryHashLeaf = hash.leaf(entryHash)

    if (props.proof.entry !== undefined ) {

        const entryTxEntriesMht = prove.rootFromInclusionProof({
            leaf:                   entryHashLeaf,
            leafId:                 props.proof.entry.entryId, 
            lastLeafId:             Long.fromInt(props.proof.txTx.entriesCount, true),
            inclusionProofNodes:    props.proof.entry.entryInTxEntriesMht,
        })
    
        if (props.proof.txTx.entriesMht.equals(entryTxEntriesMht) === false) {
            throw 'proved entryTxEntriesMht must match proof.entryTx.entriesMht'
        }
    
        return true as const
    }
    else {

        if (props.proof.txTx.entriesMht.equals(entryHashLeaf) === false) {
            throw 'proved entryHashLeaf must match proof.entryTx.entriesMht'
        }
    
        return true as const
    }
    
}



export function txWithEntryInRefTx(props: {
    entry:  ValEntryData,
    refTx:  RefToTx,
    proof:  TxWithEntryInRefTxProof
}) {
    if(props.proof.txTx.id.greaterThanOrEqual(props.refTx.id)) {
        throw 'proof must be for txWithEntryInRefTx'
    }
    entryInTxEntriesMht(props)  // Entry in Entry entries Mht
    txInRefTx(props)            // Entry tx in: Ref tx
    return true as const        // ok
}



export function refTxInTxWithEntry(props: {
    entry: ValEntryData,
    refTx: RefToTx,
    proof: RefTxInTxWithEntryProof
}) {
    if(props.proof.txTx.id.greaterThanOrEqual(props.refTx.id)) {
        throw 'proof must be for refTxInTxWithEntry'
    }
    entryInTxEntriesMht(props)  // Entry in Entry entries Mht
    refTxInTx(props)            // Ref tx in: Entry tx
    return true as const        // ok
}



export function txWithEntryIsRefTx(props: {
    entry: ValEntryData,
    refTx: RefToTx,
    proof: TxWithEntryIsRefTxProof
}) {
    if(props.proof.txTx.id.notEquals(props.refTx.id)) {
        throw 'proof must be for txWithEntryIsRefTx'
    }
    entryInTxEntriesMht(props)  // Entry in Entry entries Mht
    txIsRefTx(props)            // Entry tx is Ref tx
    return true as const        // ok
}





export function txWithEntry(props: TxWithKVEntryProofProps) {

    switch(props.type) {
        case 'txWithKVEntryIsRefTx': return txWithEntryIsRefTx(props.data)
        case 'txWithKVEntryInRefTx': return txWithEntryInRefTx(props.data)
        case 'refTxInTxWithKVEntry': return refTxInTxWithEntry(props.data)
    }

}