import { OpenSessionResponse__Output } from "proto/immudb/schema/OpenSessionResponse";
import { SessionTokens } from "types/Session";



export function toSessionTokensFromOpenSessionResponse__Output(
    props: OpenSessionResponse__Output
): SessionTokens {
    return {
        "immudb-uuid": props.serverUUID,
        sessionid: props.sessionID,
    }
}