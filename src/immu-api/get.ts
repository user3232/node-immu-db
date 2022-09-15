import { type ImmuServiceClient } from '../proto/immudb/schema/ImmuService.js'
import type * as types from '../types/index.js'
import * as immuConvert from '../immu-convert/index.js'
import * as grpcjs from '@grpc/grpc-js'
import * as immuGrpc from '../immu-grpc/index.js'
import * as buffer from '../buffer.js'
import Long from 'long'
import { Entry__Output } from 'proto/immudb/schema/Entry.js'
import { EntriesSpec } from 'proto/immudb/schema/EntriesSpec.js'
import * as kvm from '../immu-kvm/index.js'



export type GetValRefProps = {
    /**
     * Key to look for.
     */
    key: Buffer, 
    /**
     * Get key value heaving revision.
     *
     * Each set key operation creates key revision, for the same key:
     * - first set creates revision `1`,
     * - second set creates revision `2`,
     * - and so on.
     *
     * Getting key with revision:
     * - `0` or `undefined` (default) - means most recent revision,
     * - `1`, `2`, ... - means first set key, second set key, ..., 
     * - `-1`, `-2`, ... - means one before recent revision, two before recent
     *   revision, ...
     */
    revision?: Long, 
    /**
     * Get key in transaction (database) with specified id.
     * 
     * Simulate situation as if database consists of transactions:
     * - from transaction 0
     * - to transaction `seenAtTxId`.
     */
    seenAtTxId?: Long, 
    /**
     * Get key in transactions (database) after specified id.
     * 
     * Simulate situation as if database consists of transactions:
     * - from transaction `seenAtTxId`
     * - to most recent transaction.
     */
    seenSinceTxId?: Long, 
    /**
     * Operation options.
     */
    options?: {
        /**
         * Do not wait for ImmuDb to update database indexes, setting this
         * value to `true` may cause operation to speed up in exchange for
         * stale database latest keys values.
         *
         * For example geting key value will return key value pointed by
         * indexer. If indexer is not up to date, returned value may be not
         * latest value.
         *
         * Default value is `false`.
         */
        dontWaitForIndexer?: boolean,
    }
}


