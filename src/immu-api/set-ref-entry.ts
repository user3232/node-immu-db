import { type ImmuServiceClient } from '../proto/immudb/schema/ImmuService.js'
import type * as types from '../types/index.js'
import * as immuConvert from '../immu-convert/index.js'
import * as grpcjs from '@grpc/grpc-js'
import * as immuGrpc from '../immu-grpc/index.js'
import * as buffer from '../buffer.js'
import Long from 'long'


/**
 * Specifies how to set RefEntry.
 */
export type SetRefEntryProps = {
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
     * All conditions must be fullfilled for all key values.
     */
    preconditions?: types.ValOrRefKeyPrecondition[],
    /**
     * Key to include in set {@link SetRefEntryProps.set}.
     */
    key: Buffer,
    /**
     * Key to reference.
     */
    referToKey: Buffer,
    /** 
     * Optional transaction id for seeing key by indexer. If not set this value
     * will be set to `0` by immudb, meaning reference to latest value of key.
     */
    keyTxId?: Long,
    /**
     * Setting this value to:
     * - `true` and if {@link SetRefEntryProps.keyTxId} is not set, then immudb
     *   will set {@link SetRefEntryProps.keyTxId} to latest transaction id.
     * - `true` and if {@link SetRefEntryProps.keyTxId} is set
     *   than operation behaviour is unknown.
     * - `false` or `undefinde` (default) operation behaviour will
     *   not be changed.
     */
    boundRef?: boolean,
}


export function createSetRefEntry(client: ImmuServiceClient) {
    const setRefEntryGrpc = immuGrpc.unaryCall.createSetReference(client)

    
    return function setRefEntry(props: SetRefEntryProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return setRefEntryGrpc({
            request: {

                referencedKey:  props.referToKey,
                key:            props.key,
                atTx:           props.keyTxId,
                boundRef:       props.boundRef,
                preconditions:  props.preconditions?.map(
                    immuConvert.toPreconditionFromKVEntryPrecondition
                ),
                
                noWait:         props.options?.dontWaitForIndexer,
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

            const refKeySeenFromTxId: Long = props.keyTxId !== undefined
                ? props.keyTxId
                : props.boundRef === true 
                    ? tx.id
                    : Long.UZERO

            const ref: types.RefEntryVerifiable = {
                type:                   'ref',
                entry: {
                    key:                props.key,
                    refKey:             props.referToKey,
                    refKeySeenFromTxId: refKeySeenFromTxId,
                    meta:               undefined,
                },
                txId:                   tx.id,
                tx:                     tx,
                id:                     1,
            }

            return ref
        })
    }
}




