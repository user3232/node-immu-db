import { ValEntry } from "./ValEntry.js";
import { 
    RefTxInTxWithEntryProof, 
    TxWithEntryInRefTxProof, 
    TxWithEntryIsRefTxProof 
} from "./Proof-Entry.js";
import { RefTx } from "./Tx.js";




export type TxWithKVEntryProofProps = 
    | TxWithKVEntryInRefTxProofProps
    | RefTxInTxWithKVEntryProofProps 
    | TxWithKVEntryIsRefTxProofProps

export type TxWithKVEntryInRefTxProofProps = {
    type: 'txWithKVEntryInRefTx';
    data: {
        entry: ValEntry,
        refTx: RefTx,
        proof: TxWithEntryInRefTxProof;
    }
} 
export type RefTxInTxWithKVEntryProofProps = {
    type: 'refTxInTxWithKVEntry';
    data: {
        entry: ValEntry,
        refTx: RefTx,
        proof: RefTxInTxWithEntryProof;
    }
} 
export type TxWithKVEntryIsRefTxProofProps = {
    type: 'txWithKVEntryIsRefTx';
    data: {
        entry: ValEntry,
        refTx: RefTx,
        proof: TxWithEntryIsRefTxProof;
    }
}