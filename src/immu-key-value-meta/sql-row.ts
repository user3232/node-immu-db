import {Buffer} from 'node:buffer'
import Long from 'long'
import {toUInt32BE} from '../buffer.js'



 
/**
 * Checks if first bits of {@link Buffer} are in form:
 * - first byte `0x02`
 * - following bytes `Buffer.from('R.')`
 * 
 * Meaning {@link Buffer} is sql table row.
 */
export function isKeySqlRow(b: Buffer) {
    if(b[0] !== 0x02) {
        return false
    }
    const sqlTag = Buffer.from('R.')
    return b.subarray(1, 1 + sqlTag.byteLength).equals(sqlTag)
}


export type SqlRow = {
    sqlType:            'row',
    dbId:               number,
    tableId:            number,
    pk:                 Buffer,
    isPKNullable:       boolean,
    columns: {
        columnId:       number,
        columnValue:    Buffer,
    }[]
}

export function decodeSqlRow(props: {
    key: Buffer, 
    val: Buffer
}): SqlRow {

    const key = decodeKeySqlRow(props.key)
    const value = decodeValueSqlRow(props.val)

    return {
        sqlType:        'row',
        dbId:           key[2],
        tableId:        key[3],
        pk:             key[6],
        isPKNullable:   key[5],
        columns: value.columnsValues.map(([columnId, _, columnValue]) => ({
            columnId,
            columnValue,
        }))
    }
}


export function decodeSqlRowAndMapTo<T>(props: {
    key: Buffer, 
    value: Buffer,
    map: (
        columns: SqlRowColumnValue[],
        sqlColumnDecoder: SqlRowColumnValueDecoders,
    ) => T
}) {
    const key = decodeKeySqlRow(props.key)
    const value = decodeValueSqlRow(props.value)

    const mapped = props.map(value.columnsValues, sqlRowColumnDecoder)
    return {
        key,
        value: mapped,
    }
}






/**
 * Decodes {@link Buffer} to sql table row structure value from:
 * - numberOfColumns: UInt64BE,
 * - column value definitions:
 *   - columnId: UInt32BE,
 *   - columnByteLength: UInt32BE,
 *   - columnValue: bytes of length columnByteLength
 */
 function decodeValueSqlRow(b: Buffer) {
    let index = 0
    const columnsLength = toUInt32BE(b, index)
    index += 4

    const columnsValues = decodeSqlRowColumnsValues(b.subarray(index))

    return {
        columnsLength,
        columnsValues
    }
}


export type SqlRowKeyValue = [
    prefix:         number,
    tag:            string,
    dbId:           number,
    tableId:        number,
    zero:           number,
    isPKNullable:   boolean,
    pk:             Buffer,
]


/**
 * Decodes {@link Buffer} to sql table row structure header from:
 * - prefix: first byte `0x02`
 * - tag: bytes `Buffer.from('R.')`
 * - dbId: UInt32BE,
 * - tableId: UInt32BE,
 * - zero: UInt32BE,
 * - isPKNullable: byte (boolean):
 *   - `0x80` is not nullable
 *   - ?
 * - pk: Bytes
 */
function decodeKeySqlRow(
    b: Buffer
): SqlRowKeyValue {
    const sqlTag = Buffer.from('R.')
    let index = 0
    const prefix = b[index]
    index += 1
    const tag = sqlTag
    index += sqlTag.byteLength
    const dbId = toUInt32BE(b, index)
    index += 4
    const tableId = toUInt32BE(b, index)
    index += 4
    const zero = toUInt32BE(b, index)
    index += 4
    const isPKNullable = b[index] === 0x80
    index += 1

    const pk = b.subarray(index)
    



    return [
        prefix,
        tag.toString(),
        dbId,
        tableId,
        zero,
        isPKNullable,
        pk,
    ]
}



export type SqlRowColumnValue = [
    columnId: number,
    columnByteLength: number,
    columnValue: Buffer,
]


