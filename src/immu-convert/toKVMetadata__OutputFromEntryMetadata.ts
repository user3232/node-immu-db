import type { KVMetadata__Output } from "proto/immudb/schema/KVMetadata";
import type { EntryMetadata } from '../types/index.js'




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