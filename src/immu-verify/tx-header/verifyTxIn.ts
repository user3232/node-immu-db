import Long from 'long'
import { Buffer } from 'node:buffer'
import { InclusionProof__Output } from 'proto/immudb/schema/InclusionProof.js'
import { VerifiableTx__Output } from 'proto/immudb/schema/VerifiableTx.js'
import { TxHeader__Output } from 'proto/immudb/schema/TxHeader.js'
import { verifyTxInRefTx } from './verifyTxInRefTx.js'
import { verifyTxInTxAfterRefTx } from './verifyTxInTxAfterRefTx.js'


export function verifyTxInOrAfterRefTx(props: {
    tx: TxHeader__Output,
    entryInTxProof: InclusionProof__Output,
    txInRefTxProof: VerifiableTx__Output,
    refTx: {
        hash: Buffer,
        id: Long,
    }
}) {
    try {
        if(props.tx.id.lessThan(props.refTx.id)) {
            return verifyTxInRefTx(props)
        }
        else {
            return verifyTxInTxAfterRefTx(props)
        }
    } 
    catch (err) {
        console.log(
            'Verification faild for transaction with id:', 
            props.tx.id,
            ', because of following reason:',
            err
        )
        return {
            verifies: false as const,
            refTx: props.refTx,
        }
    }
}
