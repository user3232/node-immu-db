import * as grpc from '@grpc/grpc-js'
import * as gi from '../../grpc/index.js'
import * as common from '../../common/index.js'
import Long from "long"

import { KeyRequest } from 'proto/immudb/schema/KeyRequest.js'
import { Entry__Output } from 'proto/immudb/schema/Entry.js'





/**
 * Loads database
 */
export function getKeyValue(
    ctx: {
        immudbGrpcApi:          gi.ImmudbGrpcApi,
        sessionCredentials?:    grpc.CallCredentials
    }, 
    props: GetKeyValueProps,
) {
    const {immudbGrpcApi, sessionCredentials} = ctx
    
    return immudbGrpcApi.get({
        request: toRequest(props),
        credentials: sessionCredentials,
    })
    .then(result => ({
        info: result.info, 
        data: fromResponse(result.data)
    }))
    
}




export type GetKeyValueProps = {
    /**
     * Key for which value is to be obtained
     */
    key: string,



    /**
     * Last value seen at transaction with number atTx.
     */
    atTx?: Long,

    /**
     * First value seen after transaction with number.
     */
    sinceTx?: Long,

    /**
     * Each historical value for a single key is attached a revision number.
     * Revision numbers start with 1 and each overwrite of the same key results
     * in a new sequential revision number assignment.
     *
     * A negative revision number can also be specified which means the nth
     * historical value, e.g. -1 is the previous value, -2 is the one before and
     * so on.
     */
    atRevision?: Long,


    /**
     * Wait for immudb database index to be up to date?
     * * not wait, read may be stale --> set this property to `true`
     * * (default) wait, read will be actual --> set this property to `false` or
     *   leave undefined
     */
    noWait?: boolean
}


/**
 * Transforms CreateDatabaseProps to CreateDatabaseRequest.
 */
export function toRequest(props: GetKeyValueProps): KeyRequest {
    
    return {
        key:        Buffer.from(props.key),
        noWait:     props.noWait,
        atRevision: props.atRevision,
        atTx:       props.atTx,
        sinceTx:    props.sinceTx,
    }
}




export type GetKeyValueResult = {
    /**
     * With which transaction number is associated
     * obtained key value
     */
    tx: Long,


    /**
     * Number representing version of this key-value.
     * 
     * Setting key-value multiple times creates new revision
     * numbers in ascending order.
     */
    revision: Long,

    /**
     * Key of obtained key value
     */
    key: string,

    /**
     * Value of obtained key value
     */
    value: string,

    /**
     * Have this key-value expired flag set?
     * 
     */
    expired: boolean,

    /**
     * Metadata part of this key-value
     */
    metadata: {
        /**
         * is this key-value in deleted state?
         */
        deleted?: boolean,

        /**
         * Is this key-value non-indexable?
         */
        nonIndexable?: boolean,

        /**
         * When this key-value will expire?
         * (making it not available to get command)
         */
        expiresAt?: Date
    },

    referencedBy: {
        /**
         * Transaction number that created this reference.
         */
        tx?:                 Long,
        /**
         * Key of this reference key value
         */
        key?:                string,
        /**
         * This referenve transaction number of refered key value
         */
        atTx?:               Long,
        /**
         * This referenve revision of refered key value
         */
        revision?:           Long,
        /**
         * This reference metadata of refered key-value
         */
        metadata: {
            /**
             * is this reference refered key-value in deleted state?
             */
            deleted?:       boolean,

            /**
             * Is this reference refered key-value non-indexable?
             */
            nonIndexable?:  boolean,

            /**
             * When this reference refered key-value will expire?
             * (making it not available to get command)
             */
            expiresAt?:     Date
        },
    }
}

export function fromResponse(response: Entry__Output): GetKeyValueResult {
    
    return {
        key: response.key.toString(),
        value: response.value.toString(),

        expired: response.expired,
        revision: response.revision,
        tx: response.tx,
        metadata: {
            deleted: response.metadata?.deleted,
            expiresAt: common.maybeDateFromLong(response.metadata?.expiration?.expiresAt),
            nonIndexable: response.metadata?.nonIndexable,
        },
        referencedBy: {
            atTx: response.referencedBy?.atTx,
            key: response.referencedBy?.key.toString(),
            revision: response.referencedBy?.revision,
            tx: response.referencedBy?.tx,
            metadata: {
                deleted: response.referencedBy?.metadata?.deleted,
                expiresAt: common.maybeDateFromLong(response.referencedBy?.metadata?.expiration?.expiresAt),
                nonIndexable: response.referencedBy?.metadata?.nonIndexable,
            }
        }
    }
}