// Original file: proto/schema.proto

import type { Tx as _immudb_schema_Tx, Tx__Output as _immudb_schema_Tx__Output } from '../../immudb/schema/Tx.js';
import type { DualProof as _immudb_schema_DualProof, DualProof__Output as _immudb_schema_DualProof__Output } from '../../immudb/schema/DualProof.js';
import type { Signature as _immudb_schema_Signature, Signature__Output as _immudb_schema_Signature__Output } from '../../immudb/schema/Signature.js';

export interface VerifiableTx {
  'tx'?: (_immudb_schema_Tx | null);
  'dualProof'?: (_immudb_schema_DualProof | null);
  'signature'?: (_immudb_schema_Signature | null);
}

export interface VerifiableTx__Output {
  'tx': (_immudb_schema_Tx__Output | null);
  'dualProof': (_immudb_schema_DualProof__Output | null);
  'signature': (_immudb_schema_Signature__Output | null);
}
