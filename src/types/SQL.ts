import Long from 'long'
import {Buffer} from 'node:buffer'



export type SqlNamedValue = 
    | { name: string, type: 'BOOLEAN',      value: boolean }
    | { name: string, type: 'TIMESTAMP',    value: Long }
    | { name: string, type: 'BLOB',         value: Buffer }
    | { name: string, type: 'INTEGER',      value: Long }
    | { name: string, type: 'VARCHAR',      value: string }
    | { name: string, type: 'NULL' }

    export type SqlValue = 
    | { type: 'BOOLEAN',      value: boolean    }
    | { type: 'TIMESTAMP',    value: Long       }
    | { type: 'BLOB',         value: Buffer     }
    | { type: 'INTEGER',      value: Long       }
    | { type: 'VARCHAR',      value: string     }
    | { type: 'NULL'                            }