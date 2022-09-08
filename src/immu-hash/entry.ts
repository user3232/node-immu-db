import Long from 'long'
import * as hash from './hash.js'
import * as buffer from '../buffer.js'
import { 
    fromEntryMetadata, 
    binaryFormatEntryMetadataLength, 
    binaryFormatKVMetadata__Output 
} from '../immu-binary-format/entryMetadata.js'
import { Entry__Output } from 'proto/immudb/schema/Entry.js'
import { ValEntry } from '../types/index.js'



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
    props: ValEntry
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