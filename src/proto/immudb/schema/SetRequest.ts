// Original file: proto/schema.proto

import type { KeyValue as _immudb_schema_KeyValue, KeyValue__Output as _immudb_schema_KeyValue__Output } from '../../immudb/schema/KeyValue.js';
import type { Precondition as _immudb_schema_Precondition, Precondition__Output as _immudb_schema_Precondition__Output } from '../../immudb/schema/Precondition.js';

export interface SetRequest {
  'KVs'?: (_immudb_schema_KeyValue)[];
  'noWait'?: (boolean);
  'preconditions'?: (_immudb_schema_Precondition)[];
}

export interface SetRequest__Output {
  'KVs': (_immudb_schema_KeyValue__Output)[];
  'noWait': (boolean);
  'preconditions': (_immudb_schema_Precondition__Output)[];
}
