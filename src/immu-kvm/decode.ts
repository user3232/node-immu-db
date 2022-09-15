import { decodeSql, SqlThing } from './sql.js'
import Long from 'long'
import { keyValToRefEntry } from './refEntry.js'
import { keyValToValEntry } from './vEntry.js'
import { keyValMetaToZEntry } from './zEntry.js'
import { EntryMetadata, ZEntryData } from 'types/index.js'
import * as immu from '../types/A.js'


export type EntryGenericType = 
    | 'zSet' 
    | 'sql' 
    | 'unknown' 
    | 'val' 
    | 'ref' 
    | 'unknown'


export function decodeKeyValMetaType(props: {
    key:    Buffer,
    val:    Buffer,
    meta?:  EntryMetadata
}): EntryGenericType {
    switch(props.key[0]) {
        case 0x00: {
            switch(props.val.length) {
                case 0:         return 'val'            as const
                default: switch(props.val[0]) {
                    case 0x00:  return 'val'            as const
                    case 0x01:  return 'ref'            as const
                    default:    return 'unknown'        as const
                }
            }
        }
        case 0x01:  return 'zSet'       as const
        case 0x02:  return 'sql'        as const
        default:    return 'unknown'    as const
    }
}




export type GenericVerifiableEntry = EntryGeneric & {
    entryTxId:  Long,
    entryId:    number,
}


export type EntryGeneric = 
    | EntryVal
    | EntryRef
    | EntryZSet
    | EntrySql
    | EntryUnknown

export type EntryVal = {
    type:   'value',
    key:    Buffer,
    val:    Buffer,
    meta?:  EntryMetadata,
}
export function isGenericEntryVal(thing: EntryGeneric): thing is EntryVal {
    return thing.type === 'value'
}

export type EntryRef = {
    type:   'reference',
    key:                Buffer,
    refKey:             Buffer,
    refKeySeenFromTxId: Long,
    meta?:              EntryMetadata,
}
export function isGenericEntryRef(thing: EntryGeneric): thing is EntryRef {
    return thing.type === 'reference'
}

export function isGenericEntryRefOrVal(thing: EntryGeneric): thing is (EntryRef | EntryVal) {
    return isGenericEntryRef(thing) || isGenericEntryVal(thing)
}

export type EntryZSet = ZEntryData & {
    type:   'zSet',
    meta?:  EntryMetadata,
}
export function isGenericEntryZSet(thing: EntryGeneric): thing is EntryZSet {
    return thing.type === 'zSet'
}

export type EntrySql = SqlThing & {
    type:   'sql',
    meta?:  EntryMetadata,
}
export function isGenericEntrySql(thing: EntryGeneric): thing is EntrySql {
    return thing.type === 'sql'
}

export type EntryUnknown = {
    type:   'unknown',
    key:    Buffer,
    val:    Buffer,
    meta?:  EntryMetadata
}
export function isGenericEntryUnknown(thing: EntryGeneric): thing is EntryUnknown {
    return thing.type === 'unknown'
}


export function decodeKeyValMeta(props: {
    key: Buffer,
    val: Buffer,
    meta?: EntryMetadata,
}): EntryGeneric {
    switch(decodeKeyValMetaType(props)) {
        case 'val':     
            return {
                type: 'value' as const,
                ...keyValToValEntry(props),
                meta: props.meta,
            }
        case 'ref': 
            return {
                type: 'reference' as const,
                ...keyValToRefEntry(props),
                meta: props.meta,
            }
        case 'zSet':    
            return {
                type: 'zSet' as const,
                ...keyValMetaToZEntry(props),
                meta: props.meta,
            }
        case 'sql':     
            return {
                type: 'sql' as const,
                ...decodeSql({key: props.key, val: props.val}),
                meta: props.meta,
            }
        case 'unknown':
        case 'unknown':
            return {
                type: 'unknown',
                ...props,
            }
    }
}


