import * as immu from '../types/A.js'
import * as hash from './hash.js'
import * as buffer from '../buffer.js'
import * as binary from '../immu-binary-format/index.js'
// import { EntryMetadata } from 'types/EntryMetadata.js'
// import { PrefixKeyVal } from './consts.js'



// export function hashOfKVM(props: {
//     key: Buffer;
//     perfixedVal: Buffer;
//     meta?: EntryMetadata
// }): Buffer {

//     const meta              = binary.fromEntryMetadata(props.meta)
//     const metaLength        = meta.byteLength

//     const prefixKey         = PrefixKeyVal
//     const prefixKeyLength   = prefixKey.byteLength
//     const key               = props.key
//     const keyLength         = key.byteLength
//     const prefixedKeyLength = buffer.fromUInt16BE(prefixKeyLength + keyLength)

//     return hash.ofTreeBuffers(
//         buffer.fromUInt16BE(metaLength),
//         meta,
//         prefixedKeyLength, 
//         [
//             prefixKey, 
//             key,
//         ],
//         hash.data(
//             props.perfixedVal, 
//         )
//     )
// }

export function hashOfBinEntry(props: immu.BinEntry): Buffer {

    const meta              = binary.fromEntryMetadata(props.meta)
    const metaLength        = meta.byteLength

    const prefixedKey       = props.prefixedKey
    const prefixedKeyLength = buffer.fromUInt16BE(prefixedKey.byteLength)

    return hash.ofBuffers(
        buffer.fromUInt16BE(metaLength),
        meta,
        prefixedKeyLength, 
        prefixedKey,
        hash.data(
            props.prefixedVal, 
        )
    )
}