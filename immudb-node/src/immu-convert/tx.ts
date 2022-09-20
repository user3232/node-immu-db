import { TxHeader__Output } from "immudb-grpcjs/immudb/schema/TxHeader.js";
import { Tx } from "../types/index.js";



export function toTxFromTxHeader__Output(
    props: TxHeader__Output | undefined | null
): Tx {

    if(props == undefined) {
        throw 'TxHeader__Output must be defined.'
    }
    if(props.version !== 1) {
        throw 'transaction structure must have version 1'
    }

    return {
        id: props.id,
        entriesCount: props.nentries,
        entriesMht: props.eH,
        prevTxHash: props.prevAlh,
        prevTxesMht: props.blRoot,
        timestamp: props.ts,
        version: 1,
    }
}