import * as hash from '../immu-hash/index.js'
import * as prove from '../immu-rfc6962/index.js'
import Long from 'long'
import type { RefEntryData } from '../types/index.js'
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
import type { TxWithRefEntryProofProps } from 'types/Proof-Entry-Ref.js'






export function refEntryInTxEntriesMht(props: {
    entry:  RefEntryData,
    proof:  EntryInTxEntriesMhtProof
}) {

    const entryHash = hash.ofRefEntry(props.entry)
    const entryHashLeaf = hash.leaf(entryHash)

    if (props.proof.entry !== undefined) {

        const entryTxEntriesMht = prove.rootFromInclusionProof({
            inclusionProofNodes:    props.proof.entry.entryInTxEntriesMht,
            lastLeafId:             Long.fromInt(props.proof.txTx.entriesCount, true),
            leafId:                 props.proof.entry.entryId, 
            leaf:                   entryHashLeaf,
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



export function txWithRefEntryInRefTx(props: {
    entry:  RefEntryData,
    refTx:  RefToTx,
    proof:  TxWithEntryInRefTxProof
}) {
    if(props.proof.txTx.id.greaterThanOrEqual(props.refTx.id)) {
        throw 'proof must be for txWithRefEntryInRefTx'
    }
    refEntryInTxEntriesMht(props)   // Entry in Entry entries Mht
    txInRefTx(props)                // Entry tx in: Ref tx
    return true as const            // ok
}



export function refTxInTxWithRefEntry(props: {
    entry: RefEntryData,
    refTx: RefToTx,
    proof: RefTxInTxWithEntryProof
}) {
    if(props.proof.txTx.id.greaterThanOrEqual(props.refTx.id)) {
        throw 'proof must be for refTxInTxWithRefEntry'
    }
    refEntryInTxEntriesMht(props)   // Entry in Entry entries Mht
    refTxInTx(props)                // Ref tx in: Entry tx
    return true as const            // ok
}



export function txWithRefEntryIsRefTx(props: {
    entry: RefEntryData,
    refTx: RefToTx,
    proof: TxWithEntryIsRefTxProof
}) {
    if(props.proof.txTx.id.notEquals(props.refTx.id)) {
        throw 'proof must be for txWithRefEntryIsRefTx'
    }
    refEntryInTxEntriesMht(props)   // Entry in Entry entries Mht
    txIsRefTx(props)                // Entry tx is Ref tx
    return true as const            // ok
}





export function txWithRefEntry(props: TxWithRefEntryProofProps) {

    switch(props.type) {
        case 'txWithRefEntryIsRefTx': return txWithRefEntryIsRefTx(props.data)
        case 'txWithRefEntryInRefTx': return txWithRefEntryInRefTx(props.data)
        case 'refTxInTxWithRefEntry': return refTxInTxWithRefEntry(props.data)
    }
    
}