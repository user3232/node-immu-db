import { EntryMetadata } from "./EntryMetadata.js"
import { Buffer } from 'node:buffer'
import Long from 'long'



/**
 * Represents key value pair with optional additional properties
 */
export type ValEntryData = {
    /** Key. */
    key: Buffer,
    /** Value */
    val: Buffer,
    /** Additional properties. */
    meta?: EntryMetadata
}

export type ValEntry = {
    type: 'val',
} & ValEntryData


/**
 * {@link ValEntryData} entry and additional informations about
 * entry transaction context and ImmuDb server indexer.
 * 
 * This structure is returned from query operations.
 */
export type IndexerInfo = {
    /** 
     * Entry indexer context - entry revision.
     * 
     * (Assuming that for same key (different) values was set
     * multiple times, `revision` number is sequence number of
     * set operation.)
     */
    revision:       Long,
    /** 
     * Entry indexer context - is entry expired?
     * 
     * Query operation will return expired entries.
     */
    expired:        boolean,
}

