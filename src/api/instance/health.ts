import * as grpc from '@grpc/grpc-js'
import * as gi from '../../grpc/index.js'
import * as common from '../../common/index.js'
import { DatabaseHealthResponse__Output } from 'proto/immudb/schema/DatabaseHealthResponse.js'
import { HealthResponse__Output } from 'proto/immudb/schema/HealthResponse.js'
import Long from "long"


/**
 * Switches to database.
 * Returns token?
 */
export function databaseHealth(
    ctx: {
        immudbGrpcApi:          gi.ImmudbGrpcApi,
        sessionCredentials?:    grpc.CallCredentials
    }, 
) {
    const {immudbGrpcApi, sessionCredentials} = ctx
    
    return immudbGrpcApi.health({
        request: {},
        credentials: sessionCredentials,
    })
    .then(result => ({
        info: result.info, 
        data: fromResponse(result.data)
    }))
    
}



export type HealthResult = {
    /**
     * Status of immudb inistance:
     * * ok --> true
     * * something wrong --> false
     */
    status: boolean;
    /**
     * Version of instance.
     */
    version: string;
}


function fromResponse(response: HealthResponse__Output): HealthResult {
    return response
}