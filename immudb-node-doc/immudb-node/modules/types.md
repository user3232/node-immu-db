[immudb-node](../README.md) / [Exports](../modules.md) / types

# Namespace: types

## Table of contents

### Type Aliases

- [BinEntry](types.md#binentry)
- [BinTxEntry](types.md#bintxentry)
- [DBRuntimeInfo](types.md#dbruntimeinfo)
- [DatabasePermission](types.md#databasepermission)
- [DatabaseSettings](types.md#databasesettings)
- [DatabaseSettingsReadonly](types.md#databasesettingsreadonly)
- [DatabaseSettingsUpdatable](types.md#databasesettingsupdatable)
- [Entry](types.md#entry)
- [EntryMetadata](types.md#entrymetadata)
- [ExtendedJSONAble](types.md#extendedjsonable)
- [GrpcCallMetaAndOpts](types.md#grpccallmetaandopts)
- [HashEntry](types.md#hashentry)
- [ImmuState](types.md#immustate)
- [IndexSettings](types.md#indexsettings)
- [IndexSettingsReadonly](types.md#indexsettingsreadonly)
- [IndexSettingsUpdatable](types.md#indexsettingsupdatable)
- [IndexerInfo](types.md#indexerinfo)
- [KVMH](types.md#kvmh)
- [KeyValMeta](types.md#keyvalmeta)
- [KnownPermissionName](types.md#knownpermissionname)
- [LeafTxEntry](types.md#leaftxentry)
- [Permission](types.md#permission)
- [PermissionCode](types.md#permissioncode)
- [Provable](types.md#provable)
- [ProvableTx](types.md#provabletx)
- [RefEntry](types.md#refentry)
- [RefToTxObsolate](types.md#reftotxobsolate)
- [RefTxEntry](types.md#reftxentry)
- [ReplicationSettings](types.md#replicationsettings)
- [ServerInfo](types.md#serverinfo)
- [SessionTokens](types.md#sessiontokens)
- [SqlColumnEntry](types.md#sqlcolumnentry)
- [SqlColumnTxEntry](types.md#sqlcolumntxentry)
- [SqlDbEntry](types.md#sqldbentry)
- [SqlDbTxEntry](types.md#sqldbtxentry)
- [SqlEntry](types.md#sqlentry)
- [SqlIndexColumn](types.md#sqlindexcolumn)
- [SqlIndexEntry](types.md#sqlindexentry)
- [SqlIndexTxEntry](types.md#sqlindextxentry)
- [SqlNamedValue](types.md#sqlnamedvalue)
- [SqlRowColumn](types.md#sqlrowcolumn)
- [SqlRowEntry](types.md#sqlrowentry)
- [SqlRowTxEntry](types.md#sqlrowtxentry)
- [SqlTableEntry](types.md#sqltableentry)
- [SqlTableTxEntry](types.md#sqltabletxentry)
- [SqlTxEntry](types.md#sqltxentry)
- [SqlValBin](types.md#sqlvalbin)
- [SqlValNameTypeVal](types.md#sqlvalnametypeval)
- [SqlValTypeVal](types.md#sqlvaltypeval)
- [SqlValTypeValBlob](types.md#sqlvaltypevalblob)
- [SqlValTypeValBool](types.md#sqlvaltypevalbool)
- [SqlValTypeValChar](types.md#sqlvaltypevalchar)
- [SqlValTypeValInt](types.md#sqlvaltypevalint)
- [SqlValTypeValNull](types.md#sqlvaltypevalnull)
- [SqlValTypeValTime](types.md#sqlvaltypevaltime)
- [SqlValue](types.md#sqlvalue)
- [Transaction](types.md#transaction)
- [TransactionTokens](types.md#transactiontokens)
- [TxContext](types.md#txcontext)
- [TxCore](types.md#txcore)
- [TxEntry](types.md#txentry)
- [TxHash](types.md#txhash)
- [TxObsolate](types.md#txobsolate)
- [UserCredentials](types.md#usercredentials)
- [UserDatabaseSession](types.md#userdatabasesession)
- [UserInfo](types.md#userinfo)
- [UserPermission](types.md#userpermission)
- [UserSessionCredentials](types.md#usersessioncredentials)
- [ValEntry](types.md#valentry)
- [ValOrRefKeyPrecondition](types.md#valorrefkeyprecondition)
- [ValOrRefKeyPreconditionKeyExist](types.md#valorrefkeypreconditionkeyexist)
- [ValOrRefKeyPreconditionKeyNotExist](types.md#valorrefkeypreconditionkeynotexist)
- [ValOrRefKeyPreconditionKeyNotModified](types.md#valorrefkeypreconditionkeynotmodified)
- [ValTxEntry](types.md#valtxentry)
- [Verification](types.md#verification)
- [VerificationEntries](types.md#verificationentries)
- [VerificationEntriesAllOf](types.md#verificationentriesallof)
- [VerificationEntriesOneOf](types.md#verificationentriesoneof)
- [VerificationTx](types.md#verificationtx)
- [VerificationTxEquality](types.md#verificationtxequality)
- [VerificationTxInclusion](types.md#verificationtxinclusion)
- [VerificationTxIsExtending](types.md#verificationtxisextending)
- [VerificationTxType](types.md#verificationtxtype)
- [ZSetEntry](types.md#zsetentry)
- [ZSetTxEntry](types.md#zsettxentry)

## Type Aliases

### BinEntry

Ƭ **BinEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `meta?` | [`EntryMetadata`](types.md#entrymetadata) |
| `prefixedKey` | `Buffer` |
| `prefixedVal` | `Buffer` |
| `type` | ``"bin"`` |
| `version` | ``"1"`` |

#### Defined in

[types/Entry.ts:16](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Entry.ts#L16)

___

### BinTxEntry

Ƭ **BinTxEntry**: [`TxContext`](types.md#txcontext) & [`BinEntry`](types.md#binentry)

#### Defined in

[types/TxEntry.ts:39](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/TxEntry.ts#L39)

___

### DBRuntimeInfo

Ƭ **DBRuntimeInfo**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `database` | `string` | Name of immudb instance database |
| `isLoaded` | `boolean` | Databases can be dynamically loaded and unloaded without having to  restart the server. After the database is unloaded, all its resources are  released. Unloaded databases cannot be queried or written to |
| `settings` | [`DatabaseSettings`](types.md#databasesettings) | Database settings |

#### Defined in

[types/Db.ts:5](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Db.ts#L5)

___

### DatabasePermission

Ƭ **DatabasePermission**: `Object`

Permission for database

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `database` | `string` | Database name |
| `permission` | [`Permission`](types.md#permission) | Permission known name or code |

#### Defined in

[types/Permission.ts:15](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Permission.ts#L15)

___

### DatabaseSettings

Ƭ **DatabaseSettings**: [`DatabaseSettingsReadonly`](types.md#databasesettingsreadonly) & [`DatabaseSettingsUpdatable`](types.md#databasesettingsupdatable)

Database settings.

> **NOTE**
> 
> Following settings cannot be updated after database creation:
> * fileSize, 
> * maxKeyLen, 
> * maxValueLen, 
> * maxTxEntries,
> * indexOptions.maxNodeSize

#### Defined in

[types/Db.ts:36](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Db.ts#L36)

___

### DatabaseSettingsReadonly

Ƭ **DatabaseSettingsReadonly**: `Object`

Database unchangable settings

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileSize?` | `number` | default storage layer implementation writes data into fixed-size files,  default size being 512MB. The current theoretical maximum number of files  is 100 millions. |
| `indexSettings` | [`IndexSettingsReadonly`](types.md#indexsettingsreadonly) | Indexing settings |
| `maxKeyLen?` | `number` | maximum length of keys for entries stored in the database.    max maxKeyLen: 1024 Bytes (2^31-1 bytes) |
| `maxTxEntries?` | `number` | In order to provide manageable limits, immudb is designed to set an upper  bound to the number of key-value pairs included in a single transaction.  The default value being 1024, so using default settings, the theoretical  number of key-value pairs that can be stored in immudb is: 1024 * (1^64 -  1). |
| `maxValueLen?` | `number` | maximum length of value for entries stored in the database.    Max maxValueLen: 32 MB (2^56-1 bytes) |

#### Defined in

[types/Db.ts:105](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Db.ts#L105)

___

### DatabaseSettingsUpdatable

Ƭ **DatabaseSettingsUpdatable**: `Object`

Database changable settings

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `autoload?` | `boolean` | Should database be automatically loaded?:  * (default) yes -> leave this value undefined or set to true  * no -> set this value to false |
| `commitLogMaxOpenedFiles?` | `number` | maximum number of open files for commit log |
| `excludeCommitTime?` | `boolean` | if set to true, commit time is not added to transaction headers allowing  reproducible database state |
| `indexSettings` | [`IndexSettingsUpdatable`](types.md#indexsettingsupdatable) | Indexing settings |
| `maxConcurrency?` | `number` | max number of concurrent operations on the db |
| `maxIOConcurrency?` | `number` | max number of concurrent IO operations on the db |
| `replicationSettings` | [`ReplicationSettings`](types.md#replicationsettings) | Repliation settings |
| `txLogCacheSize?` | `number` | size of transaction log cache |
| `txLogMaxOpenedFiles?` | `number` | maximum number of open files for transaction log |
| `vLogMaxOpenedFiles?` | `number` | maximum number of open files for payload data |
| `writeTxHeaderVersion?` | `number` | transaction header version, used for backwards compatibility |

#### Defined in

[types/Db.ts:42](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Db.ts#L42)

___

### Entry

Ƭ **Entry**: [`BinEntry`](types.md#binentry) \| [`HashEntry`](types.md#hashentry) \| [`ValEntry`](types.md#valentry) \| [`RefEntry`](types.md#refentry) \| [`ZSetEntry`](types.md#zsetentry) \| [`SqlEntry`](types.md#sqlentry)

ImmuDb entry, one of:
- binary entry - [BinEntry](types.md#binentry),
- hash entry - [HashEntry](types.md#hashentry),
- value entry - [ValEntry](types.md#valentry),
- reference entry - [RefEntry](types.md#refentry),
- z-Set entry - [ZSetEntry](types.md#zsetentry),
- sql entry - [SqlEntry](types.md#sqlentry),

#### Defined in

[types/Entry.ts:157](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Entry.ts#L157)

___

### EntryMetadata

Ƭ **EntryMetadata**: `Object`

Structure influencing ImmuDb Indexer behaviour for
indexing [Entry](types.md#entry)'ies.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `deleted?` | `boolean` | If set to `true` key value will be marked as deleted.    Get key will not return value ok key value marked as deleted. |
| `expiresAt?` | `Long` | If set and ImmuDb server time is after, this key value will be marked as expired  when queried. Latest key value may than return other value. |
| `nonIndexable?` | `boolean` | If set to `true` key value will be marked as non indexable and  skipped by ImuuDb indexer. Effectively this would mean that if this  key value was set with this property, and we ask for latest key,  returned value will be not of this key value but of last indexed. |

#### Defined in

[types/EntryMeta.ts:12](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/EntryMeta.ts#L12)

___

### ExtendedJSONAble

Ƭ **ExtendedJSONAble**: `string` \| `number` \| `boolean` \| `Long` \| `Buffer` \| [`ExtendedJSONAble`](types.md#extendedjsonable)[] \| { `[x: string]`: [`ExtendedJSONAble`](types.md#extendedjsonable);  }

Recursive type representing object that can be serialized/deserialized
to/from Buffer and used as key or values.

This type extends normal node JSON with additional primitives for:
- Buffer
- and Long

This type is used by buffer.toObject and buffer.fromObject functions.

#### Defined in

[types/ExtendedJSONAble.ts:16](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/ExtendedJSONAble.ts#L16)

___

### GrpcCallMetaAndOpts

Ƭ **GrpcCallMetaAndOpts**: `Object`

Grpc call metadata and options.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `metadata?` | `grpcjs.Metadata` | Grpc call metadata (request headers). |
| `options?` | `grpcjs.CallOptions` | Grpc call options, includes:   - grpcjs.CallOptions.deadline  (call timeout),   - grpcjs.CallOptions.credentials (not interceptable request headers),   - and few other options. |

#### Defined in

[types/GrpcCallMetaAndOpts.ts:7](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/GrpcCallMetaAndOpts.ts#L7)

___

### HashEntry

Ƭ **HashEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `meta?` | [`EntryMetadata`](types.md#entrymetadata) |
| `prefixedKey` | `Buffer` |
| `prefixedValHash` | `Buffer` |
| `type` | ``"hash"`` |
| `version` | ``"1"`` |

#### Defined in

[types/Entry.ts:25](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Entry.ts#L25)

___

### ImmuState

Ƭ **ImmuState**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `databaseName` | `string` |
| `instanceSignature` | `Buffer` |
| `lastTransactionHash` | `Buffer` |
| `lastTransactionId` | `Long` |

#### Defined in

[types/ImmuState.ts:5](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/ImmuState.ts#L5)

___

### IndexSettings

Ƭ **IndexSettings**: [`IndexSettingsUpdatable`](types.md#indexsettingsupdatable) & [`IndexSettingsReadonly`](types.md#indexsettingsreadonly)

Indexing settings

#### Defined in

[types/Db.ts:182](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Db.ts#L182)

___

### IndexSettingsReadonly

Ƭ **IndexSettingsReadonly**: `Object`

Indexing unchangable settings

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `maxNodeSize?` | `number` | max size of btree node in bytes |

#### Defined in

[types/Db.ts:189](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Db.ts#L189)

___

### IndexSettingsUpdatable

Ƭ **IndexSettingsUpdatable**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cacheSize?` | `number` | size of btree node cache |
| `cleanupPercentage?` | `number` \| `string` | % of data to be cleaned up from during next automatic flush operation |
| `commitLogMaxOpenedFiles?` | `number` | maximum number of files opened for commit log |
| `compactionThld?` | `number` | minimum number of flushed snapshots to enable full compaction of the  index |
| `delayDuringCompaction?` | `number` | extra delay added during indexing when full compaction is in progress |
| `flushBufferSize?` | `number` | in-memory buffer size when doing flush operation |
| `flushThreshold?` | `number` | threshold in number of entries between automatic flushes |
| `historyLogMaxOpenedFiles?` | `number` | maximum number of files opened for nodes history |
| `maxActiveSnapshots?` | `number` | max number of active in-memory btree snapshots |
| `nodesLogMaxOpenedFiles?` | `number` | maximum number of files opened for nodes data |
| `renewSnapRootAfter?` | `Long` | threshold in time for automated snapshot renewal during data scans  (in seconds?). |
| `syncThreshold?` | `number` | threshold in number of entries between flushes with sync |

#### Defined in

[types/Db.ts:199](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Db.ts#L199)

___

### IndexerInfo

Ƭ **IndexerInfo**: `Object`

Entry and additional informations from ImmuDb server indexer.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `expired?` | `boolean` | Entry indexer context - is entry expired?    If `true` than entry metadata expiresAt |
| `revision` | `Long` | Entry indexer context - entry revision.    (Assuming that for same key (different) values was set  multiple times, `revision` number is sequence number of  set operation.) |

#### Defined in

[types/Indexer.ts:9](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Indexer.ts#L9)

___

### KVMH

Ƭ **KVMH**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `meta?` | [`EntryMetadata`](types.md#entrymetadata) |
| `prefixedKey` | `Buffer` |
| `prefixedVal` | `Buffer` |
| `valHash` | `Buffer` |

#### Defined in

[types/Entry.ts:7](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Entry.ts#L7)

___

### KeyValMeta

Ƭ **KeyValMeta**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `Buffer` |
| `meta?` | [`EntryMetadata`](types.md#entrymetadata) |
| `val` | `Buffer` |

#### Defined in

[types/KeyValMeta.ts:5](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/KeyValMeta.ts#L5)

___

### KnownPermissionName

Ƭ **KnownPermissionName**: ``"ReadWrite"`` \| ``"None"`` \| ``"Read"`` \| ``"Admin"`` \| ``"SysAdmin"``

#### Defined in

[types/Permission.ts:6](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Permission.ts#L6)

___

### LeafTxEntry

Ƭ **LeafTxEntry**: [`TxContext`](types.md#txcontext) & [`HashEntry`](types.md#hashentry)

#### Defined in

[types/TxEntry.ts:40](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/TxEntry.ts#L40)

___

### Permission

Ƭ **Permission**: [`PermissionCode`](types.md#permissioncode) \| [`KnownPermissionName`](types.md#knownpermissionname)

#### Defined in

[types/Permission.ts:4](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Permission.ts#L4)

___

### PermissionCode

Ƭ **PermissionCode**: `number`

#### Defined in

[types/Permission.ts:5](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Permission.ts#L5)

___

### Provable

Ƭ **Provable**: [`ProvableTx`](types.md#provabletx) \| [`ProvableTx`](types.md#provabletx)[] \| [`TxEntry`](types.md#txentry) \| [`TxEntry`](types.md#txentry)[]

ImmuDb can prove what has been set in what transaction, this implies that any
number of transaction can be verified.

As transaction (Tx) can contain entries (of type [Entry](types.md#entry)), any
entry in context of transaction can be proved.

As list of transaction also can be proved, whole database composed of entries
(of type [Entry](types.md#entry)) within transactions can also be proved.

#### Defined in

[types/Provable.ts:50](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Provable.ts#L50)

___

### ProvableTx

Ƭ **ProvableTx**: `Object`

Structure represetning fundamental data which existance in ImmuDb can be
verified.

Minimal required data is transaction id Verifiable.id, because it
uniqly identifies transaction TxAnonymous, which is an atom of
verification process.

Common users would be also interested in:
- time of creation - Verifiable.timestamp
- some entries - Verifiable.entries.

All filds could be verified.

Verification process in all cases will verify all filds but entries. Entries
will be verified if specified and in this situation sometimes all entries
will be verified, even if not specified.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `allEntriesCount?` | `number` |
| `allEntriesMht?` | `Buffer` |
| `entries?` | [`Entry`](types.md#entry)[] |
| `id` | `Long` |
| `prevTxHash?` | `Buffer` |
| `prevTxesMht?` | `Buffer` |
| `timestamp?` | `Long` |
| `txHash?` | `Buffer` |

#### Defined in

[types/Provable.ts:28](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Provable.ts#L28)

___

### RefEntry

Ƭ **RefEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `Buffer` |
| `meta?` | [`EntryMetadata`](types.md#entrymetadata) |
| `referredAtTxId` | `Long` |
| `referredKey` | `Buffer` |
| `type` | ``"ref"`` |
| `version` | ``"1"`` |

#### Defined in

[types/Entry.ts:43](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Entry.ts#L43)

___

### RefToTxObsolate

Ƭ **RefToTxObsolate**: `Object`

Structure representing transaction [TxObsolate](types.md#txobsolate),
useful for referring to transaction.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `Buffer` | Hash (sha256) of transaction. |
| `id` | `Long` | Id of reffered transaction. |
| `tx?` | [`TxObsolate`](types.md#txobsolate) | Transaction |

#### Defined in

[types/Tx.ts:143](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Tx.ts#L143)

___

### RefTxEntry

Ƭ **RefTxEntry**: [`TxContext`](types.md#txcontext) & [`RefEntry`](types.md#refentry)

#### Defined in

[types/TxEntry.ts:42](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/TxEntry.ts#L42)

___

### ReplicationSettings

Ƭ **ReplicationSettings**: `Object`

Replication settings

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `followerPassword?` | `string` | password used to connect to the master immudb instance |
| `followerUsername?` | `string` | username used to connect to the master immudb instance |
| `masterAddress?` | `string` | hostname of the master immudb instance |
| `masterDatabase?` | `string` | name of the database to replicate |
| `masterPort?` | `number` | tcp port of the master immudb instance |
| `replica?` | `boolean` | if true, the database is a replica of another one |

#### Defined in

[types/Db.ts:150](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Db.ts#L150)

___

### ServerInfo

Ƭ **ServerInfo**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `status` | `boolean` | Status of immudb inistance:  * ok --> true  * something wrong --> false |
| `version` | `string` | Version of instance. |

#### Defined in

[types/Instance.ts:5](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Instance.ts#L5)

___

### SessionTokens

Ƭ **SessionTokens**: `Object`

Represents ImmuDb user session tokens

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `immudb-uuid` | `string` | Token of ImmuDb server. |
| `sessionid` | `string` | Token of ImmuDb server user session. |

#### Defined in

[types/Session.ts:32](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Session.ts#L32)

___

### SqlColumnEntry

Ƭ **SqlColumnEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `columnId` | `number` |
| `columnIsAutoIncr` | `boolean` |
| `columnIsNotNull` | `boolean` |
| `columnMaxLength` | `number` |
| `columnName` | `string` |
| `columnType` | `string` |
| `dbId` | `number` |
| `meta?` | [`EntryMetadata`](types.md#entrymetadata) |
| `sqlType` | ``"column"`` |
| `tableId` | `number` |
| `type` | ``"sql"`` |
| `version` | ``"1"`` |

#### Defined in

[types/Entry.ts:80](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Entry.ts#L80)

___

### SqlColumnTxEntry

Ƭ **SqlColumnTxEntry**: [`TxContext`](types.md#txcontext) & [`SqlColumnEntry`](types.md#sqlcolumnentry)

#### Defined in

[types/TxEntry.ts:46](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/TxEntry.ts#L46)

___

### SqlDbEntry

Ƭ **SqlDbEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dbId` | `number` |
| `dbName` | `string` |
| `meta?` | [`EntryMetadata`](types.md#entrymetadata) |
| `sqlType` | ``"db"`` |
| `type` | ``"sql"`` |
| `version` | ``"1"`` |

#### Defined in

[types/Entry.ts:122](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Entry.ts#L122)

___

### SqlDbTxEntry

Ƭ **SqlDbTxEntry**: [`TxContext`](types.md#txcontext) & [`SqlDbEntry`](types.md#sqldbentry)

#### Defined in

[types/TxEntry.ts:49](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/TxEntry.ts#L49)

___

### SqlEntry

Ƭ **SqlEntry**: [`SqlRowEntry`](types.md#sqlrowentry) \| [`SqlColumnEntry`](types.md#sqlcolumnentry) \| [`SqlIndexEntry`](types.md#sqlindexentry) \| [`SqlTableEntry`](types.md#sqltableentry) \| [`SqlDbEntry`](types.md#sqldbentry)

ImmuDb sql entry, one of:
- row entry - [SqlRowEntry](types.md#sqlrowentry),
- column entry - [SqlColumnEntry](types.md#sqlcolumnentry),
- index entry - [SqlIndexEntry](types.md#sqlindexentry),
- table entry - [SqlTableEntry](types.md#sqltableentry),
- database entry - [SqlDbEntry](types.md#sqldbentry).

#### Defined in

[types/Entry.ts:140](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Entry.ts#L140)

___

### SqlIndexColumn

Ƭ **SqlIndexColumn**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ascDesc` | `number` |
| `id` | `number` |

#### Defined in

[types/Entry.ts:107](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Entry.ts#L107)

___

### SqlIndexEntry

Ƭ **SqlIndexEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `columns` | [`SqlIndexColumn`](types.md#sqlindexcolumn)[] |
| `dbId` | `number` |
| `indexId` | `number` |
| `indexIsPrimary` | `number` |
| `meta?` | [`EntryMetadata`](types.md#entrymetadata) |
| `sqlType` | ``"index"`` |
| `tableId` | `number` |
| `type` | ``"sql"`` |
| `version` | ``"1"`` |

#### Defined in

[types/Entry.ts:95](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Entry.ts#L95)

___

### SqlIndexTxEntry

Ƭ **SqlIndexTxEntry**: [`TxContext`](types.md#txcontext) & [`SqlIndexEntry`](types.md#sqlindexentry)

#### Defined in

[types/TxEntry.ts:47](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/TxEntry.ts#L47)

___

### SqlNamedValue

Ƭ **SqlNamedValue**: { `name`: `string` ; `type`: ``"BOOLEAN"`` ; `value`: `boolean`  } \| { `name`: `string` ; `type`: ``"TIMESTAMP"`` ; `value`: `Long`  } \| { `name`: `string` ; `type`: ``"BLOB"`` ; `value`: `Buffer`  } \| { `name`: `string` ; `type`: ``"INTEGER"`` ; `value`: `Long`  } \| { `name`: `string` ; `type`: ``"VARCHAR"`` ; `value`: `string`  } \| { `name`: `string` ; `type`: ``"NULL"``  }

#### Defined in

[types/SQL.ts:53](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/SQL.ts#L53)

___

### SqlRowColumn

Ƭ **SqlRowColumn**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bin` | `Buffer` |
| `id` | `number` |

#### Defined in

[types/Entry.ts:75](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Entry.ts#L75)

___

### SqlRowEntry

Ƭ **SqlRowEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `columnsValues` | [`SqlRowColumn`](types.md#sqlrowcolumn)[] |
| `dbId` | `number` |
| `meta?` | [`EntryMetadata`](types.md#entrymetadata) |
| `pk` | `Buffer` |
| `sqlType` | ``"row"`` |
| `tableId` | `number` |
| `type` | ``"sql"`` |
| `version` | ``"1"`` |

#### Defined in

[types/Entry.ts:64](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Entry.ts#L64)

___

### SqlRowTxEntry

Ƭ **SqlRowTxEntry**: [`TxContext`](types.md#txcontext) & [`SqlRowEntry`](types.md#sqlrowentry)

#### Defined in

[types/TxEntry.ts:45](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/TxEntry.ts#L45)

___

### SqlTableEntry

Ƭ **SqlTableEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dbId` | `number` |
| `meta?` | [`EntryMetadata`](types.md#entrymetadata) |
| `sqlType` | ``"table"`` |
| `tableId` | `number` |
| `tableName` | `string` |
| `type` | ``"sql"`` |
| `version` | ``"1"`` |

#### Defined in

[types/Entry.ts:112](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Entry.ts#L112)

___

### SqlTableTxEntry

Ƭ **SqlTableTxEntry**: [`TxContext`](types.md#txcontext) & [`SqlTableEntry`](types.md#sqltableentry)

#### Defined in

[types/TxEntry.ts:48](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/TxEntry.ts#L48)

___

### SqlTxEntry

Ƭ **SqlTxEntry**: [`SqlRowTxEntry`](types.md#sqlrowtxentry) \| [`SqlColumnTxEntry`](types.md#sqlcolumntxentry) \| [`SqlIndexTxEntry`](types.md#sqlindextxentry) \| [`SqlTableTxEntry`](types.md#sqltabletxentry) \| [`SqlDbTxEntry`](types.md#sqldbtxentry)

#### Defined in

[types/TxEntry.ts:30](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/TxEntry.ts#L30)

___

### SqlValBin

Ƭ **SqlValBin**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bin` | `Buffer` |
| `id` | `number` |

#### Defined in

[types/SQL.ts:5](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/SQL.ts#L5)

___

### SqlValNameTypeVal

Ƭ **SqlValNameTypeVal**: [`SqlValTypeVal`](types.md#sqlvaltypeval) & { `name`: `string`  }

#### Defined in

[types/SQL.ts:46](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/SQL.ts#L46)

___

### SqlValTypeVal

Ƭ **SqlValTypeVal**: [`SqlValTypeValBool`](types.md#sqlvaltypevalbool) \| [`SqlValTypeValTime`](types.md#sqlvaltypevaltime) \| [`SqlValTypeValBlob`](types.md#sqlvaltypevalblob) \| [`SqlValTypeValInt`](types.md#sqlvaltypevalint) \| [`SqlValTypeValChar`](types.md#sqlvaltypevalchar) \| [`SqlValTypeValNull`](types.md#sqlvaltypevalnull)

#### Defined in

[types/SQL.ts:11](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/SQL.ts#L11)

___

### SqlValTypeValBlob

Ƭ **SqlValTypeValBlob**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | ``"BLOB"`` |
| `val` | `Buffer` |

#### Defined in

[types/SQL.ts:28](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/SQL.ts#L28)

___

### SqlValTypeValBool

Ƭ **SqlValTypeValBool**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | ``"BOOLEAN"`` |
| `val` | `boolean` |

#### Defined in

[types/SQL.ts:20](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/SQL.ts#L20)

___

### SqlValTypeValChar

Ƭ **SqlValTypeValChar**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | ``"VARCHAR"`` |
| `val` | `string` |

#### Defined in

[types/SQL.ts:36](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/SQL.ts#L36)

___

### SqlValTypeValInt

Ƭ **SqlValTypeValInt**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | ``"INTEGER"`` |
| `val` | `Long` |

#### Defined in

[types/SQL.ts:32](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/SQL.ts#L32)

___

### SqlValTypeValNull

Ƭ **SqlValTypeValNull**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | ``"NULL"`` |

#### Defined in

[types/SQL.ts:40](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/SQL.ts#L40)

___

### SqlValTypeValTime

Ƭ **SqlValTypeValTime**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | ``"TIMESTAMP"`` |
| `val` | `Long` |

#### Defined in

[types/SQL.ts:24](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/SQL.ts#L24)

___

### SqlValue

Ƭ **SqlValue**: { `type`: ``"BOOLEAN"`` ; `value`: `boolean`  } \| { `type`: ``"TIMESTAMP"`` ; `value`: `Long`  } \| { `type`: ``"BLOB"`` ; `value`: `Buffer`  } \| { `type`: ``"INTEGER"`` ; `value`: `Long`  } \| { `type`: ``"VARCHAR"`` ; `value`: `string`  } \| { `type`: ``"NULL"``  }

#### Defined in

[types/SQL.ts:61](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/SQL.ts#L61)

___

### Transaction

Ƭ **Transaction**: `Object`

Logical transaction with omitted filds connected to verification,
composed from [TxCore](types.md#txcore) and [Entry](types.md#entry)

#### Type declaration

| Name | Type |
| :------ | :------ |
| `entries` | [`Entry`](types.md#entry)[] |
| `id` | `Long` |
| `timestamp` | `Long` |

#### Defined in

[types/Transaction.ts:11](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Transaction.ts#L11)

___

### TransactionTokens

Ƭ **TransactionTokens**: `Object`

Represents ImmuDb user session transaction token

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionid` | `string` | Token of ImmuDb server user session transaction. |

#### Defined in

[types/Session.ts:47](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Session.ts#L47)

___

### TxContext

Ƭ **TxContext**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `entryId?` | `Long` |
| `id` | `Long` |

#### Defined in

[types/TxEntry.ts:15](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/TxEntry.ts#L15)

___

### TxCore

Ƭ **TxCore**: `Object`

Transaction without specified entries.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `allEntriesCount` | `number` | Count of all entries set during this transaction. |
| `allEntriesMht` | `Buffer` | Merkle Hash of all entries set during this transaction. |
| `id` | `Long` | Transaction sequence number. First transaction  have sequence number `1`. |
| `prevTxHash` | `Buffer` | Hash of contained transaction, effectively  this means that transaction contain all  other (database) transactions.     What is start transaction? |
| `prevTxesMht` | `Buffer` | Merkle Hash of list of all contained transactions (sha256) hashes  (up to this transaction but not including). |
| `timestamp` | `Long` | When transaction happened. |
| `type` | ``"tx-core"`` | - |
| `version` | ``"1"`` | Transaction structure version. |

#### Defined in

[types/Tx.ts:30](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Tx.ts#L30)

___

### TxEntry

Ƭ **TxEntry**: [`BinTxEntry`](types.md#bintxentry) \| [`LeafTxEntry`](types.md#leaftxentry) \| [`ValTxEntry`](types.md#valtxentry) \| [`RefTxEntry`](types.md#reftxentry) \| [`ZSetTxEntry`](types.md#zsettxentry) \| [`SqlTxEntry`](types.md#sqltxentry)

#### Defined in

[types/TxEntry.ts:21](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/TxEntry.ts#L21)

___

### TxHash

Ƭ **TxHash**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `Long` | Transaction sequence number. First transaction  have sequence number `1`. |
| `txHash` | `Buffer` | Hash of transaction. |
| `type` | ``"tx-hash"`` | - |
| `version` | ``"1"`` | Transaction structure version. |

#### Defined in

[types/Tx.ts:8](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Tx.ts#L8)

___

### TxObsolate

Ƭ **TxObsolate**: `Object`

Transaction is recursive structure heaving
entries (list of and data) and other (previous) transaction.

Effectively transaction is database at state
when the transaction was last database transaction.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `entriesCount` | `number` | Transaction can contain list of data (entries),   and it is count of this list. |
| `entriesMht` | `Buffer` | Merkle Hash of entries. |
| `id` | `Long` | Id of transaction. |
| `prevTxHash` | `Buffer` | Hash of contained transaction, effectively  this means that transaction contain all  other (database) transactions.     What is start transaction? |
| `prevTxesMht` | `Buffer` | Merkle Hash of list of all contained transactions (sha256) hashes  (up to this transaction but not including). |
| `timestamp` | `Long` | When transaction happened. |
| `version` | ``1`` | Transaction structure version. |

#### Defined in

[types/Tx.ts:96](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Tx.ts#L96)

___

### UserCredentials

Ƭ **UserCredentials**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `password` | `string` | Password |
| `username` | `string` | Name of immudb instance user |

#### Defined in

[types/User.ts:33](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/User.ts#L33)

___

### UserDatabaseSession

Ƭ **UserDatabaseSession**: [`UserSessionCredentials`](types.md#usersessioncredentials) & { `database`: `string`  }

Informations needed to connect user with ImmuDb database.

#### Defined in

[types/Session.ts:21](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Session.ts#L21)

___

### UserInfo

Ƭ **UserInfo**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `active` | `boolean` | Is this immudb instance user active |
| `createdBy` | `string` | Name of immudb instance user which created this user |
| `createdDate` | `Date` | Date when immudb instance user was created |
| `permissions` | [`DatabasePermission`](types.md#databasepermission)[] | Immudb instance user permissions for databases |
| `username` | `string` | Name of immudb instance user |

#### Defined in

[types/User.ts:8](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/User.ts#L8)

___

### UserPermission

Ƭ **UserPermission**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `database` | `string` | Database name |
| `permission` | [`Permission`](types.md#permission) | Permission known name or code |
| `username` | `string` | Name of immudb instance user |

#### Defined in

[types/Permission.ts:27](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Permission.ts#L27)

___

### UserSessionCredentials

Ƭ **UserSessionCredentials**: `Object`

User credentials needed for ImmuDb session.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `password` | `string` | User password. |
| `user` | `string` | Name of user. |

#### Defined in

[types/Session.ts:6](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Session.ts#L6)

___

### ValEntry

Ƭ **ValEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `Buffer` |
| `meta?` | [`EntryMetadata`](types.md#entrymetadata) |
| `type` | ``"val"`` |
| `val` | `Buffer` |
| `version` | ``"1"`` |

#### Defined in

[types/Entry.ts:34](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Entry.ts#L34)

___

### ValOrRefKeyPrecondition

Ƭ **ValOrRefKeyPrecondition**: [`ValOrRefKeyPreconditionKeyExist`](types.md#valorrefkeypreconditionkeyexist) \| [`ValOrRefKeyPreconditionKeyNotExist`](types.md#valorrefkeypreconditionkeynotexist) \| [`ValOrRefKeyPreconditionKeyNotModified`](types.md#valorrefkeypreconditionkeynotmodified)

Key value condition, one of 3 possible conditions:
- key must exist taking as argument some key,
- key must not exist taking as arugment some key,
- key must not be modified arter transaction with id taking as
  argument some key and id of transaction.

#### Defined in

[types/ValOrRefKeyPrecondition.ts:13](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/ValOrRefKeyPrecondition.ts#L13)

___

### ValOrRefKeyPreconditionKeyExist

Ƭ **ValOrRefKeyPreconditionKeyExist**: `Object`

Key must exist condition.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `Buffer` |
| `type` | ``"key-must-exist"`` |

#### Defined in

[types/ValOrRefKeyPrecondition.ts:19](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/ValOrRefKeyPrecondition.ts#L19)

___

### ValOrRefKeyPreconditionKeyNotExist

Ƭ **ValOrRefKeyPreconditionKeyNotExist**: `Object`

Key must exist condition.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `Buffer` |
| `type` | ``"key-must-not-exist"`` |

#### Defined in

[types/ValOrRefKeyPrecondition.ts:26](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/ValOrRefKeyPrecondition.ts#L26)

___

### ValOrRefKeyPreconditionKeyNotModified

Ƭ **ValOrRefKeyPreconditionKeyNotModified**: `Object`

Key must not be modified since transaction with id condition.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `Buffer` |
| `txId` | `Long` |
| `type` | ``"key-must-not-be-modified"`` |

#### Defined in

[types/ValOrRefKeyPrecondition.ts:32](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/ValOrRefKeyPrecondition.ts#L32)

___

### ValTxEntry

Ƭ **ValTxEntry**: [`TxContext`](types.md#txcontext) & [`ValEntry`](types.md#valentry)

#### Defined in

[types/TxEntry.ts:41](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/TxEntry.ts#L41)

___

### Verification

Ƭ **Verification**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `entries` | [`VerificationEntries`](types.md#verificationentries) |
| `tx` | [`VerificationTx`](types.md#verificationtx) |

#### Defined in

[types/Verification.ts:7](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Verification.ts#L7)

___

### VerificationEntries

Ƭ **VerificationEntries**: [`VerificationEntriesOneOf`](types.md#verificationentriesoneof) \| [`VerificationEntriesAllOf`](types.md#verificationentriesallof)

Verification structure for entry/entries. Structure must be in prefect
equilibrium to verify successfully.

#### Defined in

[types/VerificationEntries.ts:31](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/VerificationEntries.ts#L31)

___

### VerificationEntriesAllOf

Ƭ **VerificationEntriesAllOf**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `allEntries` | [`Entry`](types.md#entry)[] |
| `allEntriesMht` | `Buffer` |
| `type` | ``"all-of"`` |

#### Defined in

[types/VerificationEntries.ts:18](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/VerificationEntries.ts#L18)

___

### VerificationEntriesOneOf

Ƭ **VerificationEntriesOneOf**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `allEntriesCount` | `number` |
| `allEntriesMht` | `Buffer` |
| `entry` | [`Entry`](types.md#entry) |
| `entryId` | `number` |
| `entryInclusionProof` | `Buffer`[] |
| `type` | ``"one-of"`` |

#### Defined in

[types/VerificationEntries.ts:8](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/VerificationEntries.ts#L8)

___

### VerificationTx

Ƭ **VerificationTx**: [`VerificationTxInclusion`](types.md#verificationtxinclusion) \| [`VerificationTxIsExtending`](types.md#verificationtxisextending) \| [`VerificationTxEquality`](types.md#verificationtxequality)

#### Defined in

[types/VerificationTx.ts:8](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/VerificationTx.ts#L8)

___

### VerificationTxEquality

Ƭ **VerificationTxEquality**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `refHash` | [`TxHash`](types.md#txhash) |
| `tx` | [`TxCore`](types.md#txcore) |
| `txPrevTxInRefPrevTxesMht` | `Buffer`[] |
| `type` | ``"tx-is-ref"`` |

#### Defined in

[types/VerificationTx.ts:32](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/VerificationTx.ts#L32)

___

### VerificationTxInclusion

Ƭ **VerificationTxInclusion**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ref` | [`TxCore`](types.md#txcore) |
| `refHash` | [`TxHash`](types.md#txhash) |
| `refPrevTxInRefPrevTxesMht` | `Buffer`[] |
| `tx` | [`TxCore`](types.md#txcore) |
| `txPrevInRefPrevTxesMht` | `Buffer`[] |
| `type` | ``"tx-prev-in-ref-prev"`` |

#### Defined in

[types/VerificationTx.ts:14](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/VerificationTx.ts#L14)

___

### VerificationTxIsExtending

Ƭ **VerificationTxIsExtending**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ref` | [`TxCore`](types.md#txcore) |
| `refHash` | [`TxHash`](types.md#txhash) |
| `refPrevTxInRefPrevTxesMhtAndTxPrevTxesMht` | `Buffer`[] |
| `tx` | [`TxCore`](types.md#txcore) |
| `txPrevTxInTxPrevTxesMht` | `Buffer`[] |
| `type` | ``"ref-prev-in-tx-prev"`` |

#### Defined in

[types/VerificationTx.ts:23](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/VerificationTx.ts#L23)

___

### VerificationTxType

Ƭ **VerificationTxType**: [`VerificationTx`](types.md#verificationtx)[``"type"``]

#### Defined in

[types/VerificationTx.ts:39](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/VerificationTx.ts#L39)

___

### ZSetEntry

Ƭ **ZSetEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `meta?` | [`EntryMetadata`](types.md#entrymetadata) |
| `referredAtTxId` | `Long` |
| `referredKey` | `Buffer` |
| `referredKeyScore` | `number` |
| `type` | ``"zSet"`` |
| `version` | ``"1"`` |
| `zSet` | `Buffer` |

#### Defined in

[types/Entry.ts:53](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/Entry.ts#L53)

___

### ZSetTxEntry

Ƭ **ZSetTxEntry**: [`TxContext`](types.md#txcontext) & [`ZSetEntry`](types.md#zsetentry)

#### Defined in

[types/TxEntry.ts:43](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/types/TxEntry.ts#L43)
