import {Buffer} from 'node:buffer'
import Long from 'long'
import {toUInt32BE} from '../buffer.js'
import { SqlIndexColumn } from '../types/A.js'
import * as immu from '../types/A.js'
import * as buffer from '../buffer.js'


/**
 * Checks if first bits of {@link Buffer} are in form:
 * - first byte `0x02`
 * - following bytes `Buffer.from('CTL.INDEX.')`
 * 
 * Meaning {@link Buffer} is index.
 */
export function isKeySqlIndex(b: Buffer) {
    if(b[0] !== 0x02) {
        return false
    }
    const sqlTag = Buffer.from('CTL.INDEX.')
    return b.subarray(1, 1 + sqlTag.byteLength).equals(sqlTag)
}



export type SqlIndex = {
    sqlType:        'index',
    dbId:           number,
    tableId:        number,
    indexId:        number,
    indexIsPrimary: number,
    columns:        SqlIndexColumn[],
}

export function decodeSqlIndex(props: {
    key: Buffer,
    val: Buffer
}): SqlIndex {
    const key = decodeKeySqlIndex(props.key)
    const {indexIsPrimary, columns} = decodeValueSqlIndex(props.val)

    return {
        sqlType:        'index',
        dbId:           key[2],
        tableId:        key[3],
        indexId:        key[4],
        indexIsPrimary,
        columns:        columns.map(([id, ascDesc]) => ({id, ascDesc})),
    }
}


export type SqlIndexKey = [
    prefix:     number, 
    tag:        string, 
    dbId:       number, 
    tableId:    number, 
    indexId:    number,
    // rest:       Buffer
]

/**
 * Decodes {@link Buffer} to sql index structure header from:
 * - prefix: first byte `0x02`
 * - tag: bytes `Buffer.from('CTL.INDEX.')`
 * - dbId: UInt32BE,
 * - tableId: UInt32BE,
 * - indexId: UInt32BE,
 * 
 */
function decodeKeySqlIndex(
    b: Buffer
): SqlIndexKey {
    const sqlTag = Buffer.from('CTL.INDEX.')
    let index = 0
    const prefix = b[index]
    index += 1
    const tag = sqlTag
    index += sqlTag.byteLength
    const dbId = toUInt32BE(b, index)
    index += 4
    const tableId = toUInt32BE(b, index)
    index += 4
    const indexId = toUInt32BE(b, index)
    index += 4

    if(b.byteLength !== index) {
        throw 'not entire sql buffer parsed: ' + b.subarray(index)
    }

    return [
        prefix,
        tag.toString(),
        dbId,
        tableId,
        indexId,
    ]
}



export function keyOfSqlIndexEntry(
    entry: immu.SqlIndexEntry
) {
    const prefixSql = Buffer.of(0x02)
    const prefixSqlType = Buffer.from('CTL.INDEX.')
    const dbId = buffer.fromUInt32BE(entry.dbId)
    const tableId = buffer.fromUInt32BE(entry.tableId)
    const indexId = buffer.fromUInt32BE(entry.indexId)

    

    return Buffer.concat([
        prefixSql,
        prefixSqlType,
        dbId,
        tableId,
        indexId,
    ])
}


export type SqlIndexValue = {
    indexIsPrimary: number,
    columns: [id: number, ascDesc: number][]
}

/**
 * Decodes {@link Buffer} to sql index structure value from:
 * - columnId: first byte 
 * - isAscendingLength: UInt32BE,
 * - isAscending: isAscendingLength bytes (boolean),
 * 
 */
function decodeValueSqlIndex(
    b: Buffer
): SqlIndexValue {
    let index = 0
    const columns: [id: number, ascDesc: number][] = []

    const indexIsPrimary = b[0]
    index += 1

    while(index < b.byteLength) {
        const newColumnId = toUInt32BE(b, index)
        index += 4
        const newColumnAscDesc = b[index]
        index += 1
        columns.push([newColumnId, newColumnAscDesc])
    }

    if(b.byteLength !== index) {
        throw 'not entire sql buffer parsed: ' + b.subarray(index)
    }
    
    return {
        indexIsPrimary,
        columns
    }
}