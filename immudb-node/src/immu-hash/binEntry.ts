import * as immu from '../types/index.js'
import * as hash from './hash.js'
import * as buffer from '../buffer.js'
import { entryMetaToBuffer } from './EntryMetadata.js'


export function hashOfBinEntry(props: immu.BinEntry): Buffer {

    const meta              = entryMetaToBuffer(props.meta)
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