import * as buffer from '../buffer.js'
import { Buffer } from 'node:buffer'
import Long from 'long'




export function keyValToRefEntry(props: {
    key: Buffer,
    val: Buffer,
}) {

    return {
        key: keyToRefEntryKey(props.key),
        ...valToRefEntryRefKey(props.val),
    }
}


function keyToRefEntryKey(keyBytes: Buffer, offset?: number) {
    let index = offset ?? 0

    const keyPrefix = keyBytes[index]
    index += 1
    const key = keyBytes.subarray(index)

    return key
}


function valToRefEntryRefKey(valBytes: Buffer, offset?: number) {
    let index = offset ?? 0

    const refPrefix = valBytes[index]
    index += 1

    const refKeySeenFromTxId = buffer.toUInt64BE(valBytes, index)
    index += 8

    const keyPrefix = valBytes[index]
    index += 1

    const refKey = valBytes.subarray(index)

    return {
        refKey,
        refKeySeenFromTxId,
    }
}

