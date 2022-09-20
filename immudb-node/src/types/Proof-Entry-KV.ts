import { ValEntryData } from "./ValEntry.js";
import { 
    RefTxInTxWithEntryProof, 
    TxWithEntryInRefTxProof, 
    TxWithEntryIsRefTxProof 
} from "./Proof-Entry.js";
import { RefToTx } from "./Tx.js";




export type TxWithKVEntryProofProps = 
    | TxWithKVEntryInRefTxProofProps
    | RefTxInTxWithKVEntryProofProps 
    | TxWithKVEntryIsRefTxProofProps

export type TxWithKVEntryInRefTxProofProps = {
    type: 'txWithKVEntryInRefTx';
    data: {
        entry: ValEntryData,
        refTx: RefToTx,
        proof: TxWithEntryInRefTxProof;
    }
} 
export type RefTxInTxWithKVEntryProofProps = {
    type: 'refTxInTxWithKVEntry';
    data: {
        entry: ValEntryData,
        refTx: RefToTx,
        proof: RefTxInTxWithEntryProof;
    }
} 
export type TxWithKVEntryIsRefTxProofProps = {
    type: 'txWithKVEntryIsRefTx';
    data: {
        entry: ValEntryData,
        refTx: RefToTx,
        proof: TxWithEntryIsRefTxProof;
    }
}