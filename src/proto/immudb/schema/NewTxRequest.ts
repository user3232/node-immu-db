// Original file: proto/schema.proto

import type { TxMode as _immudb_schema_TxMode } from '../../immudb/schema/TxMode.js';

export interface NewTxRequest {
  'mode'?: (_immudb_schema_TxMode | keyof typeof _immudb_schema_TxMode);
}

export interface NewTxRequest__Output {
  'mode': (keyof typeof _immudb_schema_TxMode);
}
