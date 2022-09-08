import * as grpc from '@grpc/grpc-js'
import * as gi from '../../grpc/index.js'
import * as common from '../../common/index.js'
import { CreateDatabaseRequest } from 'proto/immudb/schema/CreateDatabaseRequest.js'
import { CreateDatabaseResponse__Output } from 'proto/immudb/schema/CreateDatabaseResponse.js'
import {
    DatabaseSettings,
    fromDatabaseNullableSettings__Output,
    toDatabaseNullableSettings
} from './DatabaseSettings.js'
import { DatabaseSettingsUpdatable } from './DatabaseSettingsUpdatable.js'


/**
 * Creates database in immudb instance (or skips operation if `ifNotExists`
 * property is set to `true`).
 *
 */
export async function createDatabase(
    ctx: {
        immudbGrpcApi:          gi.ImmudbGrpcApi,
        sessionCredentials?:    grpc.CallCredentials
    }, 
    props: CreateDatabaseProps,
) {
    const {immudbGrpcApi, sessionCredentials} = ctx
    
    // return immudbGrpcApi.createDatabase({
    //     request: toCreateDatabaseRequest(props),
    //     credentials: sessionCredentials,
    // })
    return mapResponse(
        (await immudbGrpcApi.createDatabase({
            request: toCreateDatabaseRequest(props),
            credentials: sessionCredentials,
        })).data
    )
}




export type CreateDatabaseProps = {
    /**
     * Name of immudb instance database
     */
    database: string;
    /**
     * Database settings
     */
    settings: DatabaseSettingsUpdatable;
    /**
     * What to do when database exists?
     * * silently ignore --> set this value to true
     * * (default) throw exception --> set this value to false or undefined
     */
    ifNotExists?: boolean;
}





/**
 * Transforms CreateDatabaseProps to CreateDatabaseRequest.
 */
function toCreateDatabaseRequest(dbAndSettings: CreateDatabaseProps): CreateDatabaseRequest {
    
    return {
        name:           dbAndSettings.database,
        settings:       toDatabaseNullableSettings(dbAndSettings.settings),
        ifNotExists:    dbAndSettings.ifNotExists,
    }
}



export type CreateDatabaseResult = {
    name: string;
    alreadyExisted: boolean;
    settings: DatabaseSettings;
}

function mapResponse(response: CreateDatabaseResponse__Output) {
    response.alreadyExisted
    return {
        name: response.name,
        alreadyExisted: response.alreadyExisted,
        settings: fromDatabaseNullableSettings__Output(response.settings)
    }
}