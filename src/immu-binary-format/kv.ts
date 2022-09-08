import Long from "long"
import {fromUInt16BE} from '../buffer.js'
import * as hash from '../immu-hash/hash.js'
import { Entry__Output } from "proto/immudb/schema/Entry.js"
import { KVMetadata__Output } from "proto/immudb/schema/KVMetadata.js"








export function fromEntry__Output_v1(props: Entry__Output) {
    if (!!props.referencedBy) {
        throw 'This is reference'
    }
    return fromKVM({
        key: props.key,
        value: props.value,
        metadata: fromKVMetadata__Output(props.metadata)
    })
}


function fromKVMetadata__Output(props: KVMetadata__Output | null) {
    if (!props) {
        return undefined
    }

    return {
        deleted: props.deleted,
        nonIndexable: props.nonIndexable,
        expiration: !props.expiration ? undefined : props.expiration.expiresAt
    }
}





export function fromKVM(props: {
    key: Buffer,
    value: Buffer,
    metadata?: {
        deleted?: boolean,
        nonIndexable?: boolean,
        expiration?: Long,
    },
}): Buffer {

    const metadataBuffer = props.metadata !== undefined
        ? binFromKVMetadata(props.metadata)
        : Buffer.of()

    const keyPrefix = Buffer.of(0x00)
    const prefixedKey = Buffer.concat([keyPrefix, props.key])


    const valeuPrefix = Buffer.of(0x00)
    const prefixedValue = Buffer.concat([valeuPrefix, props.value])
    const prefixedValueHash = hash.data(prefixedValue)

    return Buffer.concat([
        fromUInt16BE(metadataBuffer.length),  // metadata length (length 2)
        metadataBuffer,                             // metadata (length specified above)
        fromUInt16BE(prefixedKey.length),     // key length (length 2)
        prefixedKey,                                // key (length specified above)
        prefixedValueHash,                          // prefixed value hash
    ])
}


export function fromKV(props: {
    key: Buffer,
    value: Buffer,
}): Buffer {

    // prepare value for hashing
    const prefixedValue = Buffer.concat([Buffer.of(0x00), props.value])

    // binarize:
    return Buffer.concat([
        Buffer.of(0x00),            // key prefix
        props.key,                  // key
        hash.data(prefixedValue),   // value hash
    ])
}













export function binFromKVMetadata(props: {
    deleted?: boolean,
    nonIndexable?: boolean,
    expiration?: Long,
}): Buffer {
    const deletedTag = 0x0
    const expirationTag = 0x1
    const nonIndexableTag = 0x2

    return Buffer.concat([
        (props.deleted === true
            ? Buffer.of(deletedTag)
            : Buffer.of()
        ),
        (props.expiration !== undefined
            ? Buffer.of(expirationTag)
            : Buffer.of()
        ),
        (props.expiration !== undefined
            ? Buffer.from(props.expiration.toBytesBE())
            : Buffer.of()
        ),
        (props.nonIndexable === true
            ? Uint8Array.of(nonIndexableTag)
            : Uint8Array.of()
        )
    ])
}





