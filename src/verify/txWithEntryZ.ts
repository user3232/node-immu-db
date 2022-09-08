import * as hash from '../immu-hash/index.js'
import * as prove from '../immu-rfc6962/index.js'
import Long from 'long'
import type { ZEntry } from '../types/index.js'
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
import type { RefTx } from 'types/Tx.js'
import type { TxWithZEntryProofProps } from 'types/Proof-Entry-Z.js'






export function zEntryInTxEntriesMht(props: {
    entry:  ZEntry,
    proof:  EntryInTxEntriesMhtProof
}) {

    const entryHash = hash.ofZEntry(props.entry)
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



export function txWithZEntryInRefTx(props: {
    entry:  ZEntry,
    refTx:  RefTx,
    proof:  TxWithEntryInRefTxProof
}) {
    if(props.proof.txTx.id.greaterThanOrEqual(props.refTx.id)) {
        throw 'proof must be for txWithZEntryInRefTx'
    }
    zEntryInTxEntriesMht(props)     // Entry in Entry entries Mht
    txInRefTx(props)                // Entry tx in: Ref tx
    return true as const            // ok
}



export function refTxInTxWithZEntry(props: {
    entry: ZEntry,
    refTx: RefTx,
    proof: RefTxInTxWithEntryProof
}) {
    if(props.proof.txTx.id.greaterThanOrEqual(props.refTx.id)) {
        throw 'proof must be for refTxInTxWithZEntry'
    }
    zEntryInTxEntriesMht(props)     // Entry in Entry entries Mht
    refTxInTx(props)                // Ref tx in: Entry tx
    return true as const            // ok
}



export function txWithZEntryIsRefTx(props: {
    entry: ZEntry,
    refTx: RefTx,
    proof: TxWithEntryIsRefTxProof
}) {
    if(props.proof.txTx.id.notEquals(props.refTx.id)) {
        throw 'proof must be for txWithZEntryIsRefTx'
    }
    zEntryInTxEntriesMht(props)     // Entry in Entry entries Mht
    txIsRefTx(props)                // Entry tx is Ref tx
    return true as const            // ok
}





export function txWithZEntry(props: TxWithZEntryProofProps) {

    switch(props.type) {
        case 'txWithZEntryIsRefTx': return txWithZEntryIsRefTx(props.data)
        case 'txWithZEntryInRefTx': return txWithZEntryInRefTx(props.data)
        case 'refTxInTxWithZEntry': return refTxInTxWithZEntry(props.data)
    }
    
}