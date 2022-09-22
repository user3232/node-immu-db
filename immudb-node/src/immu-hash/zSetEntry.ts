import * as immu from '../types/index.js'
import * as hash from './hash.js'
import * as buffer from '../buffer.js'
import { Buffer } from 'node:buffer'
import { PrefixKeyVal, PrefixValVal } from './consts.js'
import { entryMetaToBuffer } from './EntryMetadata.js'





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






/**
 * 
 * Hashes zSet entry as sha256 of:
 * 
 * - metadataLength - length of binary encoded metadata - UInt16BE,
 * - metadata - metadata - bytes
 * - prefixedZSetKeyLength - UInt16BE,
 * - prefixedZSetKey:
 *   - prefixKey - `0x00` - byte
 *   - zSetKey:
 *     - prefixZSet - `0x01` - byte
 *     - zSetLength - UInt16BE,
 *     - zSet - bytes,
 *     - score - Double64BE,
 *     - prefixedRefKeyLength - UInt16BE,
 *     - prefixedRefKey:
 *       - prefix - `0x00` - byte,
 *       - refKey - bytes
 * - sha256 of:
 *   - prefixValue - `0x00` - byte
 *   - value - empty
 * 
 */
 export function hashOfZSetEntry(props: immu.ZSetEntry): Buffer {


    const meta = entryMetaToBuffer(props.meta)
    const metaLength = meta.byteLength


    const prefixKey = PrefixKeyVal
    const prefixKeyLength = prefixKey.byteLength


    const prefixZSet = Buffer.of(0x01)
    const zSetLength = buffer.fromUInt16BE(props.zSet.length)
    const zSet = props.zSet
    const zSetRefScore = buffer.fromDoubleBe(props.referredKeyScore)

    const prefixReferredKey = Buffer.of(0x00)
    const referredKey = props.referredKey
    const prefixReferredKeyLength = prefixReferredKey.byteLength
    const referredKeyLength = props.referredKey.byteLength
    const prefixedReferredKeyLength = buffer.fromUInt16BE(
        prefixReferredKeyLength 
        + referredKeyLength
    )
    const referredKeyAtTxId = Buffer.from(props.referredAtTxId.toBytesBE())

    const zSetKey = [
        prefixZSet, 
        zSetLength,
        zSet,
        zSetRefScore,
        prefixedReferredKeyLength,
        [
            prefixReferredKey,
            referredKey
        ],
        referredKeyAtTxId
    ]
    
    const zSetKeyLength = 
        prefixZSet.byteLength
        + zSetLength.byteLength
        + zSet.byteLength
        + zSetRefScore.byteLength
        + prefixedReferredKeyLength.byteLength
        + prefixReferredKey.byteLength
        + referredKey.byteLength
        + referredKeyAtTxId.byteLength
        + prefixReferredKey.byteLength



    const prefixValue = PrefixValVal
    const value = Buffer.of()


    const entryHash = hash.ofTreeBuffers(
        buffer.fromUInt16BE(metaLength),
        meta,
        buffer.fromUInt16BE(prefixKeyLength + zSetKeyLength), 
        [
            prefixKey,
            zSetKey,
        ],
        hash.ofTreeBuffers(
            prefixValue, 
            value, 
        )
    )

    
    return entryHash
}