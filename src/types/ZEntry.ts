import { Buffer } from 'node:buffer'
import Long from 'long'



/** Represents Z Entry. */
export type ZEntry = {
    /** Z Entry set. */
    zSet: Buffer,
    /** Z Entry index in the set. */
    score: number,
    /** Z Entry referenced entry key. */
    refKey: Buffer,
    /** 
     * Z Entry referenced entry is locked to transaction with id
     * (database revision with id).
     * 
     * Value of this property (value) equal to {@link Long.UZERO} 
     * means reference to latest key value.
     */
    refKeySeenFromTxId: Long,
}

