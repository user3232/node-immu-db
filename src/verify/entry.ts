import type * as types from '../types/index.js'
import * as hash from '../immu-hash/index.js'
import * as rfc6962 from '../immu-rfc6962/index.js'
import Long from 'long'



/**
 * Computes MHT of value entries
 */
export function mhtOfValEntries(
    entries: types.ValEntryVerifiable[]
): Buffer {
    const entriesHashes = entries.map(entry => hash.ofEntry(entry.entry))
    const entriesMhtHash = new rfc6962.MemoryMht(entriesHashes).getRoot()
    return entriesMhtHash
}


/**
 * Computes MHT of value entry in mht entries.
 */
export function mhtOfValEntryInMhtEntries(props: {
    entry: types.ValEntryVerifiable,
    mhtEntries: {key: Buffer, hash: Buffer}[]
 }): Buffer {
    const entryHash = hash.ofEntry(props.entry.entry)
    const sameKeyMhtEntry = props.mhtEntries
        .find(({key, hash}) => key.equals(props.entry.entry.key))

    if(sameKeyMhtEntry === undefined) {
        throw 'no matching key'
    }
    if(entryHash.equals(sameKeyMhtEntry.hash) === false) {
        throw 'hashes does not matches'
    }

    const entriesMhtHash = new rfc6962.MemoryMht(
        props.mhtEntries.map(e => e.hash)
    ).getRoot()

    return entriesMhtHash
}



/**
 * Computes MHT of value entry and MHT path.
 */
 export function mhtOfValEntryAndPath(props: {
    entry: types.ValEntryVerifiable,
    mhtPath: Buffer[],
    entryId: number,
    mhtSize: number,
 }): Buffer {
    const entryHash = hash.ofEntry(props.entry.entry)
    const entriesMhtHash = rfc6962.rootFromInclusionProof({
        leaf: hash.leaf(entryHash),
        leafId: Long.fromInt(props.entryId, true),
        lastLeafId: Long.fromInt(props.mhtSize, true),
        inclusionProofNodes: props.mhtPath,
    })

    return entriesMhtHash
}