import type { AnyProofProps } from 'types/Proof-Entry.js'
import { tx } from './tx.js'
import { txWithEntry } from './txWithEntryKV.js'
import { txWithRefEntry } from './txWithEntryRef.js'
import { txWithZEntry } from './txWithEntryZ.js'



export function anything(props: AnyProofProps) {
    switch(props.type) {
        case 'tx':  return tx(props.data)
        case 'kv':  return txWithEntry(props.data)
        case 'ref': return txWithRefEntry(props.data)
        case 'z':   return txWithZEntry(props.data)
    }
}