import {Buffer} from 'node:buffer'
import Long from 'long'
import {toUInt32BE} from '../buffer.js'
import * as immu from '../types/A.js'
import * as buffer from '../buffer.js'



/**
 * Checks if first bits of {@link Buffer} are in form:
 * - first byte `0x02`
 * - following bytes `Buffer.from('CTL.COLUMN.')`
 * 
 * Meaning {@link Buffer} is sql column.
 */
export function isKeySqlColumn(b: Buffer) {
    if(b[0] !== 0x02) {
        return false
    }
    const sqlTag = Buffer.from('CTL.COLUMN.')
    return b.subarray(1, 1 + sqlTag.byteLength).equals(sqlTag)
}


export type SqlColumn = {
    sqlType:            'column',
    dbId:               number, 
    tableId:            number,
    columnType:         string,
    columnIsNullable:    boolean, 
    columnIsAutoIncr:    boolean, 
    columnName:         string,
    columnMaxLength:    number,
}

export function decodeSqlColumn(props: {
    key: Buffer,
    val: Buffer
}): SqlColumn {
    const key = decodeKeySqlColumn(props.key)
    const value = decodeValueSqlColumn(props.val)
    return {
        sqlType:            'column',
        dbId:               key[2],
        tableId:            key[3],
        columnType:         key[5],
        columnIsAutoIncr:   (value[0] & 0b00000010) === 0b00000010,
        columnIsNullable:   (value[0] & 0b00000001) === 0b00000001,
        columnName:         value[2],
        columnMaxLength:    value[1],
    }
}



export type SqlColumnKey = [
    prefix:             number, 
    tag:                string, 
    dbId:               number, 
    tableId:            number, 
    columnTypeLength:   number, 
    columnType:         string,
]

/**
 * Decodes {@link Buffer} to sql column structure header from:
 * - prefix: first byte `0x02`
 * - tag: bytes `Buffer.from('CTL.COLUMN.')`
 * - dbId: UInt32BE,
 * - tableId: UInt32BE,
 * - columnTypeLength: UInt32BE,
 * - columnType: utf8 encoded string,
 * 
 */
function decodeKeySqlColumn(
    b: Buffer
): SqlColumnKey {
    const sqlTag = Buffer.from('CTL.COLUMN.')
    let index = 0
    const prefix = b[index]
    index += 1
    const tag = sqlTag
    index += sqlTag.byteLength
    const dbId = toUInt32BE(b, index)
    index += 4
    const tableId = toUInt32BE(b, index)
    index += 4
    const columnTypeLength = toUInt32BE(b, index)
    index += 4
    const columnType = b.subarray(index)
    index += columnType.byteLength
    
    if(b.byteLength !== index) {
        throw 'not entire sql buffer parsed: ' + b.subarray(index)
    }

    return [
        prefix,
        tag.toString(),
        dbId,
        tableId,
        columnTypeLength,
        columnType.toString('utf8'),
    ]
}


export function keyOfSqlColumnEntry(
    entry: immu.SqlColumnEntry
) {
    const prefixSql = Buffer.of(0x02)
    const prefixSqlType = Buffer.from('CTL.COLUMN.')
    const dbId = buffer.fromUInt32BE(entry.dbId)
    const tableId = buffer.fromUInt32BE(entry.tableId)

    const columnType = Buffer.from(entry.columnType)
    const columnTypeLength = buffer.fromUInt32BE(columnType.byteLength)

    return Buffer.concat([
        prefixSql,
        prefixSqlType,
        dbId,
        tableId,
        columnTypeLength,
        columnType,
    ])
}




export type SqlColumnValue = [
    columnAttribute:         number, 
    columnMaxLength:    number, 
    columnName:         string,
]

/**
 * Decodes {@link Buffer} to sql column structure value from:
 * - columnAttribute: first byte 
 * - columnMaxLength: UInt32BE,
 * - columnName: utf8 encoded string,
 */
function decodeValueSqlColumn(
    b: Buffer
): SqlColumnValue {
    let index = 0
    const columnAttribute = b[index]
    index += 1
    const columnMaxLength = toUInt32BE(b, index)
    index += 4
    const columnName = b.subarray(index)
    index += columnName.byteLength
    
    
    if(b.byteLength !== index) {
        throw 'not entire sql buffer parsed: ' + b.subarray(index)
    }

    return [
        columnAttribute,
        columnMaxLength,
        columnName.toString('utf8'),
    ]
}