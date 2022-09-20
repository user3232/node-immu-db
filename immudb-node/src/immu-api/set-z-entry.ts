import { type ImmuServiceClient } from 'immudb-grpcjs/immudb/schema/ImmuService.js'
import type * as types from '../types/index.js'
import * as immuConvert from '../immu-convert/index.js'
import * as grpcjs from '@grpc/grpc-js'
import * as immuGrpc from '../immu-grpc/index.js'
import * as buffer from '../buffer.js'
import Long from 'long'



export type SetZEntryProps = {
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
     * Key of Set holding ZEntries.
     */
    set: Buffer,
    /**
     * Key to include in set {@link SetZEntryProps.set}.
     */
    key: Buffer,
    /**
     * Key index in set.
     */
    keyIndex: number,
    /** 
     * Optional transaction id for seeing key by indexer. If not set this value
     * will be set to `0` by immudb, meaning reference to latest value of key.
     */
    keyTxId?: Long,
    /**
     * Setting this value to:
     * - `true` and if {@link SetZEntryProps.keyTxId} is not set, then immudb
     *   will set {@link SetZEntryProps.keyTxId} to latest transaction id.
     * - `true` and if {@link SetZEntryProps.keyTxId} is set
     *   than operation behaviour is unknown.
     * - `false` or `undefinde` (default) operation behaviour will
     *   not be changed.
     */
    boundRef?: boolean,
}


export function createSetZSetEntry(client: ImmuServiceClient) {
    const setZEntryGrpc = immuGrpc.unaryCall.createZAdd(client)

    
    return function setZEntry(props: SetZEntryProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return setZEntryGrpc({
            request: {
                set:    props.set,
                key:    props.key,
                score:  props.keyIndex,
                atTx:   props.keyTxId,
                noWait: props.options?.dontWaitForIndexer,
                boundRef: props.boundRef,
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('TxHeader__Output  must be defined')
        )
        .then(grpcTx => {

            const tx = immuConvert.toTxFromTxHeader__Output(grpcTx)
            const entry: types.ZEntryVerifiable = {
                type:                   'zSet',
                entry: {
                    refKey:             props.key,
                    refKeySeenFromTxId: props.keyTxId ?? Long.UZERO,
                    score:              props.keyIndex,
                    zSet:               props.set,
                },
                txId:                   tx.id,
                tx:                     tx,
                id:                     1,
            }

            return entry
        })
    }
}




