// Original file: proto/schema.proto

import type { Database as _immudb_schema_Database, Database__Output as _immudb_schema_Database__Output } from '../../immudb/schema/Database.js';

export interface DatabaseListResponse {
  'databases'?: (_immudb_schema_Database)[];
}

export interface DatabaseListResponse__Output {
  'databases': (_immudb_schema_Database__Output)[];
}
