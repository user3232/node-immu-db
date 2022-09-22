import { Precondition } from "immudb-grpcjs/immudb/schema/Precondition.js";
import * as immu from "../types/index.js";



export function precondToGrpcPrecond(
    props: immu.ValOrRefKeyPrecondition
): Precondition {

    switch (props.type) {
        case 'key-must-exist': return {
            precondition: 'keyMustExist',
            keyMustExist: {
                key: props.key
            }
        }
        case 'key-must-not-exist': return {
            precondition: 'keyMustNotExist',
            keyMustNotExist: {
                key: props.key
            }
        }
        case 'key-must-not-be-modified': return {
            precondition: 'keyNotModifiedAfterTX',
            keyNotModifiedAfterTX: {
                key: props.key,
                txID: props.txId,
            }
        }
    } 

}