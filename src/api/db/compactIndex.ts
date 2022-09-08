import * as grpc from '@grpc/grpc-js'
import * as gi from '../../grpc/index.js'
import Long from "long"
import * as common from '../../common/index.js'


/**
 * Loads database
 */
export function compactDatabaseIndex(
    ctx: {
        immudbGrpcApi:          gi.ImmudbGrpcApi,
        sessionCredentials?:    grpc.CallCredentials
    }, 
) {
    const {immudbGrpcApi, sessionCredentials} = ctx
    
    return immudbGrpcApi.compactIndex({
        request: {},
        credentials: sessionCredentials,
    })
    .then(result => {})
    
}


