[immudb-node](../README.md) / [Exports](../modules.md) / stream

# Namespace: stream

## Table of contents

### Type Aliases

- [ExecEntryRequest](stream.md#execentryrequest)
- [KVEntryRequest](stream.md#kventryrequest)
- [ZEntryRequest](stream.md#zentryrequest)

### Variables

- [defaultChunkSize](stream.md#defaultchunksize)
- [maxTxValueLen](stream.md#maxtxvaluelen)
- [minChunkSize](stream.md#minchunksize)

### Functions

- [fromExecEntries](stream.md#fromexecentries)
- [fromExecEntriesGen](stream.md#fromexecentriesgen)
- [fromExecEntry](stream.md#fromexecentry)
- [fromExecEntryType](stream.md#fromexecentrytype)
- [fromKVEntries](stream.md#fromkventries)
- [fromKVEntry](stream.md#fromkventry)
- [toKVEntries](stream.md#tokventries)
- [toKVEntry](stream.md#tokventry)
- [toKVEntryAndProof](stream.md#tokventryandproof)
- [toKVEntryOpt](stream.md#tokventryopt)
- [toZEntries](stream.md#tozentries)
- [toZEntry](stream.md#tozentry)

## Type Aliases

### ExecEntryRequest

Ƭ **ExecEntryRequest**: { `entry`: [`KVEntryRequest`](stream.md#kventryrequest) ; `type`: ``"kv"``  } \| { `entry`: [`ZEntryRequest`](stream.md#zentryrequest) ; `type`: ``"zAdd"``  }

#### Defined in

[immu-stream-kv/execEntry.ts:47](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-stream-kv/execEntry.ts#L47)

___

### KVEntryRequest

Ƭ **KVEntryRequest**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `Buffer` |
| `val` | `Buffer` |

#### Defined in

[immu-stream-kv/execEntry.ts:42](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-stream-kv/execEntry.ts#L42)

___

### ZEntryRequest

Ƭ **ZEntryRequest**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `atTx?` | `Long` |
| `boundRef?` | `boolean` |
| `key` | `Buffer` |
| `noWait?` | `boolean` |
| `score` | `number` |
| `set` | `Buffer` |

#### Defined in

[immu-stream-kv/execEntry.ts:33](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-stream-kv/execEntry.ts#L33)

## Variables

### defaultChunkSize

• `Const` **defaultChunkSize**: `number`

#### Defined in

[immu-stream-kv/consts.ts:3](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-stream-kv/consts.ts#L3)

___

### maxTxValueLen

• `Const` **maxTxValueLen**: `number`

#### Defined in

[immu-stream-kv/consts.ts:5](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-stream-kv/consts.ts#L5)

___

### minChunkSize

• `Const` **minChunkSize**: `number` = `4096`

#### Defined in

[immu-stream-kv/consts.ts:4](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-stream-kv/consts.ts#L4)

## Functions

### fromExecEntries

▸ **fromExecEntries**(`entries`): `Buffer`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `entries` | [`ExecEntryRequest`](stream.md#execentryrequest)[] |

#### Returns

`Buffer`[]

#### Defined in

[immu-stream-kv/execEntry.ts:16](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-stream-kv/execEntry.ts#L16)

___

### fromExecEntriesGen

▸ **fromExecEntriesGen**(`entries`): `AsyncGenerator`<{ `content`: `Buffer` = entryBin }, `void`, `unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entries` | [`ExecEntryRequest`](stream.md#execentryrequest)[] |

#### Returns

`AsyncGenerator`<{ `content`: `Buffer` = entryBin }, `void`, `unknown`\>

#### Defined in

[immu-stream-kv/execEntry.ts:20](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-stream-kv/execEntry.ts#L20)

___

### fromExecEntry

▸ **fromExecEntry**(`entry`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entry` | [`ExecEntryRequest`](stream.md#execentryrequest) |

#### Returns

`Buffer`

#### Defined in

[immu-stream-kv/execEntry.ts:55](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-stream-kv/execEntry.ts#L55)

___

### fromExecEntryType

▸ **fromExecEntryType**(`type`): ``1`` \| ``2``

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"kv"`` \| ``"zAdd"`` |

#### Returns

``1`` \| ``2``

#### Defined in

[immu-stream-kv/execEntry.ts:7](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-stream-kv/execEntry.ts#L7)

___

### fromKVEntries

▸ **fromKVEntries**(`kvs`): `AsyncGenerator`<{ `content`: `Buffer`  }, `void`, `unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `kvs` | { `key`: `Buffer` ; `val`: `Buffer`  }[] |

#### Returns

`AsyncGenerator`<{ `content`: `Buffer`  }, `void`, `unknown`\>

#### Defined in

[immu-stream-kv/kvEntry.ts:23](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-stream-kv/kvEntry.ts#L23)

___

### fromKVEntry

▸ **fromKVEntry**(`props`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Object` |
| `props.key` | `Buffer` |
| `props.val` | `Buffer` |

#### Returns

`Buffer`

#### Defined in

[immu-stream-kv/kvEntry.ts:8](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-stream-kv/kvEntry.ts#L8)

___

### toKVEntries

▸ **toKVEntries**(`everything`): { `key`: `Buffer` ; `val`: `Buffer`  }[]

Deserializes key-values from list of buffers heaving
following structure:
- serie of:
  - key length - UInt64BE
  - key
  - value length - UInt64BE
  - value

#### Parameters

| Name | Type |
| :------ | :------ |
| `everything` | `Buffer` |

#### Returns

{ `key`: `Buffer` ; `val`: `Buffer`  }[]

#### Defined in

[immu-stream-kv/kvEntry.ts:82](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-stream-kv/kvEntry.ts#L82)

___

### toKVEntry

▸ **toKVEntry**(`everything`): `Object`

Deserializes key-value from list of buffers heaving
following structure:
- key length - UInt64BE
- key
- value length - UInt64BE
- value

#### Parameters

| Name | Type |
| :------ | :------ |
| `everything` | `Buffer` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `key` | `Buffer` |
| `val` | `Buffer` |

#### Defined in

[immu-stream-kv/kvEntry.ts:46](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-stream-kv/kvEntry.ts#L46)

___

### toKVEntryAndProof

▸ **toKVEntryAndProof**(`props`): `Object`

Deserializes key-value from list of buffers heaving
following structure:
- entry length - UInt64BE
- entry
- verifableTx length - UInt64BE
- verifableTx
- inclusionProof length - UInt64BE
- inclusionProof
- val/key length - UInt64BE
- val/key

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Buffer`[] |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `entry` | `Entry` |
| `inclusionProof` | `InclusionProof` |
| `verifiableTx` | `VerifiableTx` |

#### Defined in

[immu-stream-kv/kvEntryAndProof.ts:18](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-stream-kv/kvEntryAndProof.ts#L18)

___

### toKVEntryOpt

▸ **toKVEntryOpt**(`bufs`): `Object`

Deserializes key-value from list of buffers heaving
following structure:
- key length - UInt64BE
- key
- value length - UInt64BE
- value

#### Parameters

| Name | Type |
| :------ | :------ |
| `bufs` | `Iterator`<`Buffer`, `Buffer`, `undefined`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `key` | `Buffer` |
| `val` | `Buffer` |

#### Defined in

[immu-stream-kv/kvEntry.ts:104](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-stream-kv/kvEntry.ts#L104)

___

### toZEntries

▸ **toZEntries**(`everything`): { `refKey`: `Buffer` = refKey; `refKeySeenFromTxId`: `Long` = refKeyAtTxId; `referencedKeyVal`: `Buffer` = refVal; `score`: `number` = refKeyScore; `zSet`: `Buffer` = setKey }[]

Deserializes zEntries from list of buffers heaving
following structure:
- serie of:
  - setKey length - UInt64BE
  - setKey
  - refKey length - UInt64BE
  - refKey
  - refKeyScore length - UInt64BE
  - refKeyScore - DoubleBE
  - refKeyAtTxId length - UInt64BE
  - refKeyAtTxId - UInt64BE
  - refVal length - UInt64BE
  - refVal

#### Parameters

| Name | Type |
| :------ | :------ |
| `everything` | `Buffer` |

#### Returns

{ `refKey`: `Buffer` = refKey; `refKeySeenFromTxId`: `Long` = refKeyAtTxId; `referencedKeyVal`: `Buffer` = refVal; `score`: `number` = refKeyScore; `zSet`: `Buffer` = setKey }[]

#### Defined in

[immu-stream-kv/zEntry.ts:85](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-stream-kv/zEntry.ts#L85)

___

### toZEntry

▸ **toZEntry**(`everything`): `Object`

Deserializes zEntry from list of buffers heaving
following structure:
- setKey length - UInt64BE
- setKey
- refKey length - UInt64BE
- refKey
- refKeyScore length - UInt64BE
- refKeyScore - DoubleBE
- refKeyAtTxId length - UInt64BE
- refKeyAtTxId - UInt64BE
- refVal length - UInt64BE
- refVal

#### Parameters

| Name | Type |
| :------ | :------ |
| `everything` | `Buffer` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `refKey` | `Buffer` |
| `refKeySeenFromTxId` | `Long` |
| `referencedKeyVal` | `Buffer` |
| `score` | `number` |
| `zSet` | `Buffer` |

#### Defined in

[immu-stream-kv/zEntry.ts:20](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-stream-kv/zEntry.ts#L20)
