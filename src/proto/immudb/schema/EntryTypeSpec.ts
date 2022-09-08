// Original file: proto/schema.proto

import type { EntryTypeAction as _immudb_schema_EntryTypeAction } from '../../immudb/schema/EntryTypeAction.js';

export interface EntryTypeSpec {
  'action'?: (_immudb_schema_EntryTypeAction | keyof typeof _immudb_schema_EntryTypeAction);
}

export interface EntryTypeSpec__Output {
  'action': (keyof typeof _immudb_schema_EntryTypeAction);
}
