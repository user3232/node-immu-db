import { RefEntryData } from "./RefEntry.js";
import { 
    RefTxInTxWithEntryProof, 
    TxWithEntryInRefTxProof, 
    TxWithEntryIsRefTxProof 
} from "./Proof-Entry.js";
import { RefToTx } from "./Tx.js";



export type TxWithRefEntryProofProps = 
    | TxWithRefEntryInRefTxProofProps 
    | RefTxInTxWithRefEntryProofProps 
    | TxWithRefEntryIsRefTxProofProps

export type TxWithRefEntryInRefTxProofProps = {
    type: 'txWithRefEntryInRefTx';
    data: {
        entry: RefEntryData,
        refTx: RefToTx,
        proof: TxWithEntryInRefTxProof;
    }
} 
export type RefTxInTxWithRefEntryProofProps = {
    type: 'refTxInTxWithRefEntry';
    data: {
        entry: RefEntryData,
        refTx: RefToTx,
        proof: RefTxInTxWithEntryProof;
    }
} 
export type TxWithRefEntryIsRefTxProofProps = {
    type: 'txWithRefEntryIsRefTx';
    data: {
        entry: RefEntryData,
        refTx: RefToTx,
        proof: TxWithEntryIsRefTxProof;
    }
}