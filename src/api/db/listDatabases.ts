import * as grpc from '@grpc/grpc-js'
import * as gi from '../../grpc/index.js'
import {
    DatabaseWithSettings__Output
} from 'proto/immudb/schema/DatabaseWithSettings.js'
import {
    DatabaseSettings,
    fromDatabaseNullableSettings__Output
} from './DatabaseSettings.js'

/**
 * Lists users registered in immudb instance.
 */
export function listDatabases(ctx: {
    immudbGrpcApi:          gi.ImmudbGrpcApi,
    sessionCredentials?:    grpc.CallCredentials
}) {
    const {immudbGrpcApi, sessionCredentials} = ctx
    
    return immudbGrpcApi.listDatabases({
        request: {},
        credentials: sessionCredentials,
        requestMetadata: new grpc.Metadata({
            // http get method can be used (no side effects in immudb)
            idempotentRequest: true
        })
    })
    .then(output => output.data.databases.map(mapDatabaseInfo))
}



export type DatabaseInfo = {
    /**
     * Name of immudb instance database
     */
    database: string;
    /**
     * Databases can be dynamically loaded and unloaded without having to
     * restart the server. After the database is unloaded, all its resources are
     * released. Unloaded databases cannot be queried or written to
     */
    loaded: boolean;
    /**
     * Database settings
     */
    settings: DatabaseSettings;
}




/**
 * Transforms DatabaseWithSettings__Output to more friendly object.
 */
function mapDatabaseInfo(databaseInfo: DatabaseWithSettings__Output) {
    
    return {
        database:   databaseInfo.name,
        loaded:     databaseInfo.loaded,
        settings:   fromDatabaseNullableSettings__Output(databaseInfo.settings)
    }
}

