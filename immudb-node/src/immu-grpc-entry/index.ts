import type { Entry__Output } from 'immudb-grpcjs/immudb/schema/Entry.js'
import type { KVMetadata__Output } from 'immudb-grpcjs/immudb/schema/KVMetadata'
import { Tx__Output } from 'immudb-grpcjs/immudb/schema/Tx.js'
import { TxEntry__Output } from 'immudb-grpcjs/immudb/schema/TxEntry.js'
import { ZEntry__Output } from 'immudb-grpcjs/immudb/schema/ZEntry.js'
import * as ie from '../immu-entry/index.js'
import type * as immu from '../types/A.js'




export function grpcZEntryToZSetEntryAndValTxEntryAndRefTxEntry(
    entry: ZEntry__Output
): {
    zSetEntry: immu.ZSetEntry,
    valTxEntry: immu.ValTxEntry,
    refTxEntry?: immu.RefTxEntry,
} {
    
    if(entry.entry == undefined) {
        throw 'ZEntry__Output["entry"]: Entry__Output must be defined'
    }
    if(typeof entry.score !== 'number') {
        throw 'score must be number'
    }

    const zSetEntry: immu.ZSetEntry = {
        type:               'zSet',
        version:            '1',
        zSet:               entry.set,
        referredKeyScore:   entry.score,
        referredAtTxId:     entry.atTx,
        referredKey:        entry.key,
    }

    return {
        zSetEntry,
        ...grpcEntryToValTxEntryAndRefTxEntry(entry.entry),
    }
}




export function grpcTxEntryToTxEntry(
    tx: Tx__Output,
    grpcEntry: TxEntry__Output
): immu.TxEntry {

    if(tx.header == undefined) {
        throw 'transaction must be defined'
    }

    const binEntry = grpcEntryToBinEntry(grpcEntry)
    const entry = ie.binEntryToEntry(binEntry)
    const foundableEntry: immu.TxEntry = {
        ...entry,
        id: tx.header.id,
    }
    return foundableEntry
}


export function grpcEntryToBinEntry(
    grpcEntry: TxEntry__Output
): immu.BinEntry {

    const meta = grpcEntry.metadata == undefined 
        ? undefined
        : {
            deleted: grpcEntry.metadata?.deleted,
            nonIndexable: grpcEntry.metadata?.nonIndexable,
            expiresAt: grpcEntry.metadata?.expiration?.expiresAt,
        }

    return {
        type: 'bin',
        version: '1',
        meta,
        prefixedKey: grpcEntry.key,
        prefixedVal: grpcEntry.value,
    }
}



export function grpcEntryToValTxEntryAndRefTxEntry(
    entry: Entry__Output
): {
    valTxEntry:   immu.ValTxEntry & immu.IndexerInfo, 
    refTxEntry?:  immu.RefTxEntry & immu.IndexerInfo,
} {

    
    const valTxEntry: immu.ValTxEntry & immu.IndexerInfo = {
        type:       'val',
        version:    '1',
        key:        entry.key,
        val:        entry.value,
        meta:       grpcMetaToEntryMeta(entry.metadata),
        expired:    entry.expired,
        revision:   entry.revision,
        id:         entry.tx,
    }


    if(entry.referencedBy == undefined) { // value entry
        return {valTxEntry}

    }
    
    const refTxEntry: immu.RefTxEntry & immu.IndexerInfo = {
        type:           'ref',
        version:        '1',
        key:            entry.referencedBy.key,
        referredKey:    entry.key,
        referredAtTxId: entry.referencedBy.atTx,
        meta:           grpcMetaToEntryMeta(entry.referencedBy.metadata),
        revision:       entry.referencedBy.revision,
        id:             entry.referencedBy.tx,
    }

    return {valTxEntry, refTxEntry}
}


export function grpcMetaToEntryMeta(
    props?: KVMetadata__Output | null
): immu.EntryMetadata | undefined {
    if(props == null) {
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