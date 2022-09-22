import * as immu from '../types/index.js'
import * as binEntry from '../immu-entry/index.js'
import { TxEntry__Output } from 'immudb-grpcjs/immudb/schema/TxEntry.js'
import * as ike from '../immu-kvm-entry/index.js'





export function kvmsToVerificationEntries(props: {
    kvms:  immu.KeyValMeta[],
    allEntriesMht: Buffer,
}): immu.VerificationEntriesAllOf {

    const entries = props.kvms.map(ike.kvmToValEntry)
    const verificationEntries: immu.VerificationEntriesAllOf = {
        type:           'all-of',
        allEntries:     entries,
        allEntriesMht:  props.allEntriesMht,
    }
    return verificationEntries

}


export function grpcTxEntriesToVerificationEntries(props: {
    txEntries:  TxEntry__Output[],
    allEntriesMht: Buffer,
}): immu.VerificationEntriesAllOf {

    const entries: immu.Entry[] = props.txEntries.map(binEntry.grpcEntryToEntry)
    const verificationEntries: immu.VerificationEntriesAllOf = {
        type:           'all-of',
        allEntries:     entries,
        allEntriesMht:  props.allEntriesMht,
    }
    return verificationEntries

}