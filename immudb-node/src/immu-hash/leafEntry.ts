import * as immu from '../types/A.js'
import * as hash from './hash.js'
import * as buffer from '../buffer.js'
import * as binary from '../immu-binary-format/index.js'


export function hashOfLeafEntry(props: immu.LeafEntry): Buffer {

    const meta              = binary.fromEntryMetadata(props.meta)
    const metaLength        = meta.byteLength

    return hash.ofBuffers(
        buffer.fromUInt16BE(metaLength),
        meta,
        buffer.fromUInt16BE(props.prefixedKey.byteLength), 
        props.prefixedKey,
        props.prefixedValHash,
    )
}