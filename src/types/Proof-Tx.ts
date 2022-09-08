import { RefTx, Tx } from "./Tx.js"
import { Buffer } from 'node:buffer'

export type TxInRefTxProof = {
    txTx:                       Tx,
    refTx:                      Tx,
    txInRefPrevTxesMht:         Buffer[],
    refPrevTxInRefPrevTxesMht:  Buffer[],
}


export type RefTxInTxProof = {
    txTx:                       Tx,
    refTx:                      Tx,
    txPrevTxInTxPrevTxesMht:    Buffer[],
    refTxInRefPrevTxesMhtAndTxPrevTxesMht: Buffer[]
}


export type TxIsRefTxProof = {
    txTx:                       Tx,
    txPrevTxInRefPrevTxesMht:   Buffer[],
}



export type TxProofProps = 
    | TxInRefTxProofProps 
    | RefTxInTxProofProps 
    | TxIsRefTxProofProps

export type TxInRefTxProofProps = {
    type: 'txInRefTx',
    data: {
        refTx: RefTx,
        proof: TxInRefTxProof,
    }
}
export type RefTxInTxProofProps = {
    type: 'refTxInTx';
    data: {
        refTx: RefTx,
        proof: RefTxInTxProof;
    }
}
export type TxIsRefTxProofProps = {
    type: 'txIsRefTx';
    data: {
        refTx: RefTx,
        proof: TxIsRefTxProof;
    }
}


