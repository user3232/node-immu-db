import { RefEntry } from "./RefEntry.js";
import { 
    RefTxInTxWithEntryProof, 
    TxWithEntryInRefTxProof, 
    TxWithEntryIsRefTxProof 
} from "./Proof-Entry.js";
import { RefTx } from "./Tx.js";



export type TxWithRefEntryProofProps = 
    | TxWithRefEntryInRefTxProofProps 
    | RefTxInTxWithRefEntryProofProps 
    | TxWithRefEntryIsRefTxProofProps

export type TxWithRefEntryInRefTxProofProps = {
    type: 'txWithRefEntryInRefTx';
    data: {
        entry: RefEntry,
        refTx: RefTx,
        proof: TxWithEntryInRefTxProof;
    }
} 
export type RefTxInTxWithRefEntryProofProps = {
    type: 'refTxInTxWithRefEntry';
    data: {
        entry: RefEntry,
        refTx: RefTx,
        proof: RefTxInTxWithEntryProof;
    }
} 
export type TxWithRefEntryIsRefTxProofProps = {
    type: 'txWithRefEntryIsRefTx';
    data: {
        entry: RefEntry,
        refTx: RefTx,
        proof: TxWithEntryIsRefTxProof;
    }
}