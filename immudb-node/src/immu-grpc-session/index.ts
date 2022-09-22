import { OpenSessionRequest } from "immudb-grpcjs/immudb/schema/OpenSessionRequest.js";
import { OpenSessionResponse__Output } from "immudb-grpcjs/immudb/schema/OpenSessionResponse";
import { Buffer } from 'node:buffer'
import * as immu from "../types/index.js";



export function grpcOpenSessionToSessionTokens(
    props: OpenSessionResponse__Output
): immu.SessionTokens {
    return {
        "immudb-uuid": props.serverUUID,
        sessionid: props.sessionID,
    }
}

export function userDatabaseSessionToGrpcOpenSession(
    props: immu.UserDatabaseSession
): OpenSessionRequest {
    return {
        databaseName: props.database,
        password: Buffer.from(props.password),
        username: Buffer.from(props.user),
    }
}