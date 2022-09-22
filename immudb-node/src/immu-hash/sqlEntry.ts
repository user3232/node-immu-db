import * as immu from '../types/index.js'
import * as hash from './hash.js'
import * as buffer from '../buffer.js'
import { 
    PrefixKeyVal, 
    PrefixValVal, 
    setColumnFlags, 
    PrefixKeySql, 
    TagSqlColumn, 
    TagSqlDb, 
    TagSqlIndex, 
    TagSqlRow, 
    TagSqlTable 
} from './consts.js'
import { entryMetaToBuffer } from './EntryMetadata.js'




/**
 * Hashes sql row entry. Schema is sha256 of:
 * - `metadataLength` - length of binary encoded metadata - UInt16BE,
 * - `meta` - metadata - bytes,
 * - `prefixKeyLength` + `keyLength` - UInt16BE,
 * - `prefixKey` - `0x00` - byte,
 * - `Key`:
 *   - `prefixSql` - `0x02` - byte,
 *   - `prefixSqlRow` - `R.` - utf8 encoded string bytes,
 *   - `dbId` - id of database - UInt32BE,
 *   - `tableId` - id of table - UInt32BE,
 *   - `pkIndexId` - `0` - UInt32BE,
 *   - `pk` - primary key - bytes,
 * - sha256 of:
 *   - `prefixValue` - `0x00` - byte,
 *   - `columnsCount` - count of row columns - UInt32BE,
 *   - `value[]`:
 *     - `columnId` - id of column - UInt32BE,
 *     - `columnValLength` - byte length of column value - UInt32BE,
 *     - `columnValue` - value of column - bytes
 */
export function hashOfSqlRowEntry(
    props: immu.SqlRowEntry
): Buffer {


    const meta = entryMetaToBuffer(props.meta)
    const metaLength = meta.byteLength

    const prefixKey = PrefixKeyVal
    const prefixKeyLength = prefixKey.byteLength

    const prefixSql = PrefixKeySql
    const prefixSqlRow = TagSqlRow
    const dbId      = buffer.fromUInt32BE(props.dbId)
    const tableId   = buffer.fromUInt32BE(props.tableId)
    const pkIndexId = buffer.fromUInt32BE(0)
    const pk        = props.pk

    const key = [
        prefixSql,
        prefixSqlRow,
        dbId,
        tableId,
        pkIndexId,
        pk,
    ]
    const keyLength = 
        prefixSql.byteLength
        + prefixSqlRow.byteLength
        + dbId.byteLength
        + tableId.byteLength
        + pkIndexId.byteLength
        + pk.byteLength


    const prefixValue = PrefixValVal


    const columnsCount = buffer.fromUInt32BE(props.columnsValues.length)
    const columnsValues = props.columnsValues.map(({id, bin: val}) => [
        buffer.fromUInt32BE(id),
        buffer.fromUInt32BE(val.byteLength),
        val
    ])
    const value = [
        columnsCount,
        columnsValues,
    ]


    const entryHash = hash.ofTreeBuffers(
        buffer.fromUInt16BE(metaLength),
        meta,
        buffer.fromUInt16BE(prefixKeyLength + keyLength), 
        [
            prefixKey, 
            key,
        ],
        hash.ofTreeBuffers(
            prefixValue, 
            value, 
        )
    )
    

    return entryHash
}





