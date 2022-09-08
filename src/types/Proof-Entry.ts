import { RefTx, Tx } from "./Tx.js"
import { Buffer } from 'node:buffer'
import Long from 'long'
import { RefTxInTxProof, TxInRefTxProof, TxIsRefTxProof, TxProofProps } from "./Proof-Tx.js";
import { TxWithKVEntryProofProps } from "./Proof-Entry-KV.js";
import { TxWithRefEntryProofProps } from "./Proof-Entry-Ref.js";
import { TxWithZEntryProofProps } from "./Proof-Entry-Z.js";


export type EntryInTxEntriesMhtProof = {
    entry?: {
        entryId: Long;
        entryInTxEntriesMht: Buffer[];
    }
    txTx: Tx;
}

export type TxWithEntryInRefTxProof = EntryInTxEntriesMhtProof & TxInRefTxProof
export type RefTxInTxWithEntryProof = EntryInTxEntriesMhtProof & RefTxInTxProof
export type TxWithEntryIsRefTxProof = EntryInTxEntriesMhtProof & TxIsRefTxProof



export type AnyProofProps = 
    | {type: 'tx',  data: TxProofProps} 
    | {type: 'kv',  data: TxWithKVEntryProofProps} 
    | {type: 'ref', data: TxWithRefEntryProofProps} 
    | {type: 'z',   data: TxWithZEntryProofProps}














