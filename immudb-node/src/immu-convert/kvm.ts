import { KVMetadata__Output } from "immudb-grpcjs/immudb/schema/KVMetadata";
import { KeyValue } from "immudb-grpcjs/immudb/schema/KeyValue";
import { EntryMetadata, ValEntryData } from "../types/index.js";


export function toKeyValueFromKVEntry(
    props: ValEntryData
): KeyValue {
    return {
        key:        props.key, 
        value:      props.val,
        metadata:   mapMetadata(props.meta)
    }
}

function mapMetadata(metadata?: EntryMetadata) {
    if(metadata == undefined) {
        return undefined
    }

    return {
        deleted:        metadata.deleted,
        nonIndexable:   metadata.nonIndexable,
        expiration: metadata.expiresAt == undefined ? undefined : {
            expiresAt:  metadata.expiresAt,
        }
    }
}



export function toKVMetadata__OutputFromEntryMetadata(
    props: EntryMetadata
): KVMetadata__Output {
    return {
        deleted: props.deleted ?? false,
        nonIndexable: props.nonIndexable ?? false,
        expiration: props.expiresAt
            ? {expiresAt: props.expiresAt}
            : null,
    }
}