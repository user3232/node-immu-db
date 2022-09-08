import * as grpc from '@grpc/grpc-js'
import * as gi from '../../grpc/index.js'
import { Database } from 'proto/immudb/schema/Database.js'
import { UseDatabaseReply__Output } from 'proto/immudb/schema/UseDatabaseReply.js'


/**
 * Switches to database.
 * Returns token?
 */
export function useDatabase(
    ctx: {
        immudbGrpcApi:          gi.ImmudbGrpcApi,
        sessionCredentials?:    grpc.CallCredentials
    }, 
    props: UseDatabaseProps,
) {
    const {immudbGrpcApi, sessionCredentials} = ctx
    
    return immudbGrpcApi.useDatabase({
        request: toDatabase(props),
        credentials: sessionCredentials,
    })
    .then(result => ({
        /**
         * grpc protocol info
         */
        info: result.info, 
        /**
         * Token ??
         */
        data: fromResponse(result.data)
    }))
    
}




export type UseDatabaseProps = {
    /**
     * Name of immudb instance database
     */
    database: string;
}


/**
 * Transforms CreateDatabaseProps to CreateDatabaseRequest.
 */
function toDatabase(dbAndSettings: UseDatabaseProps): Database {
    
    return {
        databaseName:   dbAndSettings.database,
    }
}


function fromResponse(response: UseDatabaseReply__Output) {
    return response.token
}