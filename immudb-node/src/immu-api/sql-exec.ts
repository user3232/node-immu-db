import { type ImmuServiceClient } from 'immudb-grpcjs/immudb/schema/ImmuService.js'
import type * as types from '../types/index.js'
import * as immuConvert from '../immu-convert/index.js'
import * as grpcjs from '@grpc/grpc-js'
import * as immuGrpc from '../immu-grpc/index.js'
import * as buffer from '../buffer.js'
import Long from 'long'



export type SqlExecProps = {
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
     * Sql statements to execute. (May be multiple, all will be executed inside
     * automatic transaction.)
     */
    sql: string,
    /**
     * sql params
     * 
     * ```ts
     * 
     * sqlExec({
     *   sql: 'select * from customer where id = :clientId',
     *   params: [
     *     {name: ':clientId', type: 'Int64', value: Long.fromValue(10)},
     *   ]
     * })
     * ```
     */
    params?: types.SqlNamedValue[],
    
}




export function createSqlExec(client: ImmuServiceClient) {
    // const sqlExecGrpc = immuGrpc.unaryCall.createTxSqlExec(client)
    const sqlExecGrpc = immuGrpc.unaryCall.createSqlExec(client)

    
    return function sqlExec(props: SqlExecProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return sqlExecGrpc({
            request: {
                sql:    props.sql,
                params: props.params?.map(immuConvert.sqlNamedValueToGrpcSqlVal),
                noWait: props.options?.dontWaitForIndexer,
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('SQLExecResult__Output must be defined')
        )
        .then(grpcSqlExecResults => {

            const ongoingTx = grpcSqlExecResults.ongoingTx
            const txes = grpcSqlExecResults.txs.map(grpcCommitedSqlTx => {
                const tx = grpcCommitedSqlTx.header == undefined
                    ? undefined
                    : immuConvert.toTxFromTxHeader__Output?.(grpcCommitedSqlTx.header)
                const updatedRows = grpcCommitedSqlTx.updatedRows
            })

            return {
                txes,
                ongoingTx,
            }
        })
    }
}


