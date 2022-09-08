import * as grpc from '@grpc/grpc-js'
import * as gi from '../../grpc/index.js'
import Long from "long"
import { FlushIndexRequest } from 'proto/immudb/schema/FlushIndexRequest.js'
import { FlushIndexResponse__Output } from 'proto/immudb/schema/FlushIndexResponse.js'


/**
 * Loads database
 */
export function flushDatabaseIndex(
    ctx: {
        immudbGrpcApi:          gi.ImmudbGrpcApi,
        sessionCredentials?:    grpc.CallCredentials
    }, 
    props: FlushDatabaseIndexProps,
) {
    const {immudbGrpcApi, sessionCredentials} = ctx
    
    return immudbGrpcApi.flushIndex({
        request: toRequest(props),
        credentials: sessionCredentials,
    })
    .then(result => ({
        info: result.info, 
        data: fromResponse(result.data)
    }))
    
}




export type FlushDatabaseIndexProps = {
    /**
     * Indicates how much space will be scanned for unreferenced data. 
     * Value must be between 0 and 1.
     *
     * Even though this operation blocks transaction processing, choosing a
     * small percentage e.g. 0.1 may not significantly hinder normal operations
     * while reducing used storage space.
     *
     * Partially compaction may be triggered automatically by immudb. Database
     * settings can be modified to set the cleanupPercentage attribute to
     * non-zero in order to accomplish this.
     */
    cleanupPercentage: number,

    /**
     * Should run fsync after writing data?
     * * true --> run fsync after writing data to avoid index regeneration in
     *   the case of an unexpected crash
     * * false | undefined -->  do not run fsync after writing data
     */
    synced: boolean,
}


/**
 * Transforms CreateDatabaseProps to CreateDatabaseRequest.
 */
function toRequest(dbAndSettings: FlushDatabaseIndexProps): FlushIndexRequest {
    
    return {
        cleanupPercentage:  dbAndSettings.cleanupPercentage,
        synced:             dbAndSettings.synced,
    }
}


function fromResponse(response: FlushIndexResponse__Output): string {
    return response.database
}