/**
 * Hashes sql column entry. Schema is sha256 of:
 * - `metadataLength` - length of binary encoded metadata - UInt16BE,
 * - `meta` - metadata - bytes,
 * - `prefixKeyLength` + `keyLength` - UInt16BE,
 * - `prefixKey` - `0x00` - byte,
 * - `Key`:
 *   - `prefixSql` - `0x02` - byte,
 *   - `prefixSqlColumn` - `CTL.COLUMN` - utf8 encoded string - bytes,
 *   - `dbId` - id of database - UInt32BE,
 *   - `tableId` - id of table - UInt32BE,
 *   - `columnTypeLength` - length of `columnType` - UInt32BE,
 *   - `columnType` - utf8 encoded string of column type - bytes,
 * - sha256 of:
 *   - `prefixValue` - `0x00` - byte,
 *   - `value`:
 *     - `columnAttribute` - `0b00000001` bit set if column nullable, and
 *       `0b00000010` bit set if column autoincrement - byte,
 *     - `columnMaxLength` - byte length columnName - UInt32BE,
 *     - `columnName` - utf8 encoded string of column name - bytes
 */
 export function hashOfSqlColumnEntry(
    props: immu.SqlColumnEntry
): Buffer {

    const meta = entryMetaToBuffer(props.meta)
    const metaLength = meta.byteLength


    const prefixKey = PrefixKeyVal
    const prefixKeyLength = prefixKey.byteLength


    const prefixSql = PrefixKeySql
    const prefixSqlColumn = TagSqlColumn
    const dbId      = buffer.fromUInt32BE(props.dbId)
    const tableId   = buffer.fromUInt32BE(props.tableId)
    const columnTypeLength = buffer.fromUInt32BE(props.columnType.length)
    const columnType = Buffer.from(props.columnType)
    const key = [prefixSql, prefixSqlColumn, dbId, tableId, columnTypeLength, columnType]
    const keyLength = 
        prefixSql.byteLength
        + prefixSqlColumn.byteLength
        + dbId.byteLength
        + tableId.byteLength
        + columnTypeLength.byteLength
        + columnType.byteLength


    const prefixValue = PrefixValVal


    const columnAttribute = Buffer.of(setColumnFlags({
        columnIsAutoIncr: props.columnIsAutoIncr,
        columnIsNullable: props.columnIsNullable,
    }))
    const columnMaxLength = buffer.fromUInt32BE(props.columnMaxLength)
    const columnName = Buffer.from(props.columnName)
    const value = [columnAttribute, columnMaxLength, columnName,]


    const entryHash = hash.ofTreeBuffers(
        buffer.fromUInt16BE(metaLength),
        meta,
        buffer.fromUInt16BE(prefixKeyLength + keyLength), 
        [
            prefixKey, 
            key,
        ],
        hash.ofTreeBuffers(
            prefixValue, 
            value, 
        )
    )


    return entryHash
}


/**
 * Hashes sql table entry. Schema is sha256 of:
 * - `metadataLength` - length of binary encoded metadata - UInt16BE,
 * - `meta` - metadata - bytes,
 * - `prefixKeyLength` + `keyLength` - UInt16BE,
 * - `prefixKey` - `0x00` - byte,
 * - `Key`:
 *   - `prefixSql` - `0x02` - byte,
 *   - `prefixSqlIndex` - `CTL.INDEX` - utf8 encoded string - bytes,
 *   - `dbId` - id of database - UInt32BE,
 *   - `tableId` - id of table - UInt32BE,
 *   - `indexId` - id of index - UInt32BE,
 * - sha256 of:
 *   - `prefixValue` - `0x00` - byte,
 *   - `value[]`:
 *     - columnId - id of indexed column - UInt32BE
 *     - columnAscDesc - sort order of indexed column - byte
 */
 export function hashOfSqlIndexEntry(
    props: immu.SqlIndexEntry
): Buffer {

    const meta = entryMetaToBuffer(props.meta)
    const metaLength = meta.byteLength


    const prefixKey = PrefixKeyVal
    const prefixKeyLength = prefixKey.byteLength


    const prefixSql = PrefixKeySql
    const prefixSqlIndex = TagSqlIndex
    const dbId      = buffer.fromUInt32BE(props.dbId)
    const tableId   = buffer.fromUInt32BE(props.tableId)
    const indexId   = buffer.fromUInt32BE(props.indexId)
    const key = [prefixSql, prefixSqlIndex, dbId, tableId, indexId]
    const keyLength = 
        prefixSql.byteLength
        + prefixSqlIndex.byteLength
        + dbId.byteLength
        + tableId.byteLength
        + indexId.byteLength


    const prefixValue = PrefixValVal

    
    const indexIsPrimary = Buffer.of(props.indexIsPrimary)
    const columns = props.columns.map(({id, ascDesc}) => [
        buffer.fromUInt32BE(id),
        Buffer.of(ascDesc),
    ])
    const value = [
        indexIsPrimary,
        columns,
    ]


    const entryHash = hash.ofTreeBuffers(
        buffer.fromUInt16BE(metaLength),
        meta,
        buffer.fromUInt16BE(prefixKeyLength + keyLength), 
        [
            prefixKey, 
            key,
        ],
        hash.ofTreeBuffers(
            prefixValue, 
            value, 
        )
    )


    return entryHash
}





