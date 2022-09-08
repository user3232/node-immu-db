import * as grpc from '@grpc/grpc-js'
import * as gi from '../../grpc/index.js'
import { LoadDatabaseRequest } from 'proto/immudb/schema/LoadDatabaseRequest.js'
import { LoadDatabaseResponse__Output } from 'proto/immudb/schema/LoadDatabaseResponse.js'


/**
 * Loads database
 */
export function loadDatabase(
    ctx: {
        immudbGrpcApi:          gi.ImmudbGrpcApi,
        sessionCredentials?:    grpc.CallCredentials
    }, 
    props: LoadDatabaseProps,
) {
    const {immudbGrpcApi, sessionCredentials} = ctx
    
    return immudbGrpcApi.loadDatabase({
        request: toLoadDatabaseRequest(props),
        credentials: sessionCredentials,
    })
    .then(result => ({
        info: result.info, 
        data: fromResponse(result.data)
    }))
    
}




export type LoadDatabaseProps = {
    /**
     * Name of immudb instance database
     */
    database: string;
}


/**
 * Transforms CreateDatabaseProps to CreateDatabaseRequest.
 */
function toLoadDatabaseRequest(dbAndSettings: LoadDatabaseProps): LoadDatabaseRequest {
    
    return {
        database: dbAndSettings.database,
    }
}


function fromResponse(response: LoadDatabaseResponse__Output) {
    return response.database
}