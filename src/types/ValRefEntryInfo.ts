import { RefEntryWithInfo } from "./RefEntry.js"
import { IndexerInfo, ValEntry } from "./ValEntry.js"
import { Buffer } from 'node:buffer'
import Long from 'long'



/**
 * Represents associated:
 * - ref entry info {@link RefEntryWithInfo} 
 * - and kv entry info {@link ValEntryInfo}.
 */
 export type ValRefEntryInfo = {
    /** `ref` associated KV entry info. */
    valEntry:     ValEntry & IndexerInfo,
    /** `kv` associated Ref entry info. */
    refEntry:    RefEntryWithInfo,
}


/**
 * Represents {@link ValEntryInfo} or {@link ValRefEntryInfo}.
 */
export type ValOrRefEntryInfo = {
    type: 'val',
    data: ValEntry & IndexerInfo,
} | {
    type: 'ref',
    data: ValRefEntryInfo,
}