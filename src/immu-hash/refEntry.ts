
import * as immu from '../types/A.js'
import * as hash from './hash.js'
import * as buffer from '../buffer.js'
import * as binary from '../immu-binary-format/index.js'
import { 
    fromEntryMetadata, 
    binaryFormatKVMetadata__Output, 
    binaryFormatEntryMetadataLength 
} from '../immu-binary-format/entryMetadata.js'
import { RefEntryData } from '../types/index.js'
import { PrefixKeyVal } from './consts.js'



/**
 * Hashes key-value entry as hash of fallowing buffers:
 * - metadata binary Buffer length as UInt16 BE Buffer
 * - metadata binary as Buffer Buffer
 * - key prefix length plus key length as UInt16 BE Buffer
 * - reference key prefix (0x00) as UInt8 Buffer
 * - reference key as Buffer
 * - hash of:
 *   - reference prefix (0x01) as UInt8 Buffer
 *   - reference transaction id as UInt64 BE Buffer
 *   - reference referencedKey prefix (0x00) as UInt8 Buffer
 *   - reference referencedKey as Buffer
 */
export function ofRefEntry(props: RefEntryData): Buffer {



    return hash.ofBuffers(
        buffer.fromUInt16BE(
            binaryFormatEntryMetadataLength(
                props.meta                     // kv meta length
            )
        ),
        fromEntryMetadata(props.meta),        // kv meta
        buffer.fromUInt16BE(
            1                                      // prefix length
            + props.key.length                     // key length
        ), 
        Buffer.of(0x0),                            // key prefix
        props.key,                                 // key
        hash.ofBuffers(                            // hash of:
            Buffer.of(0x01),                       // value reference prefix
            Buffer.from(props.refKeySeenFromTxId.toBytesBE()), // transaction of referenced key
            Buffer.of(0x00),                       // value key prefix
            props.refKey                    // value
        ),
    )
}




/**
 * Hashes key-value entry as hash of fallowing buffers:
 * - metadata binary Buffer length as UInt16 BE Buffer
 * - metadata binary as Buffer Buffer
 * - key prefix length plus key length as UInt16 BE Buffer
 * - reference key prefix (0x00) as UInt8 Buffer
 * - reference key as Buffer
 * - hash of:
 *   - reference prefix (0x01) as UInt8 Buffer
 *   - reference transaction id as UInt64 BE Buffer
 *   - reference referencedKey prefix (0x00) as UInt8 Buffer
 *   - reference referencedKey as Buffer
 */
 export function hashOfRefEntry(props: immu.RefEntry): Buffer {

    const meta = binary.fromEntryMetadata(props.meta)
    const metaLength = meta.byteLength


    const prefixKey = PrefixKeyVal
    const prefixKeyLength = prefixKey.byteLength
    const key = props.key
    const keyLength = key.byteLength
    const prefixedKeyLength = buffer.fromUInt16BE(prefixKeyLength + keyLength)

    const prefixValueRef = Buffer.of(0x01)

    const referredKeyAtTxId = Buffer.from(props.referredAtTxId.toBytesBE())
    const prefixValue = Buffer.of(0x00)
    const referredKey = props.referredKey
    const value = [
        referredKeyAtTxId,
        prefixValue,
        referredKey,
    ]

    const entryHash = hash.ofTreeBuffers(
        buffer.fromUInt16BE(metaLength),
        meta,
        prefixedKeyLength, 
        [
            prefixKey, 
            key,
        ],
        hash.ofTreeBuffers(
            prefixValueRef, 
            value, 
        )
    )


    return entryHash
}