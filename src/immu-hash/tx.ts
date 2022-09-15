import * as immu from '../types/A.js'
import * as rfc6962 from '../immu-rfc6962/index.js'
import * as hash from './hash.js'
import * as buffer from '../buffer.js'
import * as binary from '../immu-binary-format/index.js'
import Long from 'long'
import { hashOfEntry } from './entry.js'
import * as kvm from '../immu-kvm/index.js'
import * as binEntry from '../immu-entry/index.js'
import { PrefixMhtLeaf } from './consts.js'




export function hashOfTxCore(tx: immu.TxCore) {
    return hash.ofBuffers(
        Buffer.from(tx.id.toBytesBE()),               // id
        tx.prevTxHash,                                // previous tx hash
        hash.ofBuffers(                                 
            Buffer.from(tx.timestamp.toBytesBE()),    // timestamp
            buffer.fromUInt16BE(1),                      // header version
            buffer.fromUInt16BE(0),                      // empty tx metadata
            buffer.fromUInt32BE(tx.allEntriesCount),  // tx entries count
            tx.allEntriesMht,                         // tx entries mht hash
            Buffer.from(tx.id.sub(1).toBytesBE()),    // previous tx id
            tx.prevTxesMht,                           // previous tx'es mht hash
        )
    )
}

export function hashOfTxHash(tx: immu.TxHash): Buffer {
    return tx.txHash
}


export function hashOfTxFull(
    tx: immu.TxFull
) {
    const allEntriesMht = new rfc6962.MemoryMht(
        tx.allEntries.map(allEntry => {
            return hash.ofBuffers(PrefixMhtLeaf, hashOfEntry(allEntry))
        })
    ).getRoot()
    
    const txHash = hashOfTxAnonymous({
        type:               'tx',
        txType:             'anonymous',
        version:            '1',
        id:                 tx.id,
        timestamp:          tx.timestamp,
        prevTxesMht:        tx.prevTxesMht,
        prevTxHash:         tx.prevTxHash,
        allEntriesMht:      allEntriesMht,
        allEntriesCount:    tx.allEntries.length,
    })

    return {
        hash:       txHash,
        entriesMht: allEntriesMht,
    }
}






/**
 * Output is construced as fallows, hash (sha256) of:
 * - trasaction id - UInt64 BE
 * - hash of previous transaction immu binary format - sha256, 32 Bytes
 * - hash of (sha256, 32 Bytes):
 *   - timestamp - seconds since unix - UInt64 BE
 *   - binary format version - UInt16 BE
 *   - metadata binary form:
 *     - transaction metadata total length - UInt16 BE
 *     - property (in arbitrary order), as of v1 there are none:
 *       - property tag - UInt8 BE
 *       - property value - bytes.
 *   - entries (KVs) count - UInt32 BE
 *   - entries MHT hash - hash (sha256, 32 Bytes)
 *   - previous database last transaction id - UInt64 BE
 *   - previous database MHT - hash (sha256, 32 Bytes) 
 */
export function hashOfTxAnonymous(
    props: immu.TxAnonymous
) {
    return hash.ofBuffers(
        Buffer.from(props.id.toBytesBE()),               // id
        props.prevTxHash,                                // previous tx hash
        hash.ofBuffers(                                 
            Buffer.from(props.timestamp.toBytesBE()),    // timestamp
            buffer.fromUInt16BE(1),                      // header version
            buffer.fromUInt16BE(0),                      // empty tx metadata
            buffer.fromUInt32BE(props.allEntriesCount),  // tx entries count
            props.allEntriesMht,                         // tx entries mht hash
            Buffer.from(props.id.sub(1).toBytesBE()),    // previous tx id
            props.prevTxesMht,                           // previous tx'es mht hash
        )
    )
}








