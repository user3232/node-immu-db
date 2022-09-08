import {Buffer} from 'node:buffer'
import Long from 'long'
import {toUInt32BE} from '../buffer.js'


/**
 * Checks if first bits of {@link Buffer} are in form:
 * - first byte `0x02`
 * - following bytes `Buffer.from('CTL.DATABASE.')`
 * 
 * Meaning {@link Buffer} is sql database.
 */
export function isKeySqlDb(b: Buffer) {
    if(b[0] !== 0x02) {
        return false
    }
    const sqlTag = Buffer.from('CTL.DATABASE.')
    return b.subarray(1, 1 + sqlTag.byteLength).equals(sqlTag)
}

export type SqlDb = {
    sqlType:    'db',
    dbId:       number,
    dbName:  string,
}

export function decodeSqlDb(props: {
    key: Buffer,
    val: Buffer
}): SqlDb {
    const key = decodeKeySqlDb(props.key)
    const value = decodeValueSqlDb(props.val)
    return {
        sqlType:    'db',
        dbId:       key[2],
        dbName:     value[0],
    }
}


export type SqlDbKey = [
    prefix: number,
    tag: string,
    dbId: number,
    // rest: Buffer,
]

/**
 * Decodes {@link Buffer} to sql db structure header from:
 * - prefix: first byte `0x02`
 * - tag: bytes `Buffer.from('CTL.DATABASE.')`
 * - dbId: UInt32BE.
 */
function decodeKeySqlDb(
    b: Buffer
): SqlDbKey {
    let index = 0
    const prefix = b[index]
    index += 1
    const sqlTag = Buffer.from('CTL.DATABASE.')
    const tag = sqlTag
    index += sqlTag.byteLength
    const dbId = toUInt32BE(b, index)
    // index += 4
    // const rest = b.subarray(index)
    
    return [
        prefix,
        tag.toString(),
        dbId,
        // rest,
    ]
}


export type SqlDbValue = [
    dbName: string
]

/**
 * Decodes {@link Buffer} to sql db structure value to:
 * - dbName: string,
 */
function decodeValueSqlDb(
    b: Buffer
): SqlDbValue {
    return [b.toString()]
}