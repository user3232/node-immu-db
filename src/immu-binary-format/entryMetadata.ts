import { Buffer } from 'node:buffer'
import { KVMetadata__Output } from 'proto/immudb/schema/KVMetadata.js'
import { EntryMetadata } from '../types/index.js'






export function binaryFormatEntryMetadataLength(metadata?: EntryMetadata) {
    let length = 0
    if(metadata?.deleted === true) {
        length += 1 // tag for deleted as UInt8
    }
    if(metadata?.expiresAt !== undefined) {
        length += 1 // tag for expiration as UInt8
        length += 8 // expiration as UInt64 BE
    }
    if(metadata?.nonIndexable === true) {
        length += 1 // tag for nonIndexable as UInt8
    }

    return length
}


/**
 * Binary formats entry KV metadata as concatence of following buffers:
 * - if `deleted` is true than buffer with `0x00` byte otherwise empty buffer
 * - if `expiration.expiresAt` is defined than buffer with `0x01` byte otherwise
 *   empty buffer
 * - if `expiration.expiresAt` is defined than buffer with `expiresAt` as UInt64
 *   BE otherwise empty buffer
 * - if `nonIndexable` is true buffer with `0x02` byte otherwise empty buffer
 */
export function fromEntryMetadata(metadata?: {
    deleted?: boolean,
    expiration?: Long,
    nonIndexable?: boolean,
}) {
    
    return Buffer.concat([
        (metadata?.deleted === true
            ? Buffer.of(0x00)
            : Buffer.of()
        ),
        (metadata?.expiration !== undefined
            ? Buffer.of(0x01)
            : Buffer.of()
        ),
        (metadata?.expiration !== undefined
            ? Buffer.from(metadata.expiration.toBytesBE())
            : Buffer.of()
        ),
        (metadata?.nonIndexable === true
            ? Uint8Array.of(0x02)
            : Uint8Array.of()
        )
    ])
}


/**
 * Binary formats entry KV metadata as concatence of following buffers:
 * - if `deleted` is true than buffer with `0x00` byte otherwise empty buffer
 * - if `expiration.expiresAt` is defined than buffer with `0x01` byte otherwise
 *   empty buffer
 * - if `expiration.expiresAt` is defined than buffer with `expiresAt` as UInt64
 *   BE otherwise empty buffer
 * - if `nonIndexable` is true buffer with `0x02` byte otherwise empty buffer
 */
export function binaryFormatKVMetadata__Output(
    props: KVMetadata__Output | null | undefined
): Buffer {
    
    if(props === null || props === undefined) {
        return Buffer.of()
    }

    const deletedTag = 0x0
    const expirationTag = 0x1
    const nonIndexableTag = 0x2

    return Buffer.concat([
        (props?.deleted === true
            ? Buffer.of(deletedTag)
            : Buffer.of()
        ),
        (props?.expiration?.expiresAt !== undefined
            ? Buffer.of(expirationTag)
            : Buffer.of()
        ),
        (props?.expiration?.expiresAt !== undefined
            ? Buffer.from(props.expiration.expiresAt.toBytesBE())
            : Buffer.of()
        ),
        (props?.nonIndexable === true
            ? Uint8Array.of(nonIndexableTag)
            : Uint8Array.of()
        )
    ])
}