import {Buffer} from 'node:buffer'
import Long from 'long'
import {toUInt32BE} from '../buffer.js'




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
    columnIsNullable:   boolean, 
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
        columnIsNullable:   value[0] === 0 ? true : false,
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
    return [
        prefix,
        tag.toString(),
        dbId,
        tableId,
        columnTypeLength,
        columnType.toString('utf8'),
    ]
}


export type SqlColumnValue = [
    isNullable:         number, 
    columnMaxLength:   number, 
    columnName:         string,
]

/**
 * Decodes {@link Buffer} to sql column structure value from:
 * - isNullable: first byte 
 * - columnMaxLength: UInt32BE,
 * - columnName: utf8 encoded string,
 */
function decodeValueSqlColumn(
    b: Buffer
): SqlColumnValue {
    let index = 0
    const isNullable = b[index]
    index += 1
    const columnMaxLength = toUInt32BE(b, index)
    index += 4
    const columnName = b.subarray(index)
    index += columnName.byteLength
    // console.log('column value (id, length, name', b)
    return [
        isNullable,
        columnMaxLength,
        columnName.toString(),
    ]
}