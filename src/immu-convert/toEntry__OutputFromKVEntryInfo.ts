import type { Entry__Output } from "../proto/immudb/schema/Entry.js";
// import type { ValEntryInfo } from '../types/index.js'
import { 
    toKVMetadata__OutputFromEntryMetadata 
} from "./toKVMetadata__OutputFromEntryMetadata.js";
import * as buffer from '../buffer.js'

// export function toEntry__OutputFromKVEntryInfo(
//     props: ValEntryInfo
// ): Entry__Output {
//     return {
//         key: props.valEntry.key,
//         value: props.valEntry.val,
//         expired: props.expired,
//         referencedBy: null,
//         revision: props.revision,
//         metadata: props.valEntry.meta
//             ? toKVMetadata__OutputFromEntryMetadata(props.valEntry.meta)
//             : null,
//         tx: props.transactionId
//     }
// }
