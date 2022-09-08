import { type ImmuServiceClient } from '../proto/immudb/schema/ImmuService.js'
import type * as types from '../types/index.js'
import * as immuConvert from '../immu-convert/index.js'
import * as grpcjs from '@grpc/grpc-js'
import * as immuGrpc from '../immu-grpc/index.js'
import * as buffer from '../buffer.js'
import Long from 'long'


export type DeleteValRefProps = {
    /**
     * Array of key value pairs to set.
     */
    keys: Buffer[], 
    /**
     * Delete keys in transactions (database) after specified id.
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


export function createDeleteValRef(client: ImmuServiceClient) {
    const deleteGrpc = immuGrpc.unaryCall.createDelete(client)

    /**
     * Deletes keys for given session defined in credentials
     */
    return function deleteValRef(props: DeleteValRefProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return deleteGrpc({
            request: {
                keys:       props.keys,
                sinceTx:    props.seenSinceTxId,
                noWait:     props.options?.dontWaitForIndexer,
                
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('tx must be defined')
        )
        .then(grpcTx => {
            const tx = immuConvert.toTxFromTxHeader__Output(grpcTx)
            return tx
        })
    }
}

