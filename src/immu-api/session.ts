import { ImmuServiceClient } from '../proto/immudb/schema/ImmuService.js'
import type * as types from '../types/index.js'
import * as immuConvert from '../immu-convert/index.js'
import * as grpcjs from '@grpc/grpc-js'
import * as immuGrpc from '../immu-grpc/index.js'




export function createOpenSession(client: ImmuServiceClient) {
    const openSessionGrpc = immuGrpc.unaryCall.createOpenSession(client)
    /**
     * Requests session metadata ({@link types.UserDatabaseSession}) from ImmuDb
     * server for user and database.
     */
    return function openSession(sessionInfo: types.UserDatabaseSession) {
        return openSessionGrpc({
            request: immuConvert.toOpenSessionRequestFromUserDatabaseSession(sessionInfo),
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('session tokens must be defined')
        )
        .then(immuConvert.toSessionTokensFromOpenSessionResponse__Output)
    }
}



export function createCloseSession(client: ImmuServiceClient) {
    const closeSessionGrpc = immuGrpc.unaryCall.createCloseSession(client)
    /**
     * Closes session heaving {@link types.SessionTokens} 
     * embedded in {@link grpcjs.CallCredentials}.
     */
    return function closeSession(props: grpcjs.CallCredentials) {
        return closeSessionGrpc({
            request: {},
            options: {
                credentials: props
            }
        })
        .then(maybeOutput => {})
    }
    // return function closeSession(props: SessionTokens) {
    //     return closeSessionGrpc({
    //         request: {},
    //         options: {
    //             credentials: immuSession.createImmuGrpcCallCredentials(props)
    //         }
    //     })
    // }
}


export function createKeepAlive(client: ImmuServiceClient) {
    const keepAliveGrpc = immuGrpc.unaryCall.createKeepAlive(client)
    /**
     * Asks ImmuDb to not close (idle?) connection.
     */
    return function keepAlive(props: {
        credentials: grpcjs.CallCredentials,
    }) {
        return keepAliveGrpc({
            request: {},
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('keep alive return value be defined')
        )
        .then(response => {})
    }
}


export type UseDbProps = {
    /**
     * Name of immudb instance database
     */
    database: string;
}



export function createUseDb(client: ImmuServiceClient) {
    const useDatabaseGrpc = immuGrpc.unaryCall.createUseDatabase(client)

    
    return function setDbSettings(props: UseDbProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return useDatabaseGrpc({
            request: {
                databaseName: props.database,
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('UseDatabaseReply__Output  must be defined')
        )
        .then(resp => ({
            database:   props.database,
            token:      resp.token,
        }))
    }
}