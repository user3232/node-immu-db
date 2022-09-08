import * as grpc from '@grpc/grpc-js'
import * as gi from '../../grpc/index.js'
import { UpdateDatabaseRequest } from 'proto/immudb/schema/UpdateDatabaseRequest.js'
import { UpdateDatabaseResponse__Output } from 'proto/immudb/schema/UpdateDatabaseResponse.js'
import { DatabaseSettingsUpdatable, toMutableDatabaseNullableSettings } from './DatabaseSettingsUpdatable.js'
import { createEmpty, DatabaseSettings, fromDatabaseNullableSettings__Output } from './DatabaseSettings.js'


/**
 * Creates database in immudb instance (or skips operation if `ifNotExists`
 * property is set to `true`).
 *
 */
export function updateDatabase(
    ctx: {
        immudbGrpcApi:          gi.ImmudbGrpcApi,
        sessionCredentials?:    grpc.CallCredentials
    }, 
    props: UpdateDatabaseProps,
) {
    const {immudbGrpcApi, sessionCredentials} = ctx
    
    return immudbGrpcApi.updateDatabase({
        request: toUpdateDatabaseRequest(props),
        credentials: sessionCredentials,
    })
    .then(result => ({
        info: result.info,
        data: dbInfoFrom(result.data)
    }))
}


export function getDatabase(
    ctx: {
        immudbGrpcApi:          gi.ImmudbGrpcApi,
        sessionCredentials?:    grpc.CallCredentials
    }, 
    props: GetDatabaseProps,
) {
    const {immudbGrpcApi, sessionCredentials} = ctx
    
    return immudbGrpcApi.updateDatabase({
        request: toUpdateDatabaseRequest({
            database: props.database,
            settings: createEmpty(),
        }),
        credentials: sessionCredentials,
    })
    .then(result => ({
        info: result.info,
        data: dbInfoFrom(result.data)
    }))
}




export type UpdateDatabaseProps = {
    /**
     * Name of immudb instance database
     */
    database: string;
    /**
     * Database settings
     */
    settings: DatabaseSettingsUpdatable;
}


export type GetDatabaseProps = {
    /**
     * Name of immudb instance database
     */
    database: string;
}




/**
 * Transforms CreateDatabaseProps to CreateDatabaseRequest.
 */
function toUpdateDatabaseRequest(dbAndSettings: UpdateDatabaseProps): UpdateDatabaseRequest {
    
    return {
        database:   dbAndSettings.database,
        settings:   toMutableDatabaseNullableSettings(dbAndSettings.settings),
    }
}



export type DatabaseInfo = {
    database: string,
    settings: DatabaseSettings
}


function dbInfoFrom(response: UpdateDatabaseResponse__Output): DatabaseInfo {

    return {
        database: response.database,
        settings: fromDatabaseNullableSettings__Output(response.settings)
    }
}