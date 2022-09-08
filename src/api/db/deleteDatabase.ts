import * as grpc from '@grpc/grpc-js'
import * as gi from '../../grpc/index.js'
import Long from "long"
import { DeleteDatabaseRequest } from 'proto/immudb/schema/DeleteDatabaseRequest.js'
import { DeleteDatabaseResponse__Output } from 'proto/immudb/schema/DeleteDatabaseResponse.js'


/**
 * Deletes database
 */
export function deleteDatabase(
    ctx: {
        immudbGrpcApi:          gi.ImmudbGrpcApi,
        sessionCredentials?:    grpc.CallCredentials
    }, 
    props: DeleteDatabaseProps,
) {
    const {immudbGrpcApi, sessionCredentials} = ctx
    
    return immudbGrpcApi.deleteDatabase({
        request: toRequest(props),
        credentials: sessionCredentials,
    })
    .then(result => ({
        info: result.info, 
        data: fromResponse(result.data)
    }))
    
}




export type DeleteDatabaseProps = {
    /**
     * Name of immudb instance database
     */
    database: string;
}


/**
 * Transforms CreateDatabaseProps to CreateDatabaseRequest.
 */
function toRequest(
    dbAndSettings: DeleteDatabaseProps
): DeleteDatabaseRequest {
    
    return {
        database:   dbAndSettings.database,
    }
}


function fromResponse(response: DeleteDatabaseResponse__Output): string {
    return response.database
}