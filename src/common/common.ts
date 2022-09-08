import * as grpc from '@grpc/grpc-js'
import { OpenSessionRequest } from 'proto/immudb/schema/OpenSessionRequest.js'
import { OpenSessionResponse__Output } from 'proto/immudb/schema/OpenSessionResponse.js'
import Long from "long"





/**
 * Various immudb authorization headers
 */
export type ImmuAuthHeaders = {
    /**
     * Token for session
     */
    sessionID?:     string,
    /**
     * Token of immudb instance
     */
    serverUUID?:    string,
    /**
     * user token? (which user is connected used database?)
     */
    tokenID?:       string,
    /**
     * ID of transaction
     */
    transactionID?: string,
}
export function createImmuCredentialsMetadata(props: ImmuAuthHeaders): grpc.Metadata {
    const meta = new grpc.Metadata()

    if(props.sessionID)     meta.add('sessionid', props.sessionID)
    if(props.serverUUID)    meta.add('immudb-uuid', props.serverUUID)
    if(props.tokenID)       meta.add('authorization', props.tokenID)
    if(props.transactionID) meta.add('transactionid', props.transactionID)

    return meta
}

export function createImmuCallCredentials(props: ImmuAuthHeaders): grpc.CallCredentials {
    return grpc.credentials.createFromMetadataGenerator(
        (_params, callback) => callback(null, createImmuCredentialsMetadata(props))
    )
}




export const adminStartCredentials = {
    databaseName: 'defaultdb',
    password: Buffer.from('immudb'),
    username: Buffer.from('immudb'),
}


export type CallResult<TResponse> = {
    data: TResponse,
    info: CallResultInfo,
}


export type CallResultInfo = {
    headers: {
        [key: string]: grpc.MetadataValue,
    } | undefined,
    trailers: {
        [key: string]: grpc.MetadataValue,
    } | undefined,
    statusCode: grpc.status | undefined,
    statusEnum: string | undefined,
    statusDetails: string | undefined,
}










export function createOpenSessionRequest(props: {
    username: string,
    password: string,
    databaseName: string
}): OpenSessionRequest {
    return {
        username: Buffer.from(props.username),
        password: Buffer.from(props.password),
        databaseName: props.databaseName,
    }
}

export function toObjectOpenSessionResponse(props: OpenSessionResponse__Output) {
    return {
        serverUUID: props.serverUUID,
        sessionID: props.sessionID,
    }
}