/**
 * Hashes sql table entry. Schema is sha256 of:
 * - `metadataLength` - length of binary encoded metadata - UInt16BE,
 * - `meta` - metadata - bytes,
 * - `prefixKeyLength` + `keyLength` - UInt16BE,
 * - `prefixKey` - `0x00` - byte,
 * - `Key`:
 *   - `prefixSql` - `0x02` - byte,
 *   - `prefixSqlTable` - `CTL.TABLE` - utf8 encoded string - bytes,
 *   - `dbId` - id of database - UInt32BE,
 *   - `tableId` - id of table - UInt32BE,
 * - sha256 of:
 *   - `prefixValue` - `0x00` - byte,
 *   - `value` - utf8 encoded string of table name - bytes
 */
 export function hashOfSqlTableEntry(
    props: immu.SqlTableEntry
): Buffer {

    const meta = entryMetaToBuffer(props.meta)
    const metaLength = meta.byteLength


    const prefixKey = PrefixKeyVal
    const prefixKeyLength = prefixKey.byteLength


    const prefixSql = PrefixKeySql
    const prefixSqlTable = TagSqlTable
    const dbId      = buffer.fromUInt32BE(props.dbId)
    const tableId   = buffer.fromUInt32BE(props.tableId)
    const key = [prefixSql, prefixSqlTable, dbId, tableId,]
    const keyLength = 
        prefixSql.byteLength
        + prefixSqlTable.byteLength
        + dbId.byteLength
        + tableId.byteLength


    const prefixValue = PrefixValVal


    const value = Buffer.from(props.tableName)


    const entryHash = hash.ofTreeBuffers(
        buffer.fromUInt16BE(metaLength),
        meta,
        buffer.fromUInt16BE(prefixKeyLength + keyLength), 
        [
            prefixKey, 
            key,
        ],
        hash.ofTreeBuffers(
            prefixValue, 
            value, 
        )
    )

    return entryHash
}





/**
 * Hashes sql database entry. Schema is sha256 of:
 * - `metadataLength` - length of binary encoded metadata - UInt16BE,
 * - `meta` - metadata - bytes,
 * - `prefixKeyLength` + `keyLength` - UInt16BE,
 * - `prefixKey` - `0x00` - byte,
 * - `Key`:
 *   - `prefixSql` - `0x02` - byte,
 *   - `prefixSqlDb` - `CTL.DATABASE` - utf8 encoded string - bytes,
 *   - `dbId` - id of database - UInt32BE,
 * - sha256 of:
 *   - `prefixValue` - `0x00` - byte,
 *   - `value` - utf8 encoded string of database name - bytes
 */
 export function hashOfSqlDbEntry(
    props: immu.SqlDbEntry
): Buffer {

    const meta = entryMetaToBuffer(props.meta)
    const metaLength = meta.byteLength


    const prefixKey = PrefixKeyVal
    const prefixKeyLength = prefixKey.byteLength


    const prefixSql         = PrefixKeySql
    const prefixSqlDb       = TagSqlDb
    const dbId              = buffer.fromUInt32BE(props.dbId)
    const key               = [prefixSql, prefixSqlDb, dbId,]
    const keyLength = 
        prefixSql.byteLength
        + prefixSqlDb.byteLength
        + dbId.byteLength


    const prefixValue = PrefixValVal


    const value = Buffer.from(props.dbName)


    const entryHash = hash.ofTreeBuffers(
        buffer.fromUInt16BE(metaLength),
        meta,
        buffer.fromUInt16BE(prefixKeyLength + keyLength), 
        [
            prefixKey, 
            key,
        ],
        hash.ofTreeBuffers(
            prefixValue, 
            value, 
        )
    )

    return entryHash
}

