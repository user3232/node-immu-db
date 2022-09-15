import { RefToTx, Tx } from "./Tx.js"
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



export type TxInRefTxProofProps = {
    type: 'txInRefTx',
    data: {
        refTx: RefToTx,
        proof: TxInRefTxProof,
    }
}
export type RefTxInTxProofProps = {
    type: 'refTxInTx';
    data: {
        refTx: RefToTx,
        proof: RefTxInTxProof;
    }
}
export type TxIsRefTxProofProps = {
    type: 'txIsRefTx';
    data: {
        refTx: RefToTx,
        proof: TxIsRefTxProof;
    }
}



export type TxProofProps = 
    | TxInRefTxProofProps 
    | RefTxInTxProofProps 
    | TxIsRefTxProofProps
