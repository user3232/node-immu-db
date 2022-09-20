import {Buffer} from 'node:buffer'
import Long from 'long'
import {toUInt32BE} from '../buffer.js'
import * as immu from '../types/A.js'
import * as buffer from '../buffer.js'

/**
 * Checks if first bits of {@link Buffer} are in form:
 * - first byte `0x02`
 * - following bytes `Buffer.from('CTL.TABLE.')`
 * 
 * Meaning {@link Buffer} is sql table.
 */
export function isKeySqlTable(b: Buffer) {
    if(b[0] !== 0x02) {
        return false
    }
    const sqlTag = Buffer.from('CTL.TABLE.')
    return b.subarray(1, 1 + sqlTag.byteLength).equals(sqlTag)
}

export type SqlTable = {
    sqlType:    'table',
    dbId:       number,
    tableId:    number,
    tableName:  string,
}

export function decodeSqlTable(props: {
    key: Buffer,
    val: Buffer
}): SqlTable {
    const key = decodeKeySqlTable(props.key)
    const value = decodeValueSqlTable(props.val)
    return {
        sqlType:    'table',
        dbId:       key[2],
        tableId:    key[3],
        tableName:  value[0],
    }
}


export type SqlTableKey = [
    prefix: number,
    tag: string,
    dbId: number,
    tableId: number,
    // rest: Buffer,
]

/**
 * Decodes {@link Buffer} to sql table structure header from:
 * - prefix: first byte `0x02`
 * - tag: bytes `Buffer.from('CTL.TABLE.')`
 * - dbId: UInt32BE,
 * - tableId: UInt32BE.
 */
function decodeKeySqlTable(
    b: Buffer
): SqlTableKey {
    let index = 0
    const prefix = b[index]
    index += 1
    const sqlTag = Buffer.from('CTL.TABLE.')
    const tag = sqlTag
    index += sqlTag.byteLength
    const dbId = toUInt32BE(b, index)
    index += 4
    const tableId = toUInt32BE(b, index)
    index += 4

    
    if(b.byteLength !== index) {
        throw 'not entire sql buffer parsed: ' + b.subarray(index)
    }

    
    return [
        prefix,
        tag.toString(),
        dbId,
        tableId,

    ]
}


export function keyOfSqlTableEntry(
    entry: immu.SqlTableEntry
) {
    const prefixSql = Buffer.of(0x02)
    const prefixSqlType = Buffer.from('CTL.TABLE.')
    const dbId = buffer.fromUInt32BE(entry.dbId)
    const tableId = buffer.fromUInt32BE(entry.tableId)

    

    return Buffer.concat([
        prefixSql,
        prefixSqlType,
        dbId,
        tableId,
    ])
}


export type SqlTableValue = [
    tableName: string
]

/**
 * Decodes {@link Buffer} to sql table structure value from:
 * - tableName: utf8 encoded string,
 */
function decodeValueSqlTable(
    b: Buffer
): SqlTableValue {
    return [b.toString()]
}