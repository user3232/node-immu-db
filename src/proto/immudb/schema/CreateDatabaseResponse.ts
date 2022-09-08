// Original file: proto/schema.proto

import type { DatabaseNullableSettings as _immudb_schema_DatabaseNullableSettings, DatabaseNullableSettings__Output as _immudb_schema_DatabaseNullableSettings__Output } from '../../immudb/schema/DatabaseNullableSettings.js';

export interface CreateDatabaseResponse {
  'name'?: (string);
  'settings'?: (_immudb_schema_DatabaseNullableSettings | null);
  'alreadyExisted'?: (boolean);
}

export interface CreateDatabaseResponse__Output {
  'name': (string);
  'settings': (_immudb_schema_DatabaseNullableSettings__Output | null);
  'alreadyExisted': (boolean);
}
