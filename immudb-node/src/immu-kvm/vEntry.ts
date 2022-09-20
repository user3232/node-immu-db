import * as buffer from '../buffer.js'
import { Buffer } from 'node:buffer'
import Long from 'long'


export function keyValToValEntry(props: {
    key: Buffer,
    val: Buffer,
}) {

    return {
        key: keyToValEntryKey(props.key),
        val: valToValEntryVal(props.val),
    }
}


function keyToValEntryKey(keyBytes: Buffer, offset?: number) {
    let index = offset ?? 0

    const keyPrefix = keyBytes[index]
    index += 1
    const key = keyBytes.subarray(index)

    return key
}


function valToValEntryVal(valBytes: Buffer, offset?: number) {
    let index = offset ?? 0

    const valPrefix = valBytes[index]
    index += 1
    const val = valBytes.subarray(index)

    return val
}

