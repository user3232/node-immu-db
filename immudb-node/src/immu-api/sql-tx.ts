import { type ImmuServiceClient } from 'immudb-grpcjs/immudb/schema/ImmuService.js'
import type * as types from '../types/index.js'
import * as immuConvert from '../immu-convert/index.js'
import * as grpcjs from '@grpc/grpc-js'
import * as immuGrpc from '../immu-grpc/index.js'
import * as buffer from '../buffer.js'
import Long from 'long'




export type SqlTxNewProps = {
    /**
     * Mode of interactive transaction:
     * - `ReadOnly` declares that transaction will not modify db,
     * - `WriteOnly` declares that transaction will not depend on reading db,
     * - `ReadWrite` declares that transaction may read and write to db.
     */
    mode?: "ReadOnly" | "WriteOnly" | "ReadWrite"
}

export function createSqlTxNew(client: ImmuServiceClient) {
    const sqlTxNewGrpc = immuGrpc.unaryCall.createNewTx(client)

    /**
     * Starts new interactive transation. If successful returns
     * transaction token used  to connect grpc call with
     * interactive transaction.
     */
    return function sqlTxNew(props: SqlTxNewProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return sqlTxNewGrpc({
            request: {
                mode: props.mode,
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('NewTxResponse__Output    must be defined')
        )
        .then(grpcNewTxResponse => {

            const token: types.TransactionTokens = {
                transactionid: grpcNewTxResponse.transactionID
            }
            return token
        })
    }
}


export function createSqlTxCommit(client: ImmuServiceClient) {
    const sqlTxCommitGrpc = immuGrpc.unaryCall.createCommit(client)

    /**
     * Commits interactive transaction.
     * `credentials` must inslude interactive transaction token.
     */
    return function sqlTxCommit(props: {
        credentials: grpcjs.CallCredentials,
    }) {

        return sqlTxCommitGrpc({
            request: {
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('CommittedSQLTx__Output must be defined')
        )
        .then(grpcSqlCommitedTxResult => {

            const tx = grpcSqlCommitedTxResult.header == undefined
                ? undefined
                : immuConvert.toTxFromTxHeader__Output?.(grpcSqlCommitedTxResult.header)
            const updatedRows = grpcSqlCommitedTxResult.updatedRows
            

            return {
                tx,
                updatedRows,
            }
        })
    }
}



export function createSqlTxRollback(client: ImmuServiceClient) {
    const sqlTxRollbackGrpc = immuGrpc.unaryCall.createRollback(client)

    /**
     * Rollbacks interactive transaction.
     * `credentials` must inslude interactive transaction token.
     */
    return function sqlTxRollback(props: {
        credentials: grpcjs.CallCredentials,
    }) {

        return sqlTxRollbackGrpc({
            request: {
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('Empty__Output must be defined')
        )
        .then(res => {})
    }
}





export type SqlTxExecProps = {
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

export function createSqlTxExec(client: ImmuServiceClient) {
    const sqlTxExecGrpc = immuGrpc.unaryCall.createTxSqlExec(client)

    
    return function sqlTxExec(props: SqlTxExecProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return sqlTxExecGrpc({
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
            : Promise.reject('Empty__Output must be defined')
        )
        .then(res => {})
    }
}



export type SqlTxQueryProps = {
    
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
    /**
     * Does this query operation needs refreshed index
     * or not? (perhaps earlier operation was also read).
     */
    reuseSnapshot?: boolean,
}





export function createSqlTxQuery(client: ImmuServiceClient) {
    const sqlTxQueryGrpc = immuGrpc.unaryCall.createTxSqlQuery(client)

    
    return function sqlTxQuery(props: SqlTxQueryProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return sqlTxQueryGrpc({
            request: {
                sql:    props.sql,
                params: props.params?.map(immuConvert.sqlNamedValueToGrpcSqlVal),
                reuseSnapshot: props.reuseSnapshot
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('SQLQueryResult__Output must be defined')
        )
        .then(grpcSqlRows => {
            return grpcSqlRows.rows.map(immuConvert.mapGrpcSqlRowToSqlNamedValues)
        })
        
    }
}