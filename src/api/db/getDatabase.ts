import * as grpc from '@grpc/grpc-js'
import * as gi from '../../grpc/index.js'
import { DatabaseSettingsResponse__Output } from 'proto/immudb/schema/DatabaseSettingsResponse.js'
import {
    DatabaseSettings,
    fromDatabaseNullableSettings__Output
} from './DatabaseSettings.js'



export function getDatabase(
    ctx: {
        immudbGrpcApi:          gi.ImmudbGrpcApi,
        sessionCredentials?:    grpc.CallCredentials
    }, 
) {
    const {immudbGrpcApi, sessionCredentials} = ctx
    
    return immudbGrpcApi.getDatabase({
        request: {},
        credentials: sessionCredentials,
        requestMetadata: new grpc.Metadata({idempotentRequest: true}),
    })
    .then(result => ({
        info: result.info,
        data: dbInfoFrom(result.data)
    }))
}



export type GetDatabaseProps = {
    /**
     * Name of immudb instance database
     */
    database: string;
}




export type DatabaseInfo = {
    database: string,
    settings: DatabaseSettings
}


function dbInfoFrom(response: DatabaseSettingsResponse__Output): DatabaseInfo {
    
    return {
        database: response.database,
        settings: fromDatabaseNullableSettings__Output(response.settings)
    }
}