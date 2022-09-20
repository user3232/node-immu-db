import type { KVMetadata__Output } from "immudb-grpcjs/immudb/schema/KVMetadata";
import type { EntryMetadata } from '../types/index.js'


export function toEntryMetadataFromKVMetadata__Output(
    props: KVMetadata__Output | null
): EntryMetadata | undefined {
    if(props === null) {
        return undefined
    }
    return {
        deleted: props.deleted,
        nonIndexable: props.nonIndexable,
        expiresAt: props.expiration === null
            ? undefined
            : props.expiration.expiresAt
    }
}