[immudb-node](../README.md) / [Exports](../modules.md) / types/A

# Module: types/A

## Table of contents

### Type Aliases

- [BinEntry](types_A.md#binentry)
- [BinTxEntry](types_A.md#bintxentry)
- [Entry](types_A.md#entry)
- [EntryMetadata](types_A.md#entrymetadata)
- [IndexerInfo](types_A.md#indexerinfo)
- [KeyValMeta](types_A.md#keyvalmeta)
- [LeafEntry](types_A.md#leafentry)
- [LeafTxEntry](types_A.md#leaftxentry)
- [Provable](types_A.md#provable)
- [ProvableTx](types_A.md#provabletx)
- [RefEntry](types_A.md#refentry)
- [RefTxEntry](types_A.md#reftxentry)
- [SqlColumnEntry](types_A.md#sqlcolumnentry)
- [SqlColumnTxEntry](types_A.md#sqlcolumntxentry)
- [SqlDbEntry](types_A.md#sqldbentry)
- [SqlDbTxEntry](types_A.md#sqldbtxentry)
- [SqlEntry](types_A.md#sqlentry)
- [SqlIndexColumn](types_A.md#sqlindexcolumn)
- [SqlIndexEntry](types_A.md#sqlindexentry)
- [SqlIndexTxEntry](types_A.md#sqlindextxentry)
- [SqlRowColumn](types_A.md#sqlrowcolumn)
- [SqlRowEntry](types_A.md#sqlrowentry)
- [SqlRowTxEntry](types_A.md#sqlrowtxentry)
- [SqlTableEntry](types_A.md#sqltableentry)
- [SqlTableTxEntry](types_A.md#sqltabletxentry)
- [SqlTxEntry](types_A.md#sqltxentry)
- [Transaction](types_A.md#transaction)
- [Tx](types_A.md#tx)
- [TxAnonymous](types_A.md#txanonymous)
- [TxContext](types_A.md#txcontext)
- [TxCore](types_A.md#txcore)
- [TxEntriesComputed](types_A.md#txentriescomputed)
- [TxEntry](types_A.md#txentry)
- [TxFull](types_A.md#txfull)
- [TxFullComputed](types_A.md#txfullcomputed)
- [TxHash](types_A.md#txhash)
- [TxSome](types_A.md#txsome)
- [ValEntry](types_A.md#valentry)
- [ValTxEntry](types_A.md#valtxentry)
- [Verification](types_A.md#verification)
- [VerificationEntries](types_A.md#verificationentries)
- [VerificationEntriesAllOf](types_A.md#verificationentriesallof)
- [VerificationEntriesOneOf](types_A.md#verificationentriesoneof)
- [VerificationTx](types_A.md#verificationtx)
- [VerificationTxEquality](types_A.md#verificationtxequality)
- [VerificationTxInclusion](types_A.md#verificationtxinclusion)
- [VerificationTxIsExtending](types_A.md#verificationtxisextending)
- [VerificationTxType](types_A.md#verificationtxtype)
- [ZSetEntry](types_A.md#zsetentry)
- [ZSetTxEntry](types_A.md#zsettxentry)

## Type Aliases

### BinEntry

?? **BinEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `meta?` | [`EntryMetadata`](types_A.md#entrymetadata) |
| `prefixedKey` | `Buffer` |
| `prefixedVal` | `Buffer` |
| `type` | ``"bin"`` |
| `version` | ``"1"`` |

#### Defined in

[immudb-node/src/types/A.ts:48](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L48)

___

### BinTxEntry

?? **BinTxEntry**: [`TxContext`](types_A.md#txcontext) & [`BinEntry`](types_A.md#binentry)

#### Defined in

[immudb-node/src/types/A.ts:221](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L221)

___

### Entry

?? **Entry**: [`BinEntry`](types_A.md#binentry) \| [`LeafEntry`](types_A.md#leafentry) \| [`ValEntry`](types_A.md#valentry) \| [`RefEntry`](types_A.md#refentry) \| [`ZSetEntry`](types_A.md#zsetentry) \| [`SqlEntry`](types_A.md#sqlentry)

ImmuDb entry, one of:
- binary entry - [BinEntry](types_A.md#binentry),
- hash entry - [LeafEntry](types_A.md#leafentry),
- value entry - [ValEntry](types_A.md#valentry),
- reference entry - [RefEntry](types_A.md#refentry),
- z-Set entry - [ZSetEntry](types_A.md#zsetentry),
- sql entry - [SqlEntry](types_A.md#sqlentry),

#### Defined in

[immudb-node/src/types/A.ts:188](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L188)

___

### EntryMetadata

?? **EntryMetadata**: `Object`

Structure influencing ImmuDb Indexer behaviour for
indexing [Entry](types_A.md#entry)'ies.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `deleted?` | `boolean` | If set to `true` key value will be marked as deleted.    Get key will not return value ok key value marked as deleted. |
| `expiresAt?` | `Long` | If set and ImmuDb server time is after, this key value will be marked as expired  when queried. Latest key value may than return other value. |
| `nonIndexable?` | `boolean` | If set to `true` key value will be marked as non indexable and  skipped by ImuuDb indexer. Effectively this would mean that if this  key value was set with this property, and we ask for latest key,  returned value will be not of this key value but of last indexed. |

#### Defined in

[immudb-node/src/types/A.ts:12](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L12)

___

### IndexerInfo

?? **IndexerInfo**: `Object`

Entry and additional informations from ImmuDb server indexer.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `expired?` | `boolean` | Entry indexer context - is entry expired?    If `true` than entry metadata expiresAt |
| `revision` | `Long` | Entry indexer context - entry revision.    (Assuming that for same key (different) values was set  multiple times, `revision` number is sequence number of  set operation.) |

#### Defined in

[immudb-node/src/types/A.ts:250](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L250)

___

### KeyValMeta

?? **KeyValMeta**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `Buffer` |
| `meta?` | [`EntryMetadata`](types_A.md#entrymetadata) |
| `val` | `Buffer` |

#### Defined in

[immudb-node/src/types/A.ts:34](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L34)

___

### LeafEntry

?? **LeafEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `meta?` | [`EntryMetadata`](types_A.md#entrymetadata) |
| `prefixedKey` | `Buffer` |
| `prefixedValHash` | `Buffer` |
| `type` | ``"hash"`` |
| `version` | ``"1"`` |

#### Defined in

[immudb-node/src/types/A.ts:57](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L57)

___

### LeafTxEntry

?? **LeafTxEntry**: [`TxContext`](types_A.md#txcontext) & [`LeafEntry`](types_A.md#leafentry)

#### Defined in

[immudb-node/src/types/A.ts:222](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L222)

___

### Provable

?? **Provable**: [`ProvableTx`](types_A.md#provabletx) \| [`ProvableTx`](types_A.md#provabletx)[] \| [`TxEntry`](types_A.md#txentry) \| [`TxEntry`](types_A.md#txentry)[]

ImmuDb can prove what has been set in what transaction, this implies that any
number of transaction can be verified.

As transaction ([Tx](types_A.md#tx)) can contain entries (of type [Entry](types_A.md#entry)), any
entry in context of transaction can be proved.

As list of transaction also can be proved, whole database composed of entries
(of type [Entry](types_A.md#entry)) within transactions can also be proved.

#### Defined in

[immudb-node/src/types/A.ts:581](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L581)

___

### ProvableTx

?? **ProvableTx**: `Object`

Structure represetning fundamental data which existance in ImmuDb can be
verified.

Minimal required data is transaction id Verifiable.id, because it
uniqly identifies transaction [TxAnonymous](types_A.md#txanonymous), which is an atom of
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
| `entries?` | [`Entry`](types_A.md#entry)[] |
| `id` | `Long` |
| `prevTxHash?` | `Buffer` |
| `prevTxesMht?` | `Buffer` |
| `timestamp?` | `Long` |
| `txHash?` | `Buffer` |

#### Defined in

[immudb-node/src/types/A.ts:559](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L559)

___

### RefEntry

?? **RefEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `Buffer` |
| `meta?` | [`EntryMetadata`](types_A.md#entrymetadata) |
| `referredAtTxId` | `Long` |
| `referredKey` | `Buffer` |
| `type` | ``"ref"`` |
| `version` | ``"1"`` |

#### Defined in

[immudb-node/src/types/A.ts:75](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L75)

___

### RefTxEntry

?? **RefTxEntry**: [`TxContext`](types_A.md#txcontext) & [`RefEntry`](types_A.md#refentry)

#### Defined in

[immudb-node/src/types/A.ts:224](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L224)

___

### SqlColumnEntry

?? **SqlColumnEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `columnIsAutoIncr` | `boolean` |
| `columnIsNullable` | `boolean` |
| `columnMaxLength` | `number` |
| `columnName` | `string` |
| `columnType` | `string` |
| `dbId` | `number` |
| `meta?` | [`EntryMetadata`](types_A.md#entrymetadata) |
| `sqlType` | ``"column"`` |
| `tableId` | `number` |
| `type` | ``"sql"`` |
| `version` | ``"1"`` |

#### Defined in

[immudb-node/src/types/A.ts:112](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L112)

___

### SqlColumnTxEntry

?? **SqlColumnTxEntry**: [`TxContext`](types_A.md#txcontext) & [`SqlColumnEntry`](types_A.md#sqlcolumnentry)

#### Defined in

[immudb-node/src/types/A.ts:228](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L228)

___

### SqlDbEntry

?? **SqlDbEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dbId` | `number` |
| `dbName` | `string` |
| `meta?` | [`EntryMetadata`](types_A.md#entrymetadata) |
| `sqlType` | ``"db"`` |
| `type` | ``"sql"`` |
| `version` | ``"1"`` |

#### Defined in

[immudb-node/src/types/A.ts:153](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L153)

___

### SqlDbTxEntry

?? **SqlDbTxEntry**: [`TxContext`](types_A.md#txcontext) & [`SqlDbEntry`](types_A.md#sqldbentry)

#### Defined in

[immudb-node/src/types/A.ts:231](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L231)

___

### SqlEntry

?? **SqlEntry**: [`SqlRowEntry`](types_A.md#sqlrowentry) \| [`SqlColumnEntry`](types_A.md#sqlcolumnentry) \| [`SqlIndexEntry`](types_A.md#sqlindexentry) \| [`SqlTableEntry`](types_A.md#sqltableentry) \| [`SqlDbEntry`](types_A.md#sqldbentry)

ImmuDb sql entry, one of:
- row entry - [SqlRowEntry](types_A.md#sqlrowentry),
- column entry - [SqlColumnEntry](types_A.md#sqlcolumnentry),
- index entry - [SqlIndexEntry](types_A.md#sqlindexentry),
- table entry - [SqlTableEntry](types_A.md#sqltableentry),
- database entry - [SqlDbEntry](types_A.md#sqldbentry).

#### Defined in

[immudb-node/src/types/A.ts:171](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L171)

___

### SqlIndexColumn

?? **SqlIndexColumn**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ascDesc` | `number` |
| `id` | `number` |

#### Defined in

[immudb-node/src/types/A.ts:138](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L138)

___

### SqlIndexEntry

?? **SqlIndexEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `columns` | [`SqlIndexColumn`](types_A.md#sqlindexcolumn)[] |
| `dbId` | `number` |
| `indexId` | `number` |
| `indexIsPrimary` | `number` |
| `meta?` | [`EntryMetadata`](types_A.md#entrymetadata) |
| `sqlType` | ``"index"`` |
| `tableId` | `number` |
| `type` | ``"sql"`` |
| `version` | ``"1"`` |

#### Defined in

[immudb-node/src/types/A.ts:126](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L126)

___

### SqlIndexTxEntry

?? **SqlIndexTxEntry**: [`TxContext`](types_A.md#txcontext) & [`SqlIndexEntry`](types_A.md#sqlindexentry)

#### Defined in

[immudb-node/src/types/A.ts:229](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L229)

___

### SqlRowColumn

?? **SqlRowColumn**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bin` | `Buffer` |
| `id` | `number` |

#### Defined in

[immudb-node/src/types/A.ts:107](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L107)

___

### SqlRowEntry

?? **SqlRowEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `columnsValues` | [`SqlRowColumn`](types_A.md#sqlrowcolumn)[] |
| `dbId` | `number` |
| `meta?` | [`EntryMetadata`](types_A.md#entrymetadata) |
| `pk` | `Buffer` |
| `sqlType` | ``"row"`` |
| `tableId` | `number` |
| `type` | ``"sql"`` |
| `version` | ``"1"`` |

#### Defined in

[immudb-node/src/types/A.ts:96](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L96)

___

### SqlRowTxEntry

?? **SqlRowTxEntry**: [`TxContext`](types_A.md#txcontext) & [`SqlRowEntry`](types_A.md#sqlrowentry)

#### Defined in

[immudb-node/src/types/A.ts:227](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L227)

___

### SqlTableEntry

?? **SqlTableEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dbId` | `number` |
| `meta?` | [`EntryMetadata`](types_A.md#entrymetadata) |
| `sqlType` | ``"table"`` |
| `tableId` | `number` |
| `tableName` | `string` |
| `type` | ``"sql"`` |
| `version` | ``"1"`` |

#### Defined in

[immudb-node/src/types/A.ts:143](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L143)

___

### SqlTableTxEntry

?? **SqlTableTxEntry**: [`TxContext`](types_A.md#txcontext) & [`SqlTableEntry`](types_A.md#sqltableentry)

#### Defined in

[immudb-node/src/types/A.ts:230](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L230)

___

### SqlTxEntry

?? **SqlTxEntry**: [`SqlRowTxEntry`](types_A.md#sqlrowtxentry) \| [`SqlColumnTxEntry`](types_A.md#sqlcolumntxentry) \| [`SqlIndexTxEntry`](types_A.md#sqlindextxentry) \| [`SqlTableTxEntry`](types_A.md#sqltabletxentry) \| [`SqlDbTxEntry`](types_A.md#sqldbtxentry)

#### Defined in

[immudb-node/src/types/A.ts:212](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L212)

___

### Transaction

?? **Transaction**: `Object`

Logical transaction with omitted filds connected to verification,
composed from [TxCore](types_A.md#txcore) and [Entry](types_A.md#entry)

#### Type declaration

| Name | Type |
| :------ | :------ |
| `entries` | [`Entry`](types_A.md#entry)[] |
| `id` | `Long` |
| `timestamp` | `Long` |

#### Defined in

[immudb-node/src/types/A.ts:591](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L591)

___

### Tx

?? **Tx**: [`TxAnonymous`](types_A.md#txanonymous) \| [`TxFull`](types_A.md#txfull) \| [`TxHash`](types_A.md#txhash)

Head-tail recursive (by hash) structure encoding logical transaction
and all transactions before it.

Entries of transaction can be specified (see TxType): 
- fully, 
- partially,
- or not at all.

#### Defined in

[immudb-node/src/types/A.ts:363](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L363)

___

### TxAnonymous

?? **TxAnonymous**: `Object`

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
| `txType` | ``"anonymous"`` | - |
| `type` | ``"tx"`` | - |
| `version` | ``"1"`` | Transaction structure version. |

#### Defined in

[immudb-node/src/types/A.ts:374](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L374)

___

### TxContext

?? **TxContext**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `entryId?` | `Long` |
| `id` | `Long` |

#### Defined in

[immudb-node/src/types/A.ts:197](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L197)

___

### TxCore

?? **TxCore**: `Object`

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

[immudb-node/src/types/A.ts:308](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L308)

___

### TxEntriesComputed

?? **TxEntriesComputed**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `allEntriesCount` | `number` | Count of all entries set during this transaction. |
| `allEntriesMht` | `Buffer` | Merkle Hash of all entries set during this transaction. |

#### Defined in

[immudb-node/src/types/A.ts:508](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L508)

___

### TxEntry

?? **TxEntry**: [`BinTxEntry`](types_A.md#bintxentry) \| [`LeafTxEntry`](types_A.md#leaftxentry) \| [`ValTxEntry`](types_A.md#valtxentry) \| [`RefTxEntry`](types_A.md#reftxentry) \| [`ZSetTxEntry`](types_A.md#zsettxentry) \| [`SqlTxEntry`](types_A.md#sqltxentry)

#### Defined in

[immudb-node/src/types/A.ts:203](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L203)

___

### TxFull

?? **TxFull**: `Object`

Transaction with all entries specified.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `allEntries` | [`Entry`](types_A.md#entry)[] | All transaction entries. **Order matters**. |
| `allEntriesCount` | `number` | Count of all entries set during this transaction. |
| `allEntriesMht` | `Buffer` | Merkle Hash of all entries set during this transaction. |
| `id` | `Long` | Transaction sequence number. First transaction  have sequence number `1`. |
| `prevTxHash` | `Buffer` | Hash of contained transaction, effectively  this means that transaction contain all  other (database) transactions.     What is start transaction? |
| `prevTxesMht` | `Buffer` | Merkle Hash of list of all contained transactions (sha256) hashes  (up to this transaction but not including). |
| `timestamp` | `Long` | When transaction happened. |
| `txType` | ``"full"`` | - |
| `type` | ``"tx"`` | - |
| `version` | ``"1"`` | Transaction structure version. |

#### Defined in

[immudb-node/src/types/A.ts:417](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L417)

___

### TxFullComputed

?? **TxFullComputed**: [`TxFull`](types_A.md#txfull) & [`TxEntriesComputed`](types_A.md#txentriescomputed)

#### Defined in

[immudb-node/src/types/A.ts:519](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L519)

___

### TxHash

?? **TxHash**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `Long` | Transaction sequence number. First transaction  have sequence number `1`. |
| `txHash` | `Buffer` | Hash of transaction. |
| `type` | ``"tx-hash"`` | - |
| `version` | ``"1"`` | Transaction structure version. |

#### Defined in

[immudb-node/src/types/A.ts:286](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L286)

___

### TxSome

?? **TxSome**: `Object`

Transaction with all entries specified.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `allEntriesCount` | `number` | Count of all entries set during this transaction. |
| `allEntriesMht` | `Buffer` | Merkle Hash of all entries set during this transaction. |
| `id` | `Long` | Transaction sequence number. First transaction  have sequence number `1`. |
| `prevTxHash` | `Buffer` | Hash of contained transaction, effectively  this means that transaction contain all  other (database) transactions.     What is start transaction? |
| `prevTxesMht` | `Buffer` | Merkle Hash of list of all contained transactions (sha256) hashes  (up to this transaction but not including). |
| `someEntries` | [`Entry`](types_A.md#entry)[] | All transaction entries. **Order matters**. |
| `timestamp` | `Long` | When transaction happened. |
| `txType` | ``"some"`` | - |
| `type` | ``"tx"`` | - |
| `version` | ``"1"`` | Transaction structure version. |

#### Defined in

[immudb-node/src/types/A.ts:463](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L463)

___

### ValEntry

?? **ValEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `Buffer` |
| `meta?` | [`EntryMetadata`](types_A.md#entrymetadata) |
| `type` | ``"val"`` |
| `val` | `Buffer` |
| `version` | ``"1"`` |

#### Defined in

[immudb-node/src/types/A.ts:66](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L66)

___

### ValTxEntry

?? **ValTxEntry**: [`TxContext`](types_A.md#txcontext) & [`ValEntry`](types_A.md#valentry)

#### Defined in

[immudb-node/src/types/A.ts:223](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L223)

___

### Verification

?? **Verification**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `entries` | [`VerificationEntries`](types_A.md#verificationentries) |
| `tx` | [`VerificationTx`](types_A.md#verificationtx) |

#### Defined in

[immudb-node/src/types/A.ts:679](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L679)

___

### VerificationEntries

?? **VerificationEntries**: [`VerificationEntriesOneOf`](types_A.md#verificationentriesoneof) \| [`VerificationEntriesAllOf`](types_A.md#verificationentriesallof)

Verification structure for entry/entries. Structure must be in prefect
equilibrium to verify successfully.

#### Defined in

[immudb-node/src/types/A.ts:633](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L633)

___

### VerificationEntriesAllOf

?? **VerificationEntriesAllOf**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `allEntries` | [`Entry`](types_A.md#entry)[] |
| `allEntriesMht` | `Buffer` |
| `type` | ``"all-of"`` |

#### Defined in

[immudb-node/src/types/A.ts:620](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L620)

___

### VerificationEntriesOneOf

?? **VerificationEntriesOneOf**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `allEntriesCount` | `number` |
| `allEntriesMht` | `Buffer` |
| `entry` | [`Entry`](types_A.md#entry) |
| `entryId` | `number` |
| `entryInclusionProof` | `Buffer`[] |
| `type` | ``"one-of"`` |

#### Defined in

[immudb-node/src/types/A.ts:610](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L610)

___

### VerificationTx

?? **VerificationTx**: [`VerificationTxInclusion`](types_A.md#verificationtxinclusion) \| [`VerificationTxIsExtending`](types_A.md#verificationtxisextending) \| [`VerificationTxEquality`](types_A.md#verificationtxequality)

#### Defined in

[immudb-node/src/types/A.ts:646](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L646)

___

### VerificationTxEquality

?? **VerificationTxEquality**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `refHash` | [`TxHash`](types_A.md#txhash) |
| `tx` | [`TxCore`](types_A.md#txcore) |
| `txPrevTxInRefPrevTxesMht` | `Buffer`[] |
| `type` | ``"tx-is-ref"`` |

#### Defined in

[immudb-node/src/types/A.ts:670](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L670)

___

### VerificationTxInclusion

?? **VerificationTxInclusion**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ref` | [`TxCore`](types_A.md#txcore) |
| `refHash` | [`TxHash`](types_A.md#txhash) |
| `refPrevTxInRefPrevTxesMht` | `Buffer`[] |
| `tx` | [`TxCore`](types_A.md#txcore) |
| `txPrevInRefPrevTxesMht` | `Buffer`[] |
| `type` | ``"tx-prev-in-ref-prev"`` |

#### Defined in

[immudb-node/src/types/A.ts:652](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L652)

___

### VerificationTxIsExtending

?? **VerificationTxIsExtending**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ref` | [`TxCore`](types_A.md#txcore) |
| `refHash` | [`TxHash`](types_A.md#txhash) |
| `refPrevTxInRefPrevTxesMhtAndTxPrevTxesMht` | `Buffer`[] |
| `tx` | [`TxCore`](types_A.md#txcore) |
| `txPrevTxInTxPrevTxesMht` | `Buffer`[] |
| `type` | ``"ref-prev-in-tx-prev"`` |

#### Defined in

[immudb-node/src/types/A.ts:661](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L661)

___

### VerificationTxType

?? **VerificationTxType**: [`VerificationTx`](types_A.md#verificationtx)[``"type"``]

#### Defined in

[immudb-node/src/types/A.ts:677](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L677)

___

### ZSetEntry

?? **ZSetEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `meta?` | [`EntryMetadata`](types_A.md#entrymetadata) |
| `referredAtTxId` | `Long` |
| `referredKey` | `Buffer` |
| `referredKeyScore` | `number` |
| `type` | ``"zSet"`` |
| `version` | ``"1"`` |
| `zSet` | `Buffer` |

#### Defined in

[immudb-node/src/types/A.ts:85](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L85)

___

### ZSetTxEntry

?? **ZSetTxEntry**: [`TxContext`](types_A.md#txcontext) & [`ZSetEntry`](types_A.md#zsetentry)

#### Defined in

[immudb-node/src/types/A.ts:225](https://github.com/user3232/node-immu-db/blob/30c0d74/immudb-node/src/types/A.ts#L225)
