[immudb-node](../README.md) / [Exports](../modules.md) / Client

# Class: Client

## Table of contents

### Constructors

- [constructor](Client.md#constructor)

### Properties

- [callCredentials](Client.md#callcredentials)
- [conf](Client.md#conf)
- [immuGrpcApi](Client.md#immugrpcapi)
- [immuGrpcClient](Client.md#immugrpcclient)
- [sessionTokens](Client.md#sessiontokens)

### Methods

- [close](Client.md#close)
- [compactDbIndex](Client.md#compactdbindex)
- [createDb](Client.md#createdb)
- [createUser](Client.md#createuser)
- [deleteDb](Client.md#deletedb)
- [deleteUser](Client.md#deleteuser)
- [deleteValRef](Client.md#deletevalref)
- [executeSqlTx](Client.md#executesqltx)
- [exportTx](Client.md#exporttx)
- [flushDbIndex](Client.md#flushdbindex)
- [getCallCredentials](Client.md#getcallcredentials)
- [getDbCurrentState](Client.md#getdbcurrentstate)
- [getDbSettings](Client.md#getdbsettings)
- [getSessionTokens](Client.md#getsessiontokens)
- [getSqlRowEntryAndVerification](Client.md#getsqlrowentryandverification)
- [getTxAndVerification](Client.md#gettxandverification)
- [getTxGenericEntries](Client.md#gettxgenericentries)
- [getTxWithEntries](Client.md#gettxwithentries)
- [getValRef](Client.md#getvalref)
- [getValRefAndVerification](Client.md#getvalrefandverification)
- [getValRefStreaming](Client.md#getvalrefstreaming)
- [getValRefs](Client.md#getvalrefs)
- [keepAlive](Client.md#keepalive)
- [listDbs](Client.md#listdbs)
- [listUsers](Client.md#listusers)
- [loadDb](Client.md#loaddb)
- [replicateTx](Client.md#replicatetx)
- [scanDbEntries](Client.md#scandbentries)
- [scanHistory](Client.md#scanhistory)
- [scanHistoryStreaming](Client.md#scanhistorystreaming)
- [scanTxes](Client.md#scantxes)
- [scanValRefEntries](Client.md#scanvalrefentries)
- [scanValRefEntriesStreaming](Client.md#scanvalrefentriesstreaming)
- [scanZEntries](Client.md#scanzentries)
- [scanZEntriesStreaming](Client.md#scanzentriesstreaming)
- [setDbSettings](Client.md#setdbsettings)
- [setRefEntry](Client.md#setrefentry)
- [setRefEntryGetVerification](Client.md#setrefentrygetverification)
- [setUserDbPermissions](Client.md#setuserdbpermissions)
- [setUserPassword](Client.md#setuserpassword)
- [setValEntries](Client.md#setvalentries)
- [setValEntriesGetVerification](Client.md#setvalentriesgetverification)
- [setValEntriesStreaming](Client.md#setvalentriesstreaming)
- [setValRefZSetEntries](Client.md#setvalrefzsetentries)
- [setValZSetEntriesStreaming](Client.md#setvalzsetentriesstreaming)
- [setZSetEntry](Client.md#setzsetentry)
- [setZSetEntryGetVerification](Client.md#setzsetentrygetverification)
- [sqlExec](Client.md#sqlexec)
- [sqlQuery](Client.md#sqlquery)
- [sqlQueryTable](Client.md#sqlquerytable)
- [sqlQueryTables](Client.md#sqlquerytables)
- [unloadDb](Client.md#unloaddb)

## Constructors

### constructor

• **new Client**(`conf`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `conf` | `Config` |

#### Defined in

[immu-client.ts:115](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L115)

## Properties

### callCredentials

• `Private` `Optional` **callCredentials**: `CallCredentials`

#### Defined in

[immu-client.ts:113](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L113)

___

### conf

• `Private` `Readonly` **conf**: `Config`

#### Defined in

[immu-client.ts:109](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L109)

___

### immuGrpcApi

• `Private` `Readonly` **immuGrpcApi**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `closeSession` | (`props`: `CallCredentials`) => `Promise`<`void`\> |
| `compactDbIndex` | (`props`: { `credentials`: `CallCredentials`  }) => `Promise`<`void`\> |
| `createDb` | (`props`: `CreateDatabaseProps` & { `credentials`: `CallCredentials`  }) => `Promise`<{ `alreadyExisted`: `boolean` = resp.alreadyExisted; `database`: `string` = resp.name; `settings`: [`DatabaseSettings`](../modules/types.md#databasesettings)  }\> |
| `createUser` | (`props`: `CreateUsersProps` & { `credentials`: `CallCredentials`  }) => `Promise`<[`UserCredentials`](../modules/types.md#usercredentials) & [`DatabasePermission`](../modules/types.md#databasepermission)\> |
| `deleteDb` | (`props`: `DeleteDatabaseProps` & { `credentials`: `CallCredentials`  }) => `Promise`<`string`\> |
| `deleteValRef` | (`props`: `DeleteValRefProps` & { `credentials`: `CallCredentials`  }) => `Promise`<[`TxCore`](../modules/types.md#txcore)\> |
| `exportTx` | (`props`: `ExportTxProps` & { `credentials`: `CallCredentials`  }) => `AsyncGenerator`<`Chunk__Output`, `any`[], `unknown`\> |
| `flushDbIndex` | (`props`: `FlushDatabaseIndexProps` & { `credentials`: `CallCredentials`  }) => `Promise`<`string`\> |
| `getDbCurrentState` | (`props`: { `credentials`: `CallCredentials`  }) => `Promise`<{ `database`: `string` = resp.db; `signature`: `undefined` \| `Signature__Output` ; `txHash`: `Buffer` = resp.txHash; `txId`: `Long` = resp.txId }\> |
| `getDbSettings` | (`props`: { `credentials`: `CallCredentials`  }) => `Promise`<{ `database`: `string` = resp.database; `settings`: [`DatabaseSettings`](../modules/types.md#databasesettings)  }\> |
| `getSqlRowEntryAndVerification` | (`props`: `GetSqlRowEntryAndVerificationProps` & { `credentials`: `CallCredentials`  }) => `Promise`<{ `transaction`: [`Transaction`](../modules/types.md#transaction) ; `verification`: [`Verification`](../modules/types.md#verification)  }\> |
| `getTxAndVerification` | (`props`: `GetTxAndVerificationProps` & { `credentials`: `CallCredentials`  }) => `Promise`<{ `transaction`: [`Transaction`](../modules/types.md#transaction) ; `verification`: [`Verification`](../modules/types.md#verification)  }\> |
| `getTxGenericEntries` | (`props`: `GetTxGenericEntriesProps` & { `credentials`: `CallCredentials`  }) => `Promise`<[`TxEntry`](../modules/types.md#txentry)[]\> |
| `getTxWithEntries` | (`props`: `GetTxWithEntriesProps` & { `credentials`: `CallCredentials`  }) => `Promise`<`Tx__Output`\> |
| `getValRef` | (`props`: `GetValRefProps` & { `credentials`: `CallCredentials`  }) => `Promise`<{ `refTxEntry?`: [`TxContext`](../modules/types.md#txcontext) & [`RefEntry`](../modules/types.md#refentry) & [`IndexerInfo`](../modules/types.md#indexerinfo) ; `valTxEntry`: [`TxContext`](../modules/types.md#txcontext) & [`ValEntry`](../modules/types.md#valentry) & [`IndexerInfo`](../modules/types.md#indexerinfo)  }\> |
| `getValRefAndVerification` | (`props`: `GetValRefAndVerificationProps` & { `credentials`: `CallCredentials`  }) => `Promise`<{ `refEntry`: `undefined` \| [`TxContext`](../modules/types.md#txcontext) & [`RefEntry`](../modules/types.md#refentry) & [`IndexerInfo`](../modules/types.md#indexerinfo) = valEntryAndMaybeRefEntry.refTxEntry; `transaction`: [`Transaction`](../modules/types.md#transaction) ; `valEntry`: [`TxContext`](../modules/types.md#txcontext) & [`ValEntry`](../modules/types.md#valentry) & [`IndexerInfo`](../modules/types.md#indexerinfo) = valEntryAndMaybeRefEntry.valTxEntry; `verification`: [`Verification`](../modules/types.md#verification)  }\> |
| `getValRefStreaming` | (`props`: `GetValRefProps` & { `credentials`: `CallCredentials`  }) => `AsyncGenerator`<`Chunk__Output`, `any`[], `unknown`\> |
| `getValRefs` | (`props`: `GetAllValRefsProps` & { `credentials`: `CallCredentials`  }) => `Promise`<{ `refTxEntry?`: [`TxContext`](../modules/types.md#txcontext) & [`RefEntry`](../modules/types.md#refentry) & [`IndexerInfo`](../modules/types.md#indexerinfo) ; `valTxEntry`: [`TxContext`](../modules/types.md#txcontext) & [`ValEntry`](../modules/types.md#valentry) & [`IndexerInfo`](../modules/types.md#indexerinfo)  }[]\> |
| `keepAlive` | (`props`: { `credentials`: `CallCredentials`  }) => `Promise`<`void`\> |
| `listDbs` | (`props`: { `credentials`: `CallCredentials`  }) => `Promise`<[`DBRuntimeInfo`](../modules/types.md#dbruntimeinfo)[]\> |
| `listUsers` | (`props`: { `credentials`: `CallCredentials`  }) => `Promise`<[`UserInfo`](../modules/types.md#userinfo)[]\> |
| `loadDb` | (`props`: `LoadDbProps` & { `credentials`: `CallCredentials`  }) => `Promise`<`string`\> |
| `openSession` | (`sessionInfo`: [`UserDatabaseSession`](../modules/types.md#userdatabasesession)) => `Promise`<[`SessionTokens`](../modules/types.md#sessiontokens)\> |
| `replicateTx` | (`props`: `ReplicateTxProps` & { `credentials`: `CallCredentials`  }) => `Promise`<[`TxCore`](../modules/types.md#txcore)\> |
| `scanDbEntries` | (`props`: `ScanDBProps` & { `credentials`: `CallCredentials`  }) => `Promise`<[`TxEntry`](../modules/types.md#txentry)[]\> |
| `scanHistory` | (`props`: `GetHistoryProps` & { `credentials`: `CallCredentials`  }) => `Promise`<{ `refTxEntry?`: [`TxContext`](../modules/types.md#txcontext) & [`RefEntry`](../modules/types.md#refentry) & [`IndexerInfo`](../modules/types.md#indexerinfo) ; `valTxEntry`: [`TxContext`](../modules/types.md#txcontext) & [`ValEntry`](../modules/types.md#valentry) & [`IndexerInfo`](../modules/types.md#indexerinfo)  }[]\> |
| `scanHistoryStreaming` | (`props`: `GetHistoryProps` & { `credentials`: `CallCredentials`  }) => `AsyncGenerator`<`Chunk__Output`, `any`[], `unknown`\> |
| `scanTxes` | (`props`: `ScanTxesProps` & { `credentials`: `CallCredentials`  }) => `Promise`<`Tx__Output`[]\> |
| `scanValRefEntries` | (`props`: `ScanValRefEntriesProps` & { `credentials`: `CallCredentials`  }) => `Promise`<{ `refTxEntry?`: [`TxContext`](../modules/types.md#txcontext) & [`RefEntry`](../modules/types.md#refentry) & [`IndexerInfo`](../modules/types.md#indexerinfo) ; `valTxEntry`: [`TxContext`](../modules/types.md#txcontext) & [`ValEntry`](../modules/types.md#valentry) & [`IndexerInfo`](../modules/types.md#indexerinfo)  }[]\> |
| `scanValRefEntriesStreaming` | (`props`: `ScanValRefEntriesProps` & { `credentials`: `CallCredentials`  }) => `AsyncGenerator`<`Chunk__Output`, `any`[], `unknown`\> |
| `scanZEntries` | (`props`: `ScanZSetEntriesProps` & { `credentials`: `CallCredentials`  }) => `Promise`<{ `refTxEntry?`: [`RefTxEntry`](../modules/types.md#reftxentry) ; `valTxEntry`: [`ValTxEntry`](../modules/types.md#valtxentry) ; `zSetEntry`: [`ZSetEntry`](../modules/types.md#zsetentry)  }[]\> |
| `scanZEntriesStreaming` | (`props`: `ScanZSetEntriesProps` & { `credentials`: `CallCredentials`  }) => `AsyncGenerator`<`Chunk__Output`, `any`[], `unknown`\> |
| `setDbSettings` | (`props`: `SetDbSettingsProps` & { `credentials`: `CallCredentials`  }) => `Promise`<{ `database`: `string` = resp.database; `settings`: [`DatabaseSettings`](../modules/types.md#databasesettings)  }\> |
| `setRefEntry` | (`props`: `SetRefEntryProps` & { `credentials`: `CallCredentials`  }) => `Promise`<{ `ref`: [`RefTxEntry`](../modules/types.md#reftxentry) ; `txCore`: [`TxCore`](../modules/types.md#txcore)  }\> |
| `setRefEntryGetVerification` | (`props`: `SetRefEntryProps` & `ProofRequestProps` & { `credentials`: `CallCredentials`  }) => `Promise`<{ `refEntry`: [`RefEntry`](../modules/types.md#refentry) ; `transaction`: [`Transaction`](../modules/types.md#transaction) ; `verification`: [`Verification`](../modules/types.md#verification)  }\> |
| `setUserActive` | (`props`: `SetUserActiveProps` & { `credentials`: `CallCredentials`  }) => `Promise`<`SetUserActiveProps` & { `credentials`: `CallCredentials`  }\> |
| `setUserDbPermissions` | (`props`: `SetUserDbPermissionsProps` & { `credentials`: `CallCredentials`  }) => `Promise`<`SetUserDbPermissionsProps` & { `credentials`: `CallCredentials`  }\> |
| `setUserPassword` | (`props`: `SetUserPasswordProps` & { `credentials`: `CallCredentials`  }) => `Promise`<`string`\> |
| `setValEntries` | (`props`: `SetValEntryProps` & { `credentials`: `CallCredentials`  }) => `Promise`<{ `txCore`: [`TxCore`](../modules/types.md#txcore) ; `valEntries`: [`ValTxEntry`](../modules/types.md#valtxentry)[]  }\> |
| `setValEntriesGetVerification` | (`props`: `SetValEntryProps` & `ProofRequestProps` & { `credentials`: `CallCredentials`  }) => `Promise`<{ `transaction`: [`Transaction`](../modules/types.md#transaction) ; `verification`: [`Verification`](../modules/types.md#verification)  }\> |
| `setValEntriesStreaming` | (`props`: `SetValEntriesStreamingProps` & { `credentials`: `CallCredentials`  }) => `Promise`<[`TxCore`](../modules/types.md#txcore)\> |
| `setValRefZSetEntries` | (`props`: `SetEntryProps` & { `credentials`: `CallCredentials`  }) => `Promise`<{ `tx`: [`TxCore`](../modules/types.md#txcore) ; `txEntries`: ([`ValTxEntry`](../modules/types.md#valtxentry) \| [`RefTxEntry`](../modules/types.md#reftxentry) \| [`ZSetTxEntry`](../modules/types.md#zsettxentry))[]  }\> |
| `setValZSetEntriesStreaming` | (`props`: `SetEntriesStreamingProps` & { `credentials`: `CallCredentials`  }) => `Promise`<[`TxCore`](../modules/types.md#txcore)\> |
| `setZSetEntry` | (`props`: `SetZSetEntryProps` & { `credentials`: `CallCredentials`  }) => `Promise`<{ `tx`: [`TxCore`](../modules/types.md#txcore) ; `zSetTxEntry`: [`ZSetTxEntry`](../modules/types.md#zsettxentry)  }\> |
| `setZSetEntryGetVerification` | (`props`: `SetZSetEntryProps` & `ProofRequestProps` & { `credentials`: `CallCredentials`  }) => `Promise`<{ `transaction`: [`Transaction`](../modules/types.md#transaction) ; `verification`: [`Verification`](../modules/types.md#verification) ; `zSetEntry`: [`ZSetEntry`](../modules/types.md#zsetentry)  }\> |
| `sqlExec` | (`props`: `SqlExecProps` & { `credentials`: `CallCredentials`  }) => `Promise`<{ `isInTransaction`: `boolean` ; `subTxes`: { `firstPK`: [`SqlNamedValue`](../modules/types.md#sqlnamedvalue)[] ; `lastPK`: [`SqlNamedValue`](../modules/types.md#sqlnamedvalue)[] ; `tx`: `undefined` \| [`TxCore`](../modules/types.md#txcore) ; `updatedRowsCount`: `number`  }[]  }\> |
| `sqlQuery` | (`props`: `SqlQueryProps` & { `credentials`: `CallCredentials`  }) => `Promise`<[`SqlNamedValue`](../modules/types.md#sqlnamedvalue)[][]\> |
| `sqlQueryTable` | (`props`: `SqlQueryTableProps` & { `credentials`: `CallCredentials`  }) => `Promise`<[`SqlNamedValue`](../modules/types.md#sqlnamedvalue)[][]\> |
| `sqlQueryTables` | (`props`: { `credentials`: `CallCredentials`  }) => `Promise`<[`SqlNamedValue`](../modules/types.md#sqlnamedvalue)[][]\> |
| `sqlTxCommit` | (`props`: { `credentials`: `CallCredentials`  }) => `Promise`<{ `firstPK`: [`SqlNamedValue`](../modules/types.md#sqlnamedvalue)[] ; `lastPK`: [`SqlNamedValue`](../modules/types.md#sqlnamedvalue)[] ; `tx`: `undefined` \| [`TxCore`](../modules/types.md#txcore) ; `updatedRowsCount`: `number`  }\> |
| `sqlTxExec` | (`props`: `SqlTxExecProps` & { `credentials`: `CallCredentials`  }) => `Promise`<`void`\> |
| `sqlTxNew` | (`props`: `SqlTxNewProps` & { `credentials`: `CallCredentials`  }) => `Promise`<[`TransactionTokens`](../modules/types.md#transactiontokens)\> |
| `sqlTxQuery` | (`props`: `SqlTxQueryProps` & { `credentials`: `CallCredentials`  }) => `Promise`<[`SqlNamedValue`](../modules/types.md#sqlnamedvalue)[][]\> |
| `sqlTxRollback` | (`props`: { `credentials`: `CallCredentials`  }) => `Promise`<`void`\> |
| `unloadDb` | (`props`: `UnloadDbProps` & { `credentials`: `CallCredentials`  }) => `Promise`<`void`\> |
| `useDb` | (`props`: `UseDbProps` & { `credentials`: `CallCredentials`  }) => `Promise`<{ `database`: `string` = props.database; `token`: `string` = resp.token }\> |

#### Defined in

[immu-client.ts:111](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L111)

___

### immuGrpcClient

• `Private` `Readonly` **immuGrpcClient**: `ImmuServiceClient`

#### Defined in

[immu-client.ts:110](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L110)

___

### sessionTokens

• `Private` `Optional` **sessionTokens**: [`SessionTokens`](../modules/types.md#sessiontokens)

#### Defined in

[immu-client.ts:112](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L112)

## Methods

### close

▸ **close**(): `Promise`<`void`\>

Clears stored session tokens and credentials and closses session
with ImmuDb

#### Returns

`Promise`<`void`\>

#### Defined in

[immu-client.ts:179](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L179)

___

### compactDbIndex

▸ **compactDbIndex**(): `Promise`<`void`\>

Compacts current database index.

#### Returns

`Promise`<`void`\>

#### Defined in

[immu-client.ts:832](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L832)

___

### createDb

▸ **createDb**(`props`): `Promise`<{ `alreadyExisted`: `boolean` = resp.alreadyExisted; `database`: `string` = resp.name; `settings`: [`DatabaseSettings`](../modules/types.md#databasesettings)  }\>

Creates database as ImmuDb server.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `CreateDatabaseProps` |

#### Returns

`Promise`<{ `alreadyExisted`: `boolean` = resp.alreadyExisted; `database`: `string` = resp.name; `settings`: [`DatabaseSettings`](../modules/types.md#databasesettings)  }\>

#### Defined in

[immu-client.ts:782](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L782)

___

### createUser

▸ **createUser**(`props`): `Promise`<[`UserCredentials`](../modules/types.md#usercredentials) & [`DatabasePermission`](../modules/types.md#databasepermission)\>

Creates ImmuDb server user

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `CreateUsersProps` |

#### Returns

`Promise`<[`UserCredentials`](../modules/types.md#usercredentials) & [`DatabasePermission`](../modules/types.md#databasepermission)\>

#### Defined in

[immu-client.ts:721](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L721)

___

### deleteDb

▸ **deleteDb**(`props`): `Promise`<`string`\>

Deletes database as ImmuDb server.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `DeleteDatabaseProps` |

#### Returns

`Promise`<`string`\>

#### Defined in

[immu-client.ts:792](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L792)

___

### deleteUser

▸ **deleteUser**(`props`): `Promise`<`SetUserActiveProps` & { `credentials`: `CallCredentials`  }\>

Deletes (deactivates) ImmuDb server user, can also activate user.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SetUserActiveProps` |

#### Returns

`Promise`<`SetUserActiveProps` & { `credentials`: `CallCredentials`  }\>

#### Defined in

[immu-client.ts:731](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L731)

___

### deleteValRef

▸ **deleteValRef**(`props`): `Promise`<[`TxEntry`](../modules/types.md#txentry)[]\>

Deletes keys or references to keys in one transaction.

Key or reference to key **marked** as deleted will be ignored
by the indexer (e.g. [getValRef](Client.md#getvalref) method) seeing database
at this operation transaction and further transactions if key
will not be set once more.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `DeleteValRefProps` |

#### Returns

`Promise`<[`TxEntry`](../modules/types.md#txentry)[]\>

#### Defined in

[immu-client.ts:297](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L297)

___

### executeSqlTx

▸ **executeSqlTx**(`mode`, `run`): `Promise`<`SqlCommitRollback`\>

Executes interactive sql transaction. Transaction will be:
- commited if no errors will be thrown,
- rolled back if:
  - there are sql errors
  - user throws

Committing transaction example:

```ts

client.executeSqlTx(
    'ReadWrite', 
    async txApi => {
        const testTable = await txApi.query({sql: `
            select * from testtable;
        `})
        txApi.exec({sql: `
            insert into testtable 
                (id, value) 
            values 
                (1, 'yoyo');
        `})
    }
)

// testtable with inserted rows
console.log(await client.sqlQuery({sql: `
    select * from testtable;
`}))

```

Rolling back transaction example:

```ts

const txRes = await client.executeSqlTx(
    'ReadWrite', 
    async txApi => {
        const testTable = await txApi.query({sql: `
            select * from testtable;
        `})
        txApi.exec({sql: `
            insert into testtable 
                (id, value) 
            values 
                (1, 'yoyo');
        `})
        throw 'Changed my decision, don't update testtable'

        console.log('This will not be executed')
    }
)

console.log(txRes)
// Changed my decision, don't update testtable

// testtable without inserted rows
console.log(await client.sqlQuery({sql: `
    select * from testtable;
`}))

```

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | ``"ReadOnly"`` \| ``"WriteOnly"`` \| ``"ReadWrite"`` |
| `run` | (`txApi`: { `exec`: (`props`: `SqlTxExecProps`) => `Promise`<`void`\> ; `query`: (`props`: `SqlTxQueryProps`) => `Promise`<[`SqlNamedValue`](../modules/types.md#sqlnamedvalue)[][]\>  }) => `Promise`<`void`\> |

#### Returns

`Promise`<`SqlCommitRollback`\>

#### Defined in

[immu-client.ts:640](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L640)

___

### exportTx

▸ **exportTx**(`props`): `Promise`<`AsyncGenerator`<`Chunk__Output`, `any`[], `unknown`\>\>

Exports transaction.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ExportTxProps` |

#### Returns

`Promise`<`AsyncGenerator`<`Chunk__Output`, `any`[], `unknown`\>\>

#### Defined in

[immu-client.ts:901](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L901)

___

### flushDbIndex

▸ **flushDbIndex**(`props`): `Promise`<`string`\>

Flushes current database index.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `FlushDatabaseIndexProps` |

#### Returns

`Promise`<`string`\>

#### Defined in

[immu-client.ts:822](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L822)

___

### getCallCredentials

▸ `Private` **getCallCredentials**(): `Promise`<`CallCredentials`\>

Creates and caches session credentials.

#### Returns

`Promise`<`CallCredentials`\>

#### Defined in

[immu-client.ts:162](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L162)

___

### getDbCurrentState

▸ **getDbCurrentState**(): `Promise`<{ `database`: `string` = resp.db; `signature`: `undefined` \| `Signature__Output` ; `txHash`: `Buffer` = resp.txHash; `txId`: `Long` = resp.txId }\>

Gets current database state.

#### Returns

`Promise`<{ `database`: `string` = resp.db; `signature`: `undefined` \| `Signature__Output` ; `txHash`: `Buffer` = resp.txHash; `txId`: `Long` = resp.txId }\>

#### Defined in

[immu-client.ts:851](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L851)

___

### getDbSettings

▸ **getDbSettings**(): `Promise`<{ `database`: `string` = resp.database; `settings`: [`DatabaseSettings`](../modules/types.md#databasesettings)  }\>

Gets current database settings.

#### Returns

`Promise`<{ `database`: `string` = resp.database; `settings`: [`DatabaseSettings`](../modules/types.md#databasesettings)  }\>

#### Defined in

[immu-client.ts:860](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L860)

___

### getSessionTokens

▸ `Private` **getSessionTokens**(): `Promise`<[`SessionTokens`](../modules/types.md#sessiontokens)\>

Gets and caches session tokens.

#### Returns

`Promise`<[`SessionTokens`](../modules/types.md#sessiontokens)\>

#### Defined in

[immu-client.ts:150](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L150)

___

### getSqlRowEntryAndVerification

▸ **getSqlRowEntryAndVerification**(`props`): `Promise`<{ `transaction`: [`Transaction`](../modules/types.md#transaction) ; `verification`: [`Verification`](../modules/types.md#verification)  }\>

Gets SqlRowEntry and its verification structure by looking
for sql row primary key (which can be composite).

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `GetSqlRowEntryAndVerificationProps` |

#### Returns

`Promise`<{ `transaction`: [`Transaction`](../modules/types.md#transaction) ; `verification`: [`Verification`](../modules/types.md#verification)  }\>

#### Defined in

[immu-client.ts:935](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L935)

___

### getTxAndVerification

▸ **getTxAndVerification**(`props`): `Promise`<{ `transaction`: [`Transaction`](../modules/types.md#transaction) ; `verification`: [`Verification`](../modules/types.md#verification)  }\>

Gets Tx, its entries and its verification structure, by looking for
transaction id.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `GetTxAndVerificationProps` |

#### Returns

`Promise`<{ `transaction`: [`Transaction`](../modules/types.md#transaction) ; `verification`: [`Verification`](../modules/types.md#verification)  }\>

#### Defined in

[immu-client.ts:923](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L923)

___

### getTxGenericEntries

▸ **getTxGenericEntries**(`props`): `Promise`<[`TxEntry`](../modules/types.md#txentry)[]\>

Gets value, ref, zSet entries of transaction heaving specified id.
Obtained entries are verifiable.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `GetTxGenericEntriesProps` |

#### Returns

`Promise`<[`TxEntry`](../modules/types.md#txentry)[]\>

#### Defined in

[immu-client.ts:440](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L440)

___

### getTxWithEntries

▸ **getTxWithEntries**(`props`): `Promise`<`Tx__Output`\>

Scans database transaction entries.

Result is composed in following way:
- entries are filtered out for actions:
  - `EXCLUDE`,
- entries go ordered into `entries` array fild for actions:
  - `RAW_VALUE`,
  - `ONLY_DIGEST`,
  - `undefined`,
- KV entries go ordered into `kvEntries` array fild for
  `kvOrRefEntryAction` action:
  - `RESOLVE`,
- Z entries go ordered into `zEntries` array fild for `zEntryAction`
  action:
  - `RESOLVE`,

To obtain sequential entries ordering set all actions to:
- `RAW_VALUE` or
- `ONLY_DIGEST`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `GetTxWithEntriesProps` |

#### Returns

`Promise`<`Tx__Output`\>

#### Defined in

[immu-client.ts:429](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L429)

___

### getValRef

▸ **getValRef**(`props`): `Promise`<{ `refTxEntry?`: [`TxContext`](../modules/types.md#txcontext) & [`RefEntry`](../modules/types.md#refentry) & [`IndexerInfo`](../modules/types.md#indexerinfo) ; `valTxEntry`: [`TxContext`](../modules/types.md#txcontext) & [`ValEntry`](../modules/types.md#valentry) & [`IndexerInfo`](../modules/types.md#indexerinfo)  }\>

Gets value for provided key in one transaction. Key may refer to value or
reference.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `GetValRefProps` |

#### Returns

`Promise`<{ `refTxEntry?`: [`TxContext`](../modules/types.md#txcontext) & [`RefEntry`](../modules/types.md#refentry) & [`IndexerInfo`](../modules/types.md#indexerinfo) ; `valTxEntry`: [`TxContext`](../modules/types.md#txcontext) & [`ValEntry`](../modules/types.md#valentry) & [`IndexerInfo`](../modules/types.md#indexerinfo)  }\>

#### Defined in

[immu-client.ts:452](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L452)

___

### getValRefAndVerification

▸ **getValRefAndVerification**(`props`): `Promise`<{ `refEntry`: `undefined` \| [`TxContext`](../modules/types.md#txcontext) & [`RefEntry`](../modules/types.md#refentry) & [`IndexerInfo`](../modules/types.md#indexerinfo) = valEntryAndMaybeRefEntry.refTxEntry; `transaction`: [`Transaction`](../modules/types.md#transaction) ; `valEntry`: [`TxContext`](../modules/types.md#txcontext) & [`ValEntry`](../modules/types.md#valentry) & [`IndexerInfo`](../modules/types.md#indexerinfo) = valEntryAndMaybeRefEntry.valTxEntry; `verification`: [`Verification`](../modules/types.md#verification)  }\>

Gets ValEntry or RefEntry (and ref associated ValEntry) and its (val or
ref) verification structure by looking for ValEntry or RefEntry key.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `GetValRefAndVerificationProps` |

#### Returns

`Promise`<{ `refEntry`: `undefined` \| [`TxContext`](../modules/types.md#txcontext) & [`RefEntry`](../modules/types.md#refentry) & [`IndexerInfo`](../modules/types.md#indexerinfo) = valEntryAndMaybeRefEntry.refTxEntry; `transaction`: [`Transaction`](../modules/types.md#transaction) ; `valEntry`: [`TxContext`](../modules/types.md#txcontext) & [`ValEntry`](../modules/types.md#valentry) & [`IndexerInfo`](../modules/types.md#indexerinfo) = valEntryAndMaybeRefEntry.valTxEntry; `verification`: [`Verification`](../modules/types.md#verification)  }\>

#### Defined in

[immu-client.ts:947](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L947)

___

### getValRefStreaming

▸ **getValRefStreaming**(`props`): `Promise`<`AsyncGenerator`<`Chunk__Output`, `any`[], `unknown`\>\>

Gets value for provided key in one transaction. Key may refer to value or
reference.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `GetValRefProps` |

#### Returns

`Promise`<`AsyncGenerator`<`Chunk__Output`, `any`[], `unknown`\>\>

#### Defined in

[immu-client.ts:464](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L464)

___

### getValRefs

▸ **getValRefs**(`props`): `Promise`<{ `refTxEntry?`: [`TxContext`](../modules/types.md#txcontext) & [`RefEntry`](../modules/types.md#refentry) & [`IndexerInfo`](../modules/types.md#indexerinfo) ; `valTxEntry`: [`TxContext`](../modules/types.md#txcontext) & [`ValEntry`](../modules/types.md#valentry) & [`IndexerInfo`](../modules/types.md#indexerinfo)  }[]\>

Gets values and refs for all provided keys.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `GetAllValRefsProps` |

#### Returns

`Promise`<{ `refTxEntry?`: [`TxContext`](../modules/types.md#txcontext) & [`RefEntry`](../modules/types.md#refentry) & [`IndexerInfo`](../modules/types.md#indexerinfo) ; `valTxEntry`: [`TxContext`](../modules/types.md#txcontext) & [`ValEntry`](../modules/types.md#valentry) & [`IndexerInfo`](../modules/types.md#indexerinfo)  }[]\>

#### Defined in

[immu-client.ts:474](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L474)

___

### keepAlive

▸ **keepAlive**(): `Promise`<`void`\>

Asks ImmuDb to not close (idle?) connection.

#### Returns

`Promise`<`void`\>

#### Defined in

[immu-client.ts:188](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L188)

___

### listDbs

▸ **listDbs**(): `Promise`<[`DBRuntimeInfo`](../modules/types.md#dbruntimeinfo)[]\>

Lists all ImmuDb server databases.

#### Returns

`Promise`<[`DBRuntimeInfo`](../modules/types.md#dbruntimeinfo)[]\>

#### Defined in

[immu-client.ts:842](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L842)

___

### listUsers

▸ **listUsers**(): `Promise`<[`UserInfo`](../modules/types.md#userinfo)[]\>

Lists ImmuDb server users, can also activate user.

#### Returns

`Promise`<[`UserInfo`](../modules/types.md#userinfo)[]\>

#### Defined in

[immu-client.ts:741](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L741)

___

### loadDb

▸ **loadDb**(`props`): `Promise`<`string`\>

Loads database at ImmuDb server.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `LoadDbProps` |

#### Returns

`Promise`<`string`\>

#### Defined in

[immu-client.ts:802](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L802)

___

### replicateTx

▸ **replicateTx**(`props`): `Promise`<[`TxCore`](../modules/types.md#txcore)\>

Replicates transaction.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ReplicateTxProps` |

#### Returns

`Promise`<[`TxCore`](../modules/types.md#txcore)\>

#### Defined in

[immu-client.ts:890](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L890)

___

### scanDbEntries

▸ **scanDbEntries**(`props`): `Promise`<[`TxEntry`](../modules/types.md#txentry)[]\>

Scans all database entries in one transaction.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ScanDBProps` |

#### Returns

`Promise`<[`TxEntry`](../modules/types.md#txentry)[]\>

#### Defined in

[immu-client.ts:486](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L486)

___

### scanHistory

▸ **scanHistory**(`props`): `Promise`<{ `refTxEntry?`: [`TxContext`](../modules/types.md#txcontext) & [`RefEntry`](../modules/types.md#refentry) & [`IndexerInfo`](../modules/types.md#indexerinfo) ; `valTxEntry`: [`TxContext`](../modules/types.md#txcontext) & [`ValEntry`](../modules/types.md#valentry) & [`IndexerInfo`](../modules/types.md#indexerinfo)  }[]\>

Scans entry history.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `GetHistoryProps` |

#### Returns

`Promise`<{ `refTxEntry?`: [`TxContext`](../modules/types.md#txcontext) & [`RefEntry`](../modules/types.md#refentry) & [`IndexerInfo`](../modules/types.md#indexerinfo) ; `valTxEntry`: [`TxContext`](../modules/types.md#txcontext) & [`ValEntry`](../modules/types.md#valentry) & [`IndexerInfo`](../modules/types.md#indexerinfo)  }[]\>

#### Defined in

[immu-client.ts:497](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L497)

___

### scanHistoryStreaming

▸ **scanHistoryStreaming**(`props`): `Promise`<`AsyncGenerator`<`Chunk__Output`, `any`[], `unknown`\>\>

Scans entry history.
Returns output as stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `GetHistoryProps` |

#### Returns

`Promise`<`AsyncGenerator`<`Chunk__Output`, `any`[], `unknown`\>\>

#### Defined in

[immu-client.ts:510](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L510)

___

### scanTxes

▸ **scanTxes**(`props`): `Promise`<`Tx__Output`[]\>

Scans database transactions in one transaction. This is most fundamental
operation of ImmuDb.

Result is composed in following way:
- entries are filtered out for actions:
  - `EXCLUDE`,
- entries go ordered into `entries` array fild for actions:
  - `RAW_VALUE`,
  - `ONLY_DIGEST`,
  - `undefined`,
- KV entries go ordered into `kvEntries` array fild for
  `kvOrRefEntryAction` action:
  - `RESOLVE`,
- Z entries go ordered into `zEntries` array fild for `zEntryAction`
  action:
  - `RESOLVE`,

Transactions are ordered with transaction id, however depending on
operation parameters it may not be sequential (`RESOLVE` action will
cause values to go to separate arrays, `EXCLUDE` will filter them out).

To obtain sequential transactions ordering set all actions as:
- `RAW_VALUE` or
- `ONLY_DIGEST`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ScanTxesProps` |

#### Returns

`Promise`<`Tx__Output`[]\>

#### Defined in

[immu-client.ts:399](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L399)

___

### scanValRefEntries

▸ **scanValRefEntries**(`props?`): `Promise`<{ `refTxEntry?`: [`TxContext`](../modules/types.md#txcontext) & [`RefEntry`](../modules/types.md#refentry) & [`IndexerInfo`](../modules/types.md#indexerinfo) ; `valTxEntry`: [`TxContext`](../modules/types.md#txcontext) & [`ValEntry`](../modules/types.md#valentry) & [`IndexerInfo`](../modules/types.md#indexerinfo)  }[]\>

Scans database VEntries and RefEntries in one transaction.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props?` | `ScanValRefEntriesProps` |

#### Returns

`Promise`<{ `refTxEntry?`: [`TxContext`](../modules/types.md#txcontext) & [`RefEntry`](../modules/types.md#refentry) & [`IndexerInfo`](../modules/types.md#indexerinfo) ; `valTxEntry`: [`TxContext`](../modules/types.md#txcontext) & [`ValEntry`](../modules/types.md#valentry) & [`IndexerInfo`](../modules/types.md#indexerinfo)  }[]\>

#### Defined in

[immu-client.ts:331](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L331)

___

### scanValRefEntriesStreaming

▸ **scanValRefEntriesStreaming**(`props`): `Promise`<`AsyncGenerator`<`Chunk__Output`, `any`[], `unknown`\>\>

Scans database VEntries and RefEntries in one transaction.
Returns output as stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ScanValRefEntriesProps` |

#### Returns

`Promise`<`AsyncGenerator`<`Chunk__Output`, `any`[], `unknown`\>\>

#### Defined in

[immu-client.ts:342](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L342)

___

### scanZEntries

▸ **scanZEntries**(`props`): `Promise`<{ `refTxEntry?`: [`RefTxEntry`](../modules/types.md#reftxentry) ; `valTxEntry`: [`ValTxEntry`](../modules/types.md#valtxentry) ; `zSetEntry`: [`ZSetEntry`](../modules/types.md#zsetentry)  }[]\>

Scans database ZEntries in one transaction.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ScanZSetEntriesProps` |

#### Returns

`Promise`<{ `refTxEntry?`: [`RefTxEntry`](../modules/types.md#reftxentry) ; `valTxEntry`: [`ValTxEntry`](../modules/types.md#valtxentry) ; `zSetEntry`: [`ZSetEntry`](../modules/types.md#zsetentry)  }[]\>

#### Defined in

[immu-client.ts:352](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L352)

___

### scanZEntriesStreaming

▸ **scanZEntriesStreaming**(`props`): `Promise`<`AsyncGenerator`<`Chunk__Output`, `any`[], `unknown`\>\>

Scans database ZEntries in one transaction.
Returns output as stream.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ScanZSetEntriesProps` |

#### Returns

`Promise`<`AsyncGenerator`<`Chunk__Output`, `any`[], `unknown`\>\>

#### Defined in

[immu-client.ts:364](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L364)

___

### setDbSettings

▸ **setDbSettings**(`props`): `Promise`<{ `database`: `string` = resp.database; `settings`: [`DatabaseSettings`](../modules/types.md#databasesettings)  }\>

Sets database settings.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SetDbSettingsProps` |

#### Returns

`Promise`<{ `database`: `string` = resp.database; `settings`: [`DatabaseSettings`](../modules/types.md#databasesettings)  }\>

#### Defined in

[immu-client.ts:869](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L869)

___

### setRefEntry

▸ **setRefEntry**(`props`): `Promise`<{ `ref`: [`RefTxEntry`](../modules/types.md#reftxentry) ; `txCore`: [`TxCore`](../modules/types.md#txcore)  }\>

Sets RefEntry in one transaction.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SetRefEntryProps` |

#### Returns

`Promise`<{ `ref`: [`RefTxEntry`](../modules/types.md#reftxentry) ; `txCore`: [`TxCore`](../modules/types.md#txcore)  }\>

#### Defined in

[immu-client.ts:278](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L278)

___

### setRefEntryGetVerification

▸ **setRefEntryGetVerification**(`props`): `Promise`<{ `refEntry`: [`RefEntry`](../modules/types.md#refentry) ; `transaction`: [`Transaction`](../modules/types.md#transaction) ; `verification`: [`Verification`](../modules/types.md#verification)  }\>

Sets RefEntry in one transaction.

Returns RefEntry set and its verification structure.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SetRefEntryProps` & `ProofRequestProps` |

#### Returns

`Promise`<{ `refEntry`: [`RefEntry`](../modules/types.md#refentry) ; `transaction`: [`Transaction`](../modules/types.md#transaction) ; `verification`: [`Verification`](../modules/types.md#verification)  }\>

#### Defined in

[immu-client.ts:976](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L976)

___

### setUserDbPermissions

▸ **setUserDbPermissions**(`props`): `Promise`<`SetUserDbPermissionsProps` & { `credentials`: `CallCredentials`  }\>

Sets ImmuDb server user permissions.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SetUserDbPermissionsProps` |

#### Returns

`Promise`<`SetUserDbPermissionsProps` & { `credentials`: `CallCredentials`  }\>

#### Defined in

[immu-client.ts:751](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L751)

___

### setUserPassword

▸ **setUserPassword**(`props`): `Promise`<`string`\>

Sets ImmuDb server user password.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SetUserPasswordProps` |

#### Returns

`Promise`<`string`\>

#### Defined in

[immu-client.ts:761](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L761)

___

### setValEntries

▸ **setValEntries**(`props`): `Promise`<{ `txCore`: [`TxCore`](../modules/types.md#txcore) ; `valEntries`: [`ValTxEntry`](../modules/types.md#valtxentry)[]  }\>

Sets all value entries in one transaction.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SetValEntryProps` |

#### Returns

`Promise`<{ `txCore`: [`TxCore`](../modules/types.md#txcore) ; `valEntries`: [`ValTxEntry`](../modules/types.md#valtxentry)[]  }\>

#### Defined in

[immu-client.ts:236](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L236)

___

### setValEntriesGetVerification

▸ **setValEntriesGetVerification**(`props`): `Promise`<{ `transaction`: [`Transaction`](../modules/types.md#transaction) ; `verification`: [`Verification`](../modules/types.md#verification)  }\>

Sets all value entries in one transaction.

Returns entries set and its verification structure.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SetValEntryProps` & `ProofRequestProps` |

#### Returns

`Promise`<{ `transaction`: [`Transaction`](../modules/types.md#transaction) ; `verification`: [`Verification`](../modules/types.md#verification)  }\>

#### Defined in

[immu-client.ts:961](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L961)

___

### setValEntriesStreaming

▸ **setValEntriesStreaming**(`props`): `Promise`<[`TxCore`](../modules/types.md#txcore)\>

Sets multiple ValEntries in one transaction.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SetValEntriesStreamingProps` |

#### Returns

`Promise`<[`TxCore`](../modules/types.md#txcore)\>

#### Defined in

[immu-client.ts:253](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L253)

___

### setValRefZSetEntries

▸ **setValRefZSetEntries**(`props`): `Promise`<{ `tx`: [`TxCore`](../modules/types.md#txcore) ; `txEntries`: ([`ValTxEntry`](../modules/types.md#valtxentry) \| [`RefTxEntry`](../modules/types.md#reftxentry) \| [`ZSetTxEntry`](../modules/types.md#zsettxentry))[]  }\>

Sets multiple ValEntries, RefEntries or ZSetEntries in one transaction.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SetEntryProps` |

#### Returns

`Promise`<{ `tx`: [`TxCore`](../modules/types.md#txcore) ; `txEntries`: ([`ValTxEntry`](../modules/types.md#valtxentry) \| [`RefTxEntry`](../modules/types.md#reftxentry) \| [`ZSetTxEntry`](../modules/types.md#zsettxentry))[]  }\>

#### Defined in

[immu-client.ts:209](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L209)

___

### setValZSetEntriesStreaming

▸ **setValZSetEntriesStreaming**(`props`): `Promise`<[`TxCore`](../modules/types.md#txcore)\>

Sets multiple ValEntries or ZSetEntries in one transaction.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SetEntriesStreamingProps` |

#### Returns

`Promise`<[`TxCore`](../modules/types.md#txcore)\>

#### Defined in

[immu-client.ts:223](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L223)

___

### setZSetEntry

▸ **setZSetEntry**(`props`): `Promise`<{ `tx`: [`TxCore`](../modules/types.md#txcore) ; `zSetTxEntry`: [`ZSetTxEntry`](../modules/types.md#zsettxentry)  }\>

Sets ZEntry in one transaction.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SetZSetEntryProps` |

#### Returns

`Promise`<{ `tx`: [`TxCore`](../modules/types.md#txcore) ; `zSetTxEntry`: [`ZSetTxEntry`](../modules/types.md#zsettxentry)  }\>

#### Defined in

[immu-client.ts:265](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L265)

___

### setZSetEntryGetVerification

▸ **setZSetEntryGetVerification**(`props`): `Promise`<{ `transaction`: [`Transaction`](../modules/types.md#transaction) ; `verification`: [`Verification`](../modules/types.md#verification) ; `zSetEntry`: [`ZSetEntry`](../modules/types.md#zsetentry)  }\>

Sets ZSetEntry in one transaction.

Returns ZSetEntry set and its verification structure.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SetZSetEntryProps` & `ProofRequestProps` |

#### Returns

`Promise`<{ `transaction`: [`Transaction`](../modules/types.md#transaction) ; `verification`: [`Verification`](../modules/types.md#verification) ; `zSetEntry`: [`ZSetEntry`](../modules/types.md#zsetentry)  }\>

#### Defined in

[immu-client.ts:991](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L991)

___

### sqlExec

▸ **sqlExec**(`props`): `Promise`<{ `isInTransaction`: `boolean` ; `subTxes`: { `firstPK`: [`SqlNamedValue`](../modules/types.md#sqlnamedvalue)[] ; `lastPK`: [`SqlNamedValue`](../modules/types.md#sqlnamedvalue)[] ; `tx`: `undefined` \| [`TxCore`](../modules/types.md#txcore) ; `updatedRowsCount`: `number`  }[]  }\>

Executes sql batch as one transaction.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SqlExecProps` |

#### Returns

`Promise`<{ `isInTransaction`: `boolean` ; `subTxes`: { `firstPK`: [`SqlNamedValue`](../modules/types.md#sqlnamedvalue)[] ; `lastPK`: [`SqlNamedValue`](../modules/types.md#sqlnamedvalue)[] ; `tx`: `undefined` \| [`TxCore`](../modules/types.md#txcore) ; `updatedRowsCount`: `number`  }[]  }\>

#### Defined in

[immu-client.ts:565](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L565)

___

### sqlQuery

▸ **sqlQuery**(`props`): `Promise`<[`SqlNamedValue`](../modules/types.md#sqlnamedvalue)[][]\>

Sql queries DB in one transaction. (Multiple result sets?)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SqlQueryProps` |

#### Returns

`Promise`<[`SqlNamedValue`](../modules/types.md#sqlnamedvalue)[][]\>

#### Defined in

[immu-client.ts:532](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L532)

___

### sqlQueryTable

▸ **sqlQueryTable**(`table`): `Promise`<[`SqlNamedValue`](../modules/types.md#sqlnamedvalue)[][]\>

Queries sql table schema.

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | `string` |

#### Returns

`Promise`<[`SqlNamedValue`](../modules/types.md#sqlnamedvalue)[][]\>

#### Defined in

[immu-client.ts:554](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L554)

___

### sqlQueryTables

▸ **sqlQueryTables**(`props`): `Promise`<[`SqlNamedValue`](../modules/types.md#sqlnamedvalue)[][]\>

Queries current db for sql tables.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SqlQueryProps` |

#### Returns

`Promise`<[`SqlNamedValue`](../modules/types.md#sqlnamedvalue)[][]\>

#### Defined in

[immu-client.ts:543](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L543)

___

### unloadDb

▸ **unloadDb**(`props`): `Promise`<`void`\>

Unloads database at ImmuDb server.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `UnloadDbProps` |

#### Returns

`Promise`<`void`\>

#### Defined in

[immu-client.ts:812](https://github.com/user3232/node-immu-db/blob/84e891f/immudb-node/src/immu-client.ts#L812)
