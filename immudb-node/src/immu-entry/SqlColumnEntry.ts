import * as buffer from '../buffer.js'
import { Buffer } from 'node:buffer'
import * as immu from '../types/index.js'
import { 
    isFlagAutoIncrementSet, 
    isFlagNullableSet, 
    PrefixKeySql, 
    setColumnFlags, 
    TagSqlColumn, 
} from '../immu-hash/consts.js'




export function binEntryToSqlColumnEntry(props: immu.BinEntry): immu.SqlColumnEntry {

    const decodedBinKey = binEntryPrefixedKeyToSqlColumnEntryPart(props.prefixedKey)
    const decodedBinVal = binEntryPrefixedValToSqlColumnEntryPart(props.prefixedVal)
    return {
        type:               'sql',
        sqlType:            'column',
        version:            '1',
        meta:               props.meta,
        dbId:               decodedBinKey.dbId,
        tableId:            decodedBinKey.tableId,
        columnIsAutoIncr:   isFlagAutoIncrementSet(decodedBinVal.columnAttribute),
        columnIsNullable:   isFlagNullableSet(decodedBinVal.columnAttribute),
        columnType:         decodedBinKey.columnType,
        columnName:         decodedBinVal.columnName,
        columnMaxLength:    decodedBinVal.columnMaxLength,
    }
}


export function sqlColumnEntryToBinEntry(props: immu.SqlColumnEntry): immu.BinEntry {

    return {
        type:           'bin',
        version:        '1',
        meta:           props.meta,
        prefixedKey:    sqlColumnEntryToLeafEntryPrefixedKey(props),
        prefixedVal:    sqlColumnEntryToLeafEntryPrefixedVal(props),
    }
}



export function sqlColumnEntryToLeafEntryPrefixedKey(props: immu.SqlColumnEntry): Buffer {
    return Buffer.concat([
        PrefixKeySql,
        TagSqlColumn,
        buffer.fromUInt32BE(props.dbId),
        buffer.fromUInt32BE(props.tableId),
        buffer.fromUInt32BE(Buffer.from(props.columnType).byteLength),
        Buffer.from(props.columnType),
    ])
}


function sqlColumnEntryToLeafEntryPrefixedVal(props: immu.SqlColumnEntry): Buffer {
    return Buffer.concat([
        Buffer.of(setColumnFlags({
            columnIsAutoIncr: props.columnIsAutoIncr,
            columnIsNullable: props.columnIsNullable,
        })),
        buffer.fromUInt32BE(props.columnMaxLength),
        Buffer.from(props.columnName),
    ])
}



/**
 * Checks if first bits of {@link Buffer} are in form:
 * - first byte `0x02`
 * - following bytes `Buffer.from('CTL.COLUMN.')`
 * 
 * Meaning {@link Buffer} is sql column.
 */
 export function isBinEntryKeySqlColumnEntryPart(b: Buffer) {
    
    if(b[0] !== PrefixKeySql[0]) {
        return false
    }
    const sqlTag = TagSqlColumn
    return b.subarray(1, 1 + sqlTag.byteLength).equals(sqlTag)
}





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
function binEntryPrefixedKeyToSqlColumnEntryPart(
    b: Buffer
) {
    const sqlTag = TagSqlColumn
    let index = 0
    const prefix = b[index]
    index += 1
    const tag = sqlTag
    index += sqlTag.byteLength
    const dbId = buffer.toUInt32BE(b, index)
    index += 4
    const tableId = buffer.toUInt32BE(b, index)
    index += 4
    const columnTypeLength = buffer.toUInt32BE(b, index)
    index += 4
    const columnType = b.subarray(index)
    index += columnType.byteLength
    
    if(b.byteLength !== index) {
        throw 'not entire sql buffer parsed: ' + b.subarray(index)
    }

    return {
        prefix,
        tag: tag.toString(),
        dbId,
        tableId,
        columnTypeLength,
        columnType: columnType.toString('utf8'),
    }
}



/**
 * Decodes {@link Buffer} to sql column structure value from:
 * - columnAttribute: first byte 
 * - columnMaxLength: UInt32BE,
 * - columnName: utf8 encoded string,
 */
function binEntryPrefixedValToSqlColumnEntryPart(
    b: Buffer
) {
    let index = 0
    const columnAttribute = b[index]
    index += 1
    const columnMaxLength = buffer.toUInt32BE(b, index)
    index += 4
    const columnName = b.subarray(index)
    index += columnName.byteLength
    
    
    if(b.byteLength !== index) {
        throw 'not entire sql buffer parsed: ' + b.subarray(index)
    }

    return {
        columnAttribute,
        columnMaxLength,
        columnName: columnName.toString('utf8'),
    }
}