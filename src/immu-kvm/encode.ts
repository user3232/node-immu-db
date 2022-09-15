import * as immu from '../types/A.js'
import { keyOfSqlRowEntry } from './sql-row.js'
import { keyOfSqlColumnEntry } from './sql-column.js'
import { keyOfSqlIndexEntry } from './sql-index.js'
import { keyOfSqlTableEntry } from './sql-table.js'
import { keyOfSqlDbEntry } from './sql-db.js'
import { keyOfZSetEntry } from './zEntry.js'


export function encodeEntryKey(
    entry: immu.Entry
): Buffer {
    switch(entry.type) {
        case 'hash': return entry.prefixedKey
        case 'bin':  return entry.prefixedKey
        case 'val':  return Buffer.concat([Buffer.of(0x00), entry.key])
        case 'ref':  return Buffer.concat([Buffer.of(0x00), entry.key])
        case 'zSet': return keyOfZSetEntry(entry)
        case 'sql': switch(entry.sqlType) {
            case 'row': return keyOfSqlRowEntry(entry)
            case 'column': return keyOfSqlColumnEntry(entry)
            case 'index': return keyOfSqlIndexEntry(entry)
            case 'table': return keyOfSqlTableEntry(entry)
            case 'db': return keyOfSqlDbEntry(entry)
        }
    }
}