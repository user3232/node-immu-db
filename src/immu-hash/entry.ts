import * as immu from '../types/A.js'
import * as hash from './hash.js'
import * as buffer from '../buffer.js'
import { 
    fromEntryMetadata, 
    binaryFormatEntryMetadataLength, 
    binaryFormatKVMetadata__Output 
} from '../immu-binary-format/entryMetadata.js'
import { Entry__Output } from 'proto/immudb/schema/Entry.js'
import { ValEntryData } from '../types/index.js'
import { hashOfBinEntry } from './binEntry.js'
import { hashOfValEntry } from './valEntry.js'
import { hashOfRefEntry } from './refEntry.js'
import { hashOfZSetEntry } from './zSetEntry.js'
import { 
    hashOfSqlColumnEntry, 
    hashOfSqlDbEntry, 
    hashOfSqlIndexEntry, 
    hashOfSqlRowEntry, 
    hashOfSqlTableEntry 
} from './sqlEntry.js'
import { hashOfLeafEntry } from './leafEntry.js'



/**
 * Hashes key-value entry as hash of fallowing buffers:
 * - metadata binary format length as UInt16 BE
 * - metadata binary
 * - key prefix length plus key length as UInt16 BE
 * - key prefix (0x00)
 * - key
 * - hash of value prefix and value:
 *   - value prefix (0x00)
 *   - value 
 */
 export function ofEntry(
    props: ValEntryData
): Buffer {

    return hash.ofBuffers(
        buffer.fromUInt16BE(
            binaryFormatEntryMetadataLength(        // kv meta length
                props.meta
            )
        ), 
        fromEntryMetadata(props.meta),  // kv meta
        buffer.fromUInt16BE(1 + props.key.length),  // prefix + key length
        Buffer.of(0x0),                             // key prefix
        props.key,                                  // key
        hash.ofBuffers(                             // hash of:
            Buffer.of(0x0),                         // value prefix
            props.val                             // value
        ),
    )
}




/**
 * Hashes key-value entry as hash of fallowing buffers:
 * - metadata binary format length as UInt16 BE
 * - metadata binary
 * - key prefix length plus key length as UInt16 BE
 * - key prefix (0x00)
 * - key
 * - hash of value prefix and value:
 *   - value prefix (0x00)
 *   - value 
 */
export function ofEntry__Output(props: Entry__Output): Buffer {

    if(props.referencedBy) {
        throw 'Entry is not KV'
    }

    // metadata
    const kvMetadataBin = binaryFormatKVMetadata__Output(props.metadata)

    return hash.ofBuffers(
        buffer.fromUInt16BE(kvMetadataBin.length), // kv meta length
        kvMetadataBin,                             // kv meta
        buffer.fromUInt16BE(1 + props.key.length), // prefix + key length
        Buffer.of(0x0),                            // key prefix
        props.key,                                 // key
        hash.ofBuffers(                            // hash of:
            Buffer.of(0x0),                        // value prefix
            props.value                            // value
        ),
    )
}



export function hashOfEntry(entry: immu.Entry): Buffer {
    switch(entry.type) {
        case 'val':     return hashOfValEntry(entry)
        case 'ref':     return hashOfRefEntry(entry)
        case 'zSet':    return hashOfZSetEntry(entry)
        case 'hash':    return hashOfLeafEntry(entry)
        case 'bin':     return hashOfBinEntry(entry)
        case 'sql': 
            switch(entry.sqlType) {
                case 'row':     return hashOfSqlRowEntry(entry)
                case 'column':  return hashOfSqlColumnEntry(entry)
                case 'index':   return hashOfSqlIndexEntry(entry)
                case 'table':   return hashOfSqlTableEntry(entry)
                case 'db':      return hashOfSqlDbEntry(entry)
            }
    }   
}