import { TxEntry__Output } from 'proto/immudb/schema/TxEntry.js'
import * as immu from '../types/A.js'
import { 
    binEntryToRefEntry, 
    refEntryToBinEntry, 
    refEntryToLeafEntryPrefixedKey 
} from './RefEntry.js'
import { 
    binEntryToSqlEntry, 
    sqlEntryToBinEntry, 
    sqlEntryToLeafEntryPrefixedKey 
} from './SqlEntry.js'
import { 
    binEntryToValEntry, 
    valEntryToBinEntry, 
    valEntryToLeafEntryPrefixedKey 
} from './ValEntry.js'
import { 
    binEntryToZSetEntry, 
    zSetEntryToBinEntry, 
    zSetEntryToLeafEntryPrefixedKey 
} from './ZSetEntry.js'





export function binEntryToEntryType(
    props: immu.BinEntry
): immu.Entry['type'] {
    switch(props.prefixedKey[0]) {
        case 0x00: {
            switch(props.prefixedVal.length) {
                case 0:         return 'val'
                default: switch(props.prefixedVal[0]) {
                    case 0x00:  return 'val'
                    case 0x01:  return 'ref'
                    default:    return 'bin'
                }
            }
        }
        case 0x01:  return 'zSet'
        case 0x02:  return 'sql'
        default:    return 'bin'
    }
}


export function binEntryToEntry(
    props: immu.BinEntry
): immu.Entry {
    switch(binEntryToEntryType(props)) {
        case 'bin':     return props
        case 'hash':    return props
        case 'val':     return binEntryToValEntry(props)
        case 'ref':     return binEntryToRefEntry(props)
        case 'zSet':    return binEntryToZSetEntry(props)
        case 'sql':     return binEntryToSqlEntry(props)
    }
}


export function entryToBinEntry(
    props: immu.Entry
): immu.BinEntry | immu.LeafEntry {
    switch(props.type) {
        case 'bin':     return props
        case 'hash':    return props
        case 'val':     return valEntryToBinEntry(props)
        case 'ref':     return refEntryToBinEntry(props)
        case 'zSet':    return zSetEntryToBinEntry(props)
        case 'sql':     return sqlEntryToBinEntry(props)
    }
}


export function entryToLeafEntryPrefixedKey(
    props: immu.Entry
): Buffer {
    switch(props.type) {
        case 'bin':     return props.prefixedKey
        case 'hash':    return props.prefixedKey
        case 'val':     return valEntryToLeafEntryPrefixedKey(props)
        case 'ref':     return refEntryToLeafEntryPrefixedKey(props)
        case 'zSet':    return zSetEntryToLeafEntryPrefixedKey(props)
        case 'sql':     return sqlEntryToLeafEntryPrefixedKey(props)
    }
}


export function grpcEntryToEntry(
    grpcEntry: TxEntry__Output
): immu.Entry {
    return binEntryToEntry(grpcEntryToBinEntry(grpcEntry))
}



export function grpcEntryToBinEntry(
    grpcEntry: TxEntry__Output
): immu.BinEntry {

    const meta = grpcEntry.metadata == undefined 
        ? undefined
        : {
            deleted: grpcEntry.metadata?.deleted,
            nonIndexable: grpcEntry.metadata?.nonIndexable,
            expiresAt: grpcEntry.metadata?.expiration?.expiresAt,
        }

    return {
        type: 'bin',
        version: '1',
        meta,
        prefixedKey: grpcEntry.key,
        prefixedVal: grpcEntry.value,
    }
}