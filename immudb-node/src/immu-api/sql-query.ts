import { type ImmuServiceClient } from 'immudb-grpcjs/immudb/schema/ImmuService.js'
import type * as types from '../types/index.js'
import * as immuConvert from '../immu-convert/index.js'
import * as grpcjs from '@grpc/grpc-js'
import * as immuGrpc from '../immu-grpc/index.js'
import * as buffer from '../buffer.js'
import Long from 'long'






export type SqlQueryProps = {
    
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





export function createSqlQuery(client: ImmuServiceClient) {
    const sqlQueryGrpc = immuGrpc.unaryCall.createSqlQuery(client)

    
    return function sqlQuery(props: SqlQueryProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return sqlQueryGrpc({
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




export function createSqlQueryTables(client: ImmuServiceClient) {
    const sqlQueryTablesGrpc = immuGrpc.unaryCall.createListTables(client)

    
    return function sqlQueryTables(props: {
        credentials: grpcjs.CallCredentials,
    }) {

        return sqlQueryTablesGrpc({
            request: {
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





export type SqlQueryTableProps = {
    /**
     * Sql table to query.
     */
    table: string,
}


export function createSqlQueryTable(client: ImmuServiceClient) {
    const sqlQueryTableGrpc = immuGrpc.unaryCall.createDescribeTable(client)

    
    return function sqlQueryTable(props: SqlQueryTableProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return sqlQueryTableGrpc({
            request: {
                tableName: props.table,
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
