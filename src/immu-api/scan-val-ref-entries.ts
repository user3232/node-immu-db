import { type ImmuServiceClient } from '../proto/immudb/schema/ImmuService.js'
import type * as types from '../types/index.js'
import * as immuConvert from '../immu-convert/index.js'
import * as grpcjs from '@grpc/grpc-js'
import * as immuGrpc from '../immu-grpc/index.js'
import * as buffer from '../buffer.js'
import * as stream from '../immu-stream-kv/index.js'


import { Buffer } from 'node:buffer'
import Long from 'long'




export type ScanValRefEntriesProps = {
    /** 
     * Sort order, default is ascending. To order descending set this field to
     * `true`. 
     */
    sortDescending?: boolean,
    /** 
     * Stop scanning before (if {@link ScanValRefEntriesProps.includeStopAtKey} not
     * set or `false`) or at key (if {@link ScanValRefEntriesProps.includeStopAtKey}
     * set to `true`). 
     *
     * If undefined, scan to end (default).
     */
    scanStopAtKey?: Buffer,
    /**
     * Include {@link scanStopAtKey} in scan if set to `true`,
     * don't include otherwise.
     */
    includeStopAtKey?: boolean,
    /**
     * Scan will not output entries until specified key.
     */
    scanSkipToKey?: Buffer,
    /**
     * Wheader include {@link ScanValRefEntriesProps.scanSkipToKey} in output. Key
     * will be included if fild set to `true`, otherwise it will not be
     * included.
     */
    includeSkipToKey?: boolean,
    /** Limit output to number, no limit if `undefined` (default). */
    limit?: Long,
    /** 
     * If set outputs only keys starting with specified prefix. 
     * Not set does nothing (default).
     * */
    filterToKeyPrefix?: Buffer,
    /**
     * Get keys in transactions (database) after specified id.
     * 
     * Simulate situation as if database consists of transactions:
     * - from transaction `seenAtTxId`
     * - to most recent transaction.
     */
    seenSinceTxId?: Long,
    /**
     * If set to `true`, seek does not wait for indexer to be synchronized.
     * This mean that operation may return stale values.
     * 
     * Not set does nothing (default).
     */
    dontWaitForLatestKeys?: boolean
}

export function createScanValRefEntries(client: ImmuServiceClient) {

    const scanKVEntriesGrpc = immuGrpc.unaryCall.createScan(client)

    return function scanValRefEntries(props: ScanValRefEntriesProps & {
        credentials: grpcjs.CallCredentials
    }) {

        return scanKVEntriesGrpc({
            request: {
                desc:           props.sortDescending,
                endKey:         props.scanStopAtKey,
                inclusiveEnd:   props.includeStopAtKey,
                inclusiveSeek:  props.includeSkipToKey,
                limit:          props.limit,
                noWait:         props.dontWaitForLatestKeys,
                sinceTx:        props.seenSinceTxId,
                prefix:         props.filterToKeyPrefix,
                seekKey:        props.scanSkipToKey,
            },
            options: {
                credentials:    props.credentials,
            }
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('Entries__output must be defined')
        )
        .then(kvs => {
            return kvs.entries.map(
                immuConvert.grpcEntryToValOrValRefEntry
            )
        })

    }

}




export function createScanValRefEntriesStreaming(client: ImmuServiceClient) {

    const streamScanGrpc = immuGrpc.readerCall.createStreamScan(client)


    /**
     * Example usage:
     * 
     * ```ts
     * 
     * const buffs: Buffer[] = []
     * for await (const chunk of scanValRefEntriesStreaming({})) {
     *     buffs.push(chunk.content)
     * }
     * const valRefEntries = toKVEntries(Buffer.concat(buffs))
     * console.log(valRefEntries)
     * 
     * ```
     */
    return function scanValRefEntriesStreaming(props: ScanValRefEntriesProps & {
        credentials: grpcjs.CallCredentials
    }) {

        return streamScanGrpc({
            request: {
                desc:           props.sortDescending,
                endKey:         props.scanStopAtKey,
                inclusiveEnd:   props.includeStopAtKey,
                inclusiveSeek:  props.includeSkipToKey,
                limit:          props.limit,
                noWait:         props.dontWaitForLatestKeys,
                sinceTx:        props.seenSinceTxId,
                prefix:         props.filterToKeyPrefix,
                seekKey:        props.scanSkipToKey,
            },
            credentials:        props.credentials,
            
        })

       

    }

}


