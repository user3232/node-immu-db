import { ZEntry } from "./ZEntry.js";
import { 
    RefTxInTxWithEntryProof, 
    TxWithEntryInRefTxProof, 
    TxWithEntryIsRefTxProof 
} from "./Proof-Entry.js";
import { RefTx } from "./Tx.js";



export type TxWithZEntryProofProps = 
    | TxWithZEntryInRefTxProofProps 
    | RefTxInTxWithZEntryProofProps 
    | TxWithZEntryIsRefTxProofProps

export type TxWithZEntryInRefTxProofProps = {
    type: 'txWithZEntryInRefTx';
    data: {
        entry: ZEntry,
        refTx: RefTx,
        proof: TxWithEntryInRefTxProof;
    }
} 
export type RefTxInTxWithZEntryProofProps = {
    type: 'refTxInTxWithZEntry';
    data: {
        entry: ZEntry,
        refTx: RefTx,
        proof: RefTxInTxWithEntryProof;
    }
} 
export type TxWithZEntryIsRefTxProofProps = {
    type: 'txWithZEntryIsRefTx';
    data: {
        entry: ZEntry,
        refTx: RefTx,
        proof: TxWithEntryIsRefTxProof;
    }
}


