import { EntryMetadata } from "./EntryMetadata.js"
import { Buffer } from 'node:buffer'
import Long from 'long'



/** Represents Reference Entry. */
export type RefEntry = {
    /** Reference Entry additional properties. */
    meta?: EntryMetadata,
    /** Reference key. */
    key: Buffer,
    /** Reffered entry key. */
    refKey: Buffer,
    /** 
     * Reference is locked to transaction with id
     * (database revision with id).
     * 
     * Value of this property (value) equal to {@link Long.UZERO} 
     * means reference to latest key value.
     */
    refKeySeenFromTxId: Long,
}


/**
 * {@link RefEntry} entry and additional informations about
 * entry transaction context and ImmuDb server indexer.
 * 
 * This structure is returned from query operations.
 */
 export type RefEntryWithInfo = RefEntry & {
    /** Ref Entry. */
    refEntry:       RefEntry,
    /** Entry transaction context - transaction id. */
    transactionId:  Long,
    /** 
     * Entry indexer context - entry revision.
     * 
     * (Assuming that for same key (different) values was set
     * multiple times, `revision` number is sequence number of
     * set operation.)
     */
    revision:       Long,
    // /** 
    //  * Entry indexer context - is entry expired?
    //  * 
    //  * Query operation will return expired entries.
    //  */
    // expired:        boolean,
}