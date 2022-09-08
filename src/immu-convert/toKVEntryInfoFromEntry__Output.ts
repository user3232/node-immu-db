import type { Entry__Output } from "../proto/immudb/schema/Entry.js";
// import type { ValEntryInfo } from "../types/Entry.js";
import { 
    toEntryMetadataFromKVMetadata__Output 
} from "./toEntryMetadataFromKVMetadata__Output.js";



// export function toKVEntryInfoFromEntry__Output(
//     props: Entry__Output
// ): ValEntryInfo {
//     return {
//         expired: props.expired,
//         revision: props.revision,
//         transactionId: props.tx,
//         valEntry: {
//             key: props.key,
//             val: props.value,
//             meta: props.metadata === null
//                 ? undefined
//                 : toEntryMetadataFromKVMetadata__Output(props.metadata)
//         }
//     }
// }