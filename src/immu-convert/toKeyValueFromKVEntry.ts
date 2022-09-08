import { KeyValue } from "../proto/immudb/schema/KeyValue";
import { EntryMetadata, ValEntry } from "../types/index.js";
import * as buffer from '../buffer.js'


export function toKeyValueFromKVEntry(
    props: ValEntry
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