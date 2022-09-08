import {TxHeader__Output} from 'proto/immudb/schema/TxHeader.js'
import Long from 'long'
import { fromUInt16BE, fromUInt32Be } from '../buffer.js'
import * as hash from './hash.js'
import { Tx } from 'types/Tx.js'






/**
 * Formats transaction header to immu binary representation v1 and hashes.
 * 
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
 * 
 * Total length: 8 + 32 + 32 = 72 Bytes.
 */
 export function ofTxHeader(props: Tx) {

    return hash.ofBuffers(
        Buffer.from(props.id.toBytesBE()),              // id
        props.prevTxHash,                         // previous tx hash
        hash.ofBuffers(                                 // hash of:
            Buffer.from(props.timestamp.toBytesBE()),   // timestamp
            fromUInt16BE(props.version),                // header version
            fromUInt16BE(0),                            // empty tx metadata
            fromUInt32Be(props.entriesCount),           // tx entries count
            props.entriesMht,                           // tx entries mht hash
            Buffer.from(props.id.sub(1).toBytesBE()),   // previous tx id
            props.prevTxesMht,                     // previous tx'es mht hash
        )
    )
    
}



/**
 * Formats transaction header to immu binary representation v1 and hashes.
 * 
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
 * 
 * Total length: 8 + 32 + 32 = 72 Bytes.
 */
export function ofTxHeader__Output(props: TxHeader__Output) {

    return hash.ofBuffers(
        Buffer.from(props.id.toBytesBE()),          // id
        props.prevAlh,                              // previous tx hash
        hash.ofBuffers(                             // hash of:
            Buffer.from(props.ts.toBytesBE()),      // timestamp
            fromUInt16BE(props.version),            // header version
            fromUInt16BE(0),                        // empty tx metadata
            fromUInt32Be(props.nentries),           // tx entries count
            props.eH,                               // tx entries mht hash
            Buffer.from(props.blTxId.toBytesBE()),  // previous tx id
            props.blRoot,                           // previous tx'es mht hash
        )
    )
    
}
