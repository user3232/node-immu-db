import { InclusionProof__Output } from 'proto/immudb/schema/InclusionProof.js'
import { Entry__Output } from 'proto/immudb/schema/Entry.js'
import { VerifiableTx__Output } from 'proto/immudb/schema/VerifiableTx.js'
import Long from 'long'
import { Buffer } from 'node:buffer'
import { verifyTxRefEntryInRefTx } from './verifyTxRefEntryInRefTx.js'
import { verifyTxRefEntryInTxAfterRefTx } from './verifyTxRefEntryInTxAfterRefTx.js'


export function verifyTxRefEntryInOrAfterRefTx(props: {
    entry: Entry__Output,
    txInRefTxProof: VerifiableTx__Output,
    refTx: {
        hash: Buffer,
        id: Long,
    }
}) {
    try {
        if(props.entry.tx.lessThan(props.refTx.id)) {
            return verifyTxRefEntryInRefTx(props)
        }
        else {
            return verifyTxRefEntryInTxAfterRefTx(props)
        }
    } 
    catch (err) {
        console.log(
            'Verification faild for ref-entry with key:', 
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
