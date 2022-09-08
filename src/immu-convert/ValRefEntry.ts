import type { Entry__Output } from "../proto/immudb/schema/Entry.js";
import type * as types from "../types/index.js";
import * as buffer from '../buffer.js'
import { ZEntry__Output } from "proto/immudb/schema/ZEntry.js";
import Long from "long";





export function grpcZEntryToZSetEntry(
    entry: ZEntry__Output
): types.ZEntry {
    if(entry.entry == undefined) {
        throw 'ZEntry__Output["entry"]: Entry__Output must be defined'
    }
    if(typeof entry.score !== 'number') {
        throw 'score must be number'
    }
    return {
        refKey:             entry.key,
        refKeySeenFromTxId: entry.atTx,
        score:              entry.score,
        zSet:               entry.set,
    }
}



export function grpcEntryToValOrValRefEntry(
    entry: Entry__Output
): (types.ValEntryVerifiable | types.ValRefEntryVerifiable) & types.IndexerInfo {

    
    const valEntry = {
        key: entry.key,
        val: entry.value,
        meta: entry.metadata == undefined ? undefined : {
            deleted: entry.metadata.deleted,
            nonIndexable: entry.metadata.nonIndexable,
            expiresAt: entry.metadata.expiration?.expiresAt,
        },
    }


    if(entry.referencedBy == undefined) { // value entry
        
        const valEntryVer: types.ValEntryVerifiable & types.IndexerInfo = {
            type: 'val',
            txId: entry.tx,
            entry: valEntry,
            expired: entry.expired,
            revision: entry.revision,
        }
        return valEntryVer

    }
    else { // value and ref entry

        const refAndValEntry: types.ValRefEntryVerifiable & types.IndexerInfo = {
            type: 'val-ref',
            txId: entry.tx,
            entry: valEntry,
            expired: entry.expired,
            revision: entry.revision,

            refTxId: entry.referencedBy.tx,
            refEntry: {
                key: entry.referencedBy.key,
                refKey: entry.key,
                refKeySeenFromTxId: entry.referencedBy.atTx,
                meta: entry.referencedBy.metadata == undefined ? undefined : {
                    deleted: entry.referencedBy.metadata.deleted,
                    nonIndexable: entry.referencedBy.metadata.nonIndexable,
                    expiresAt: entry.referencedBy.metadata.expiration?.expiresAt,
                },
            },
        }

        return refAndValEntry

    }
}

