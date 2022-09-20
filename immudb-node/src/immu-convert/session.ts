import { OpenSessionRequest } from "immudb-grpcjs/immudb/schema/OpenSessionRequest.js";
import { UserDatabaseSession } from "../types/Session.js";
import { Buffer } from 'node:buffer'
import { OpenSessionResponse__Output } from "immudb-grpcjs/immudb/schema/OpenSessionResponse";
import { SessionTokens } from "../types/Session";



export function toSessionTokensFromOpenSessionResponse__Output(
    props: OpenSessionResponse__Output
): SessionTokens {
    return {
        "immudb-uuid": props.serverUUID,
        sessionid: props.sessionID,
    }
}

export function toOpenSessionRequestFromUserDatabaseSession(
    props: UserDatabaseSession
): OpenSessionRequest {
    return {
        databaseName: props.database,
        password: Buffer.from(props.password),
        username: Buffer.from(props.user),
    }
}