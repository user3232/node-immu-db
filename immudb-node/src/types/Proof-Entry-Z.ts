import { ZEntryData } from "./ZEntry.js";
import { 
    RefTxInTxWithEntryProof, 
    TxWithEntryInRefTxProof, 
    TxWithEntryIsRefTxProof 
} from "./Proof-Entry.js";
import { RefToTx } from "./Tx.js";



export type TxWithZEntryProofProps = 
    | TxWithZEntryInRefTxProofProps 
    | RefTxInTxWithZEntryProofProps 
    | TxWithZEntryIsRefTxProofProps

export type TxWithZEntryInRefTxProofProps = {
    type: 'txWithZEntryInRefTx';
    data: {
        entry: ZEntryData,
        refTx: RefToTx,
        proof: TxWithEntryInRefTxProof;
    }
} 
export type RefTxInTxWithZEntryProofProps = {
    type: 'refTxInTxWithZEntry';
    data: {
        entry: ZEntryData,
        refTx: RefToTx,
        proof: RefTxInTxWithEntryProof;
    }
} 
export type TxWithZEntryIsRefTxProofProps = {
    type: 'txWithZEntryIsRefTx';
    data: {
        entry: ZEntryData,
        refTx: RefToTx,
        proof: TxWithEntryIsRefTxProof;
    }
}


