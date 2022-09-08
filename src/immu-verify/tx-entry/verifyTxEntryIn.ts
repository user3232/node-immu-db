import { InclusionProof__Output } from 'proto/immudb/schema/InclusionProof.js'
import { Entry__Output } from 'proto/immudb/schema/Entry.js'
import { VerifiableTx__Output } from 'proto/immudb/schema/VerifiableTx.js'
import Long from 'long'
import { Buffer } from 'node:buffer'
import { verifyTxEntryInRefTx } from './verifyTxEntryInRefTx.js'
import { verifyTxEntryInTxAfterRefTx } from './verifyTxEntryInTxAfterRefTx.js'


export function verifyTxEntryInOrAfterRefTx(props: {
    entry: Entry__Output,
    entryInTxProof: InclusionProof__Output,
    txInRefTxProof: VerifiableTx__Output,
    refTx: {
        hash: Buffer,
        id: Long,
    }
}) {
    try {
        if(props.entry.tx.lessThan(props.refTx.id)) {
            return verifyTxEntryInRefTx(props)
        }
        else {
            return verifyTxEntryInTxAfterRefTx(props)
        }
    } 
    catch (err) {
        console.log(
            'Verification faild for entry with key:', 
            props.entry.key,
            ', because of following reason:',
            err
        )
        return {
            verifies: false as const,
            refTx: props.refTx,
        }
    }
}
