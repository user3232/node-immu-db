import { KeyValue } from 'immudb-grpcjs/immudb/schema/KeyValue.js';
import { KVMetadata } from 'immudb-grpcjs/immudb/schema/KVMetadata.js';
import Long from 'long';
import * as immu from '../types/A.js'



export function kvmToValTxEntry(
    kvm: immu.KeyValMeta,
    txId: Long
): immu.ValTxEntry {

    return {
        type:       'val',
        version:    '1',
        key:        kvm.key,
        val:        kvm.val,
        meta:       kvm.meta,
        id:         txId,
    }

}







export function kvmToGrpcKeyValue(
    props: immu.KeyValMeta
): KeyValue {
    return {
        key:        props.key, 
        value:      props.val,
        metadata:   metaToGrpcKVMetadata(props.meta)
    }
}

function metaToGrpcKVMetadata(
    meta?: immu.EntryMetadata
): KVMetadata | undefined {
    if(meta == undefined) {
        return undefined
    }

    return {
        deleted:        meta.deleted,
        nonIndexable:   meta.nonIndexable,
        expiration: meta.expiresAt == undefined ? undefined : {
            expiresAt:  meta.expiresAt,
        }
    }
}
