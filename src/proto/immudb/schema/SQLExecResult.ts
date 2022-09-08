// Original file: proto/schema.proto

import type { CommittedSQLTx as _immudb_schema_CommittedSQLTx, CommittedSQLTx__Output as _immudb_schema_CommittedSQLTx__Output } from '../../immudb/schema/CommittedSQLTx.js';

export interface SQLExecResult {
  'txs'?: (_immudb_schema_CommittedSQLTx)[];
  'ongoingTx'?: (boolean);
}

export interface SQLExecResult__Output {
  'txs': (_immudb_schema_CommittedSQLTx__Output)[];
  'ongoingTx': (boolean);
}