export function createGetValRef(client: ImmuServiceClient) {
    const getGrpc = immuGrpc.unaryCall.createGet(client)

    /**
     * Sets key-value pair(s) for given session defined in credentials
     */
    return function getValRef(props: GetValRefProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return getGrpc({
            request: {
                key:            props.key,
                atRevision:     props.revision,
                atTx:           props.seenAtTxId,
                sinceTx:        props.seenSinceTxId,
                noWait:         props.options?.dontWaitForIndexer,
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('tx must be defined')
        )
        .then(immuConvert.grpcEntryToValOrValRefEntry)
    }
}











export type GetAllValRefsProps = {
    /**
     * Keys of entries to obtain.
     */
    keys: Buffer[], 
    /**
     * Get keys in transactions (database) after specified id.
     * 
     * Simulate situation as if database consists of transactions:
     * - from transaction `seenAtTxId`
     * - to most recent transaction.
     */
    seenSinceTxId?: Long, 
}


export function createGetValRefs(client: ImmuServiceClient) {
    const getAllGrpc = immuGrpc.unaryCall.createGetAll(client)

    /**
     * Sets key-value pair(s) for given session defined in credentials
     */
    return function getValRefs(props: GetAllValRefsProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return getAllGrpc({
            request: {
                keys:       props.keys,
                sinceTx:    props.seenSinceTxId,
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('tx must be defined')
        )
        .then(grpcEntries => grpcEntries.entries.map(
            immuConvert.grpcEntryToValOrValRefEntry
        ))
    }
}



export type GetTxWithEntriesProps = {
    /**
     * Resolve references or not:
     * - `true` - resolve,
     * - `false` or `undefined` - do not resolve.
     */
    resolveRefs?: boolean, 
    /**
     * Id of transaction to retrive
     */
    txId?: Long, 
    /**
     * Operation options.
     */
    options?: {
        /**
         * Do not wait for ImmuDb to update database indexes, setting this
         * value to `true` may cause operation to speed up in exchange for
         * stale database latest keys values.
         *
         * For example geting key value will return key value pointed by
         * indexer. If indexer is not up to date, returned value may be not
         * latest value.
         *
         * Default value is `false`.
         */
        dontWaitForIndexer?: boolean,
    },
    /**
     * Get keys in transactions (database) after specified id.
     * 
     * Simulate situation as if database consists of transactions:
     * - from transaction `seenAtTxId`
     * - to most recent transaction.
     */
    seenSinceTxId?: Long, 
    /** 
     * Action performed on transaction KVEntries and RefEntries:
     * - `EXCLUDE` - filter out (value?),
     * - `ONLY_DIGEST` (default) - filter to digest of value,
     * - `RAW_VALUE` - just value?,
     * - `RESOLVE` - if KVEntry is RefEntry (special KVEntry heaving as value
     *   referenced key), value will be value of referenced key. ZEntry does
     *   not have value (everything is encoded in key).
     * 
     * `ONLY_DIGEST` is default if not specified.
     */
    kvOrRefEntryAction?: 
        | 'EXCLUDE' 
        | 'ONLY_DIGEST' 
        | 'RAW_VALUE' 
        | 'RESOLVE',
    /** 
     * Action performed on transaction SqlEntries:
     * - `EXCLUDE` - filter out (value?),
     * - `ONLY_DIGEST` (default) - filter to digest of value,
     * - `RAW_VALUE` - just value?
     * 
     * `ONLY_DIGEST` is default if not specified.
     */
    sqlEntryAction?: 
        | 'EXCLUDE' 
        | 'ONLY_DIGEST' 
        | 'RAW_VALUE',
    /** 
     * Action performed on ZEntries:
     * - `EXCLUDE` - filter out (value?),
     * - `ONLY_DIGEST` - filter to digest of value,
     * - `RAW_VALUE` - just value? (ZEntry have empty value, everything is encoded in key),
     * - `RESOLVE` - value will be referenced key value.
     * 
     * `ONLY_DIGEST` is default if not specified.
     */
    zEntryAction?: 
        | 'EXCLUDE' 
        | 'ONLY_DIGEST' 
        | 'RAW_VALUE' 
        | 'RESOLVE',
}


export function createGetTxWithEntries(client: ImmuServiceClient) {
    const getTxByIdGrpc = immuGrpc.unaryCall.createTxById(client)

    /**
     * Sets key-value pair(s) for given session defined in credentials
     */
    return function getTxWithEntries(props: GetTxWithEntriesProps & {
        credentials: grpcjs.CallCredentials,
    }) {



        return getTxByIdGrpc({
            request: { 
                tx:                         props.txId,
                keepReferencesUnresolved:   props.resolveRefs,
                noWait:                     props?.options?.dontWaitForIndexer,
                sinceTx:                    props.seenSinceTxId,
                entriesSpec:                
                    props.kvOrRefEntryAction 
                    || props.sqlEntryAction 
                    || props.zEntryAction
                    ? {
                        kvEntriesSpec: props.kvOrRefEntryAction  
                            ? {action: props.kvOrRefEntryAction}  
                            : undefined,
                        sqlEntriesSpec: props.sqlEntryAction 
                            ? {action: props.sqlEntryAction} 
                            : undefined,
                        zEntriesSpec: props.zEntryAction   
                            ? {action: props.zEntryAction}   
                            : undefined,
                    }
                    : undefined,
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('Tx__Output must be defined')
        )
        .then(grpcEntries => grpcEntries)
    }
}



export type GetTxWGenericEntriesProps = {
    /**
     * Resolve references or not:
     * - `true` - resolve,
     * - `false` or `undefined` - do not resolve.
     */
    resolveRefs?: boolean, 
    /**
     * Id of transaction to retrive
     */
    txId?: Long, 
    /**
     * Operation options.
     */
    options?: {
        /**
         * Do not wait for ImmuDb to update database indexes, setting this
         * value to `true` may cause operation to speed up in exchange for
         * stale database latest keys values.
         *
         * For example geting key value will return key value pointed by
         * indexer. If indexer is not up to date, returned value may be not
         * latest value.
         *
         * Default value is `false`.
         */
        dontWaitForIndexer?: boolean,
    },
    /**
     * Get keys in transactions (database) after specified id.
     * 
     * Simulate situation as if database consists of transactions:
     * - from transaction `seenAtTxId`
     * - to most recent transaction.
     */
    seenSinceTxId?: Long, 
}


export function createGetTxGenericEntries(client: ImmuServiceClient) {
    const getTxByIdGrpc = immuGrpc.unaryCall.createTxById(client)

    /**
     * 
     */
    return function getTxWGenericEntries(props: GetTxWGenericEntriesProps & {
        credentials: grpcjs.CallCredentials,
    }) {



        return getTxByIdGrpc({
            request: { 
                tx:                         props.txId,
                keepReferencesUnresolved:   props.resolveRefs,
                noWait:                     props?.options?.dontWaitForIndexer,
                sinceTx:                    props.seenSinceTxId,
                entriesSpec: {
                    kvEntriesSpec:  {action: 'RAW_VALUE'},
                    zEntriesSpec:   {action: 'RAW_VALUE'},
                    sqlEntriesSpec: {action: 'RAW_VALUE'},
                },
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('Tx__Output must be defined')
        )
        .then(tx => {
            

            return tx.entries.map((entry, entryIndex) => {
                if(tx.header == undefined) {
                    throw 'transaction must be defined'
                }
                const meta = entry.metadata == undefined 
                ? undefined
                : {
                    deleted: entry.metadata?.deleted,
                    nonIndexable: entry.metadata?.nonIndexable,
                    expiresAt: entry.metadata?.expiration?.expiresAt,
                }

                const decoded: kvm.GenericVerifiableEntry = {
                    ...kvm.decodeKeyValMeta({
                        key: entry.key, 
                        val: entry.value, 
                        meta,
                    }),
                    entryTxId: tx.header.id,
                    entryId: entryIndex + 1, 
                }
                return decoded
            })
        })
    }
}




export function createGetValRefStreaming(client: ImmuServiceClient) {

    const streamGetGrpc = immuGrpc.readerCall.createStreamGet(client)


    /**
     * Example usage:
     * 
     * ```ts
     * 
     * const buffs: Buffer[] = []
     * for await (const chunk of getValRefStreaming({key: Buffer.from('some key')})) {
     *     buffs.push(chunk.content)
     * }
     * const history = toKVEntry(Buffer.concat(buffs))
     * console.log(history)
     * 
     * ```
     * 
     */
    return function getValRefStreaming(props: GetValRefProps & {
        credentials: grpcjs.CallCredentials
    }) {

        return streamGetGrpc({
            request: {
                key:            props.key,
                atRevision:     props.revision,
                atTx:           props.seenAtTxId,
                sinceTx:        props.seenSinceTxId,
                noWait:         props.options?.dontWaitForIndexer,
            },
            credentials:        props.credentials,
            
        })

        
    }

}


