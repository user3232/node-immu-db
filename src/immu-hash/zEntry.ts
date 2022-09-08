import Long from 'long'
import * as hash from './hash.js'
import * as buffer from '../buffer.js'
import { Buffer } from 'node:buffer'
import { ZEntry } from '../types/index.js'

/**
 * Hashes zSet entry as hash of fallowing buffers:
 * - metadata binary Buffer length as UInt16 BE Buffer
 * - metadata binary as Buffer
 * - zSet Prefix length + zSet key length as UInt16 BE Buffer
 * - zSet prefix (0x01) as UInt8 Buffer
 * - zSet key
 * - score as Double BE Buffer
 * - referenced key prefix length plus referenced key length as UInt16 BE Buffer
 * - referenced key prefix (0x00) as UInt8 Buffer
 * - referenced key as Buffer
 * - referenced key transaction id as UInt64 BE Buffer
 * - value hash of:
 *   - empty value as Buffer
 */
export function ofZEntry(props: ZEntry): Buffer {



    return hash.ofBuffers(
        buffer.fromUInt16BE(0),                 // kv meta length
        buffer.fromUInt16BE(
            1                                   // zSet prefix length
            + props.zSet.length                 // zSet length
            // + 8                                 // score length
            // + 1                                 // referencedKey prefix length
            // + props.referencedKey.length        // referencedKey length
            // + 8                                 // atTxId length
        ),
        Buffer.of(0x01),                        // zSet prefix
        buffer.fromUInt16BE(props.zSet.length), // zSet length
        props.zSet,                             // zSet
        buffer.fromDoubleBe(props.score),       // score
        buffer.fromUInt16BE(
            1 +                                 // referencedKey prefix length
            props.refKey.length          // referencedKey length
        ),
        Buffer.of(0x00),                        // referencedKey prefix
        props.refKey,                    // referencedKey
        Buffer.from(props.refKeySeenFromTxId.toBytesBE()),  // transaction of referenced key
        hash.ofBuffers(
                                                // empty value
        ),
    )
}

// Example zSet key obtainde from scanTxes:
// 
// 01 00 00 00 00 00 00 00 01 42 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 02 00 0d 00 00 00 00 00 00 00 00
// pz-   z   length          - z-   score               -                       -pk- k-  key seen from tx id
// 
// Corresponding zEntry
// {
//     set: Buffer.from('B'),
//     key: Buffer.of(13),
//     keyIndex: 2,
// }