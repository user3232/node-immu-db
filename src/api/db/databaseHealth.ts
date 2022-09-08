import * as grpc from '@grpc/grpc-js'
import * as gi from '../../grpc/index.js'
import Long from "long"
import * as common from '../../common/index.js'
import { DatabaseHealthResponse__Output } from 'proto/immudb/schema/DatabaseHealthResponse.js'


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
    
    return immudbGrpcApi.databaseHealth({
        request: {},
        credentials: sessionCredentials,
    })
    .then(result => ({
        info: result.info, 
        data: fromResponse(result.data)
    }))
    
}



export type DatabaseHealthResult = {
    /**
     * Number of pending requests
     */
    pendingRequests: number;
    /**
     * When last completed request occured.
     */
    lastRequestCompletedAt: Date;
}


function fromResponse(
    response: DatabaseHealthResponse__Output
): DatabaseHealthResult {
    return {
        pendingRequests: response.pendingRequests,
        lastRequestCompletedAt: common.dateFromLong(response.lastRequestCompletedAt)
    }
}