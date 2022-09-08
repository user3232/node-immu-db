// Original file: proto/schema.proto

import type { DatabaseNullableSettings as _immudb_schema_DatabaseNullableSettings, DatabaseNullableSettings__Output as _immudb_schema_DatabaseNullableSettings__Output } from '../../immudb/schema/DatabaseNullableSettings.js';

export interface UpdateDatabaseRequest {
  'database'?: (string);
  'settings'?: (_immudb_schema_DatabaseNullableSettings | null);
}

export interface UpdateDatabaseRequest__Output {
  'database': (string);
  'settings': (_immudb_schema_DatabaseNullableSettings__Output | null);
}
