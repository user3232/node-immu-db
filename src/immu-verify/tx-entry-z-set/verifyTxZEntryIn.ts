import { InclusionProof__Output } from 'proto/immudb/schema/InclusionProof.js'
import { Entry__Output } from 'proto/immudb/schema/Entry.js'
import { VerifiableTx__Output } from 'proto/immudb/schema/VerifiableTx.js'
import Long from 'long'
import { Buffer } from 'node:buffer'
import { verifyTxZEntryInRefTx } from './verifyTxZEntryInRefTx.js'
import { verifyTxZEntryInTxAfterRefTx } from './verifyTxZEntryInTxAfterRefTx.js'
import { ZAddRequest__Output } from 'proto/immudb/schema/ZAddRequest.js'


export function verifyTxZEntryInOrAfterRefTx(props: {
    zEntry: ZAddRequest__Output,
    txInRefTxProof: VerifiableTx__Output,
    refTx: {
        hash: Buffer,
        id: Long,
    }
}) {
    try {
        if(props.zEntry.atTx.lessThan(props.refTx.id)) {
            return verifyTxZEntryInRefTx(props)
        }
        else {
            return verifyTxZEntryInTxAfterRefTx(props)
        }
    } 
    catch (err) {
        console.log(
            'Verification faild for z-entry with key:', 
            props.zEntry.key,
            ', because of following reason:',
            err
        )
        return {
            verifies: false as const,
            refTx: props.refTx,
        }
    }
}