/**
 * Decodes {@link Buffer} to sql table row column structure value from:
 * - columnId: UInt32BE,
 * - columnByteLength: UInt32BE,
 * - columnValue: bytes of length columnByteLength.
 * 
 * Returns decoded row column value and rest of buffer.
 */
function decodeSqlRowColumnValue(
    b: Buffer
): {
    rowColumn: SqlRowColumnValue,
    rest: Buffer
} {
    let index = 0
    const columnId = toUInt32BE(b, index)
    index += 4
    const columnByteLength = toUInt32BE(b, index)
    index += 4
    const columnValue = b.subarray(index, index + columnByteLength)
    index += columnByteLength
    const rest = b.subarray(index)

    return {
        rowColumn: [
            columnId,
            columnByteLength,
            columnValue,
        ],
        rest,
    }
}


/**
 * Decodes {@link Buffer} to sql table row columns values from:
 * - column value definitions:
 *   - columnId: UInt32BE,
 *   - columnByteLength: UInt32BE,
 *   - columnValue: bytes of length columnByteLength
 * 
 */
function decodeSqlRowColumnsValues(
    b: Buffer
): SqlRowColumnValue[] {

    const result: SqlRowColumnValue[] = []
    let toDecode = b.subarray()
    while(toDecode.byteLength > 0) {
        const {rowColumn, rest} = decodeSqlRowColumnValue(toDecode)
        result.push(rowColumn)
        toDecode = rest
    }

    return result
}









export type SqlRowColumnValueDecoders = {
    int:        typeof decodeSqlRowColumnInt,
    boolean:    typeof decodeSqlRowColumnBoolean,
    string:     typeof decodeSqlRowColumnString,
    blob:       typeof decodeSqlRowColumnBlob,
    timestamp:  typeof decodeSqlRowColumnTimestamp,
}


export const sqlRowColumnDecoder: SqlRowColumnValueDecoders = {
    int:        decodeSqlRowColumnInt,
    boolean:    decodeSqlRowColumnBoolean,
    string:     decodeSqlRowColumnString,
    blob:       decodeSqlRowColumnBlob,
    timestamp:  decodeSqlRowColumnTimestamp,
}





function decodeSqlRowColumnInt(
    rowColumnValue: SqlRowColumnValue
) {
    if(rowColumnValue[1] !== rowColumnValue[2].byteLength) {
        throw 'Column length differs from column value length.'
    }
    if(rowColumnValue[1] !== 8) {
        throw 'Column value is not int.'
    }
    return Long.fromBytesBE([...rowColumnValue[2]], false)
}

function decodeSqlRowColumnBoolean(
    rowColumnValue: SqlRowColumnValue
) {
    if(rowColumnValue[1] !== rowColumnValue[2].byteLength) {
        throw 'Column length differs from column value length.'
    }
    if(rowColumnValue[1] !== 1) {
        throw 'Column value is not boolean.'
    }
    return rowColumnValue[2][0] !== 0 ? false : true
}

function decodeSqlRowColumnString(
    rowColumnValue: SqlRowColumnValue
) {
    if(rowColumnValue[1] !== rowColumnValue[2].byteLength) {
        throw 'Column length differs from column value length.'
    }
    
    return rowColumnValue[2].toString('utf8')
}

function decodeSqlRowColumnTimestamp(
    rowColumnValue: SqlRowColumnValue
) {
    if(rowColumnValue[1] !== rowColumnValue[2].byteLength) {
        throw 'Column length differs from column value length.'
    }
    if(rowColumnValue[1] !== 8) {
        throw 'Column value is not int.'
    }
    return Long.fromBytesBE([...rowColumnValue[2]], false)
}

function decodeSqlRowColumnBlob(
    rowColumnValue: SqlRowColumnValue
) {
    if(rowColumnValue[1] !== rowColumnValue[2].byteLength) {
        throw 'Column length differs from column value length.'
    }
    
    return rowColumnValue[2]
}
