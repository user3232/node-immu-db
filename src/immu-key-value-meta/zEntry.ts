import * as buffer from '../buffer.js'
import { Buffer } from 'node:buffer'
import { ZEntry } from '../types/index.js'
import Long from 'long'




export function keyValMetaToZEntry(props: {
    key: Buffer,
    val: Buffer,
}) {

    return keyToZEntryHeader(props.key)
}


// Example zSet key obtainde from scanTxes:
// 
// 01 00 00 00 00 00 00 00 01 42 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 02 00 0d 00 00 00 00 00 00 00 00
// pz-   z   length          - z-   score               - key and pk length     -pk- k-  key seen from tx id  -
// 
// Corresponding zEntry
// {
//     set: Buffer.from('B'),
//     key: Buffer.of(13),
//     keyIndex: 2,
// }





export function keyToZEntryHeader(zKey: Buffer, offset?: number): ZEntry {
    let index = offset ?? 0

    const prefix = zKey[index]
    index += 1

    const setLength = buffer.toUInt64BE(zKey, index).toNumber()
    index += 8

    const set = zKey.subarray(index, index + setLength)
    index += setLength

    const score = buffer.toDoubleBe(zKey, index)
    index += 8

    const keyPrefixAndKeyLength = buffer.toUInt64BE(zKey, index).toNumber()
    const keyLength = keyPrefixAndKeyLength - 1
    index += 8

    const keyPrefix = zKey[index]
    index += 1

    const key = zKey.subarray(index, index + keyLength)
    index += keyLength

    const keySeenFromTxId = buffer.toUInt64BE(zKey, index)
    index += 8

    return {
        zSet: set,
        score: score,
        refKey: key,
        refKeySeenFromTxId: keySeenFromTxId,
    }
}


export function zEntryHeaderToKey(entry: ZEntry): Buffer {
    const zPrefix   = Buffer.of(0x01)
    const setLength = buffer.fromUInt64BEAsNumber(entry.zSet.byteLength)
    const set       = entry.zSet
    const score     = buffer.fromDoubleBe(entry.score)
    const keyPrefixAndKeyLength = buffer.fromUInt64BEAsBigInt(
        BigInt(1 + entry.refKey.byteLength)
    )
    const keyPrefix         = Buffer.of(0x00)
    const key               = entry.refKey
    const keySeenFromTxId   = Buffer.from(entry.refKeySeenFromTxId.toBytesBE())

    return Buffer.concat([
        zPrefix,
        setLength,
        set,
        score,
        keyPrefixAndKeyLength, 
        keyPrefix,
        key,
        keySeenFromTxId,
    ])
}



export function zEntryHeaderToKeyWithMeta(entry: ZEntry): Buffer {

    const meta = Buffer.of()
    const metaLength = buffer.fromUInt16BE(meta.byteLength)

    const setPrefixAndSetLength = buffer.fromUInt16BE(
        1 
        + 2
        + entry.zSet.byteLength
        + 8
        + 2 
        + 1
        + entry.refKey.byteLength
        + 8
    )
    const zPrefix   = Buffer.of(0x01)
    const setLength = buffer.fromUInt16BE(entry.zSet.byteLength)
    const set       = entry.zSet
    const score     = buffer.fromDoubleBe(entry.score)
    const keyPrefixAndKeyLength = buffer.fromUInt16BE(
        1 + entry.refKey.byteLength
    )
    const keyPrefix         = Buffer.of(0x00)
    const key               = entry.refKey
    const keySeenFromTxId   = Buffer.from(entry.refKeySeenFromTxId.toBytesBE())

    return Buffer.concat([
        metaLength,
        meta,
        setPrefixAndSetLength,
        zPrefix,
        setLength,
        set,
        score,
        keyPrefixAndKeyLength, 
        keyPrefix,
        key,
        keySeenFromTxId,
    ])
}