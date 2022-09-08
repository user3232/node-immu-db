import { OpenSessionRequest } from "../proto/immudb/schema/OpenSessionRequest.js";
import { UserDatabaseSession } from "../types/Session.js";
import { Buffer } from 'node:buffer'


export function toOpenSessionRequestFromUserDatabaseSession(
    props: UserDatabaseSession
): OpenSessionRequest {
    return {
        databaseName: props.database,
        password: Buffer.from(props.password),
        username: Buffer.from(props.user),
    }
}