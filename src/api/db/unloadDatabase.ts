import * as grpc from '@grpc/grpc-js'
import * as gi from '../../grpc/index.js'
import { UnloadDatabaseRequest } from 'proto/immudb/schema/UnloadDatabaseRequest.js'
import { UnloadDatabaseResponse__Output } from 'proto/immudb/schema/UnloadDatabaseResponse.js'


/**
 * Loads database
 */
export function unloadDatabase(
    ctx: {
        immudbGrpcApi:          gi.ImmudbGrpcApi,
        sessionCredentials?:    grpc.CallCredentials
    }, 
    props: UnloadDatabaseProps,
) {
    const {immudbGrpcApi, sessionCredentials} = ctx
    
    return immudbGrpcApi.unloadDatabase({
        request: toRequest(props),
        credentials: sessionCredentials,
    })
    .then(result => ({
        info: result.info, 
        data: fromResponse(result.data)
    }))
    
}




export type UnloadDatabaseProps = {
    /**
     * Name of immudb instance database
     */
    database: string;
}



function toRequest(dbAndSettings: UnloadDatabaseProps): UnloadDatabaseRequest {
    
    return {
        database:   dbAndSettings.database,
    }
}


function fromResponse(response: UnloadDatabaseResponse__Output) {
    return response.database
}