import Long from 'long'
import { 
    toUInt32BE
} from '../buffer.js'
import { decodeSqlColumn, isKeySqlColumn, SqlColumn } from './sql-column.js'
import { decodeSqlIndex, isKeySqlIndex, SqlIndex } from './sql-index.js'
import { decodeSqlRow, isKeySqlRow, SqlRow } from './sql-row.js'
import { decodeSqlTable, isKeySqlTable, SqlTable } from './sql-table.js'
import { decodeSqlDb, isKeySqlDb, SqlDb } from './sql-db.js'






/**
 * Checks if first bit of {@link Buffer} is `0x02`.
 */
export function isKeySql(b: Buffer) {
    return b[0] === 0x02
}


export type SqlThing = 
    | SqlRow 
    | SqlColumn 
    | SqlIndex 
    | SqlTable 
    | SqlDb
    | SqlUnknown
    | SqlNotSql


export type SqlUnknown = {
    key:        Buffer,
    val:        Buffer,
    sqlType:    'unknown',
}

export type SqlNotSql = {
    key:        Buffer,
    val:        Buffer,
    sqlType:    'not-sql',
}

export function decodeSql(props: {
    key: Buffer,
    val: Buffer,
}): SqlThing {

    if(isKeySql(props.key) === false ) {
        return {
            sqlType: 'not-sql' as const,
            ...props
        }
    }

    if(isKeySqlRow(props.key)) {
        return decodeSqlRow(props)
    }
    if(isKeySqlColumn(props.key)) {
        return decodeSqlColumn(props)
    }
    if(isKeySqlIndex(props.key)) {
        return decodeSqlIndex(props)
    }
    if(isKeySqlTable(props.key)) {
        return decodeSqlTable(props)
    }
    if(isKeySqlDb(props.key)) {
        return decodeSqlDb(props)
    }
    
    return {
        sqlType: 'unknown' as const,
        ...props
    }
}




export function isSqlEntryRow(thing: SqlThing): thing is SqlRow {
    return thing.sqlType === 'row'
}

export function isSqlEntryColumn(thing: SqlThing): thing is SqlColumn {
    return thing.sqlType === 'column'
}

export function isSqlEntryIndex(thing: SqlThing): thing is SqlIndex {
    return thing.sqlType === 'index'
}

export function isSqlEntryTable(thing: SqlThing): thing is SqlTable {
    return thing.sqlType === 'table'
}

export function isSqlEntryDb(thing: SqlThing): thing is SqlDb {
    return thing.sqlType === 'db'
}



