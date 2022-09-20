import * as buffer from '../buffer.js'
import { Buffer } from 'node:buffer'
import { ZEntryData } from '../types/index.js'


/**
 * Binary formats zSet entry fallowing buffers:
 * - metadata binary Buffer length as UInt16 BE Buffer
 * - metadata binary as Buffer Buffer
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
export function fromZEntry(props: ZEntryData): Buffer[] {
    return [
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
        // buffer.fromUInt16Be(props.zSet.length), // zSet length
        props.zSet,                             // zSet
        buffer.fromDoubleBe(props.score),       // score
        buffer.fromUInt16BE(
            1 +                                 // referencedKey prefix length
            props.refKey.length          // referencedKey length
        ),
        Buffer.of(0x00),                        // referencedKey prefix
        props.refKey,                    // referencedKey
        Buffer.from(props.refKeySeenFromTxId.toBytesBE())
    ]
}


/**
 * Binary formats zSet entry fallowing buffers:
 * - metadata binary Buffer length as UInt16 BE Buffer
 * - metadata binary as Buffer Buffer
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
 export function fromZEntry2(
    props: ZEntryData
): {
    key: Buffer[], 
    val: Buffer[],
    meta: Buffer[],
} {
    return {
        meta: [
            buffer.fromUInt16BE(0),                 // kv meta length
            Buffer.of(),                            // kv meta
        ],
        key: [
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
            Buffer.from(props.refKeySeenFromTxId.toBytesBE()),  // atTxId
        ],
        val: [
            Buffer.of()                             // value is empty
        ]
}
}



/**
 * Creates {@link ZEntryData} from ZEntry binary format defined as fallows:
 * - metadata binary Buffer length as UInt16 BE Buffer
 * - metadata binary as Buffer Buffer
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
 export function toZEntry(zEntryBuf: Buffer): ZEntryData {

    const kvMetaLength = buffer.toUInt16BE(zEntryBuf, 0)
    const zSetKeyLength = buffer.toUInt16BE(zEntryBuf, 2)
    const zSetPrefix = zEntryBuf.subarray(4, 4 + 1)
    const zSetSetLength = buffer.toUInt16BE(zEntryBuf, 4 + 1)
    const zSetSet = zEntryBuf.subarray(4 + 1, 4 + 1 + zSetSetLength)
    const zSetScore = buffer.toDoubleBe(zEntryBuf, 4 + 1 + zSetSetLength)
    const zSetRefKeyPrefixAndRefKeyLength = buffer.toUInt16BE(zEntryBuf, 4 + 1 + zSetSetLength + 8)
    const zSetRefKeyPrefix = zEntryBuf.subarray(4 + 1 + zSetSetLength + 8, 4 + 1 + zSetSetLength + 8 + 1)
    const zSetRefKey = zEntryBuf.subarray(4 + 1 + zSetSetLength + 8 + 1, 4 + 1 + zSetSetLength + 8 + zSetRefKeyPrefixAndRefKeyLength)
    const zSetAtTx = buffer.toUInt64BE(zEntryBuf, 4 + 1 + zSetSetLength + 8 + zSetRefKeyPrefixAndRefKeyLength)
    
    return {
        zSet: zSetSet,
        score: zSetScore,
        refKey: zSetRefKey,
        refKeySeenFromTxId: zSetAtTx,
    }
}

