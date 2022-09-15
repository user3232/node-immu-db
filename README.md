

# Install

```sh
npm install
mkdir dist
mkdir dist/pb
cp pb/immu.js dist/pb/immu.js
```

# Run

First run immudb docker image with exposed ports:

```sh
docker run -d -it --rm -p 8080:8080 -p 3322:3322 -p 9497:9497 -p 5432:5432 --name immudb codenotary/immudb:latest
```

Then build and run example.

```sh

npm run build && node ./dist/src/index.js
```


# Example

Few capabilities of client:

```ts
import { Client, devConfig } from './immu-client.js'
import * as types from 'types/index.js'
import * as stream from './stream/index.js'
import * as kvm from './immu-key-value-meta/index.js'
import Long from 'long'
import { SqlRow } from './immu-key-value-meta/sql-row.js'


run()
.catch(console.error)


async function run() {

    const client = new Client({
        host:       '127.0.0.1',
        port:       3322,
        user:       'immudb',
        password:   'immudb',
        database:   'defaultdb',
    })


    const emptyDbAt1 = await client.scanDbEntries({
        scanStartAtTxId: Long.fromInt(1, true)
    })
    console.log('emptyDbAt1:')
    console.log(emptyDbAt1)


    const valEntries2 = await client.setValEntries({
        kvs: [
            {key: Buffer.of(0), val: Buffer.of(0)},
            {key: Buffer.of(1), val: Buffer.of(1)},
        ]
    })
    console.log('valEntries2:')
    console.log(valEntries2)


    const valEntry3 = await client.setValEntries({
        kvs: [
            {key: Buffer.of(2), val: Buffer.of(2)},
        ]
    })
    console.log('valEntry3:')
    console.log(valEntry3)


    const refEntry4 = await client.setRefEntry({
        key:        Buffer.of(3),
        referToKey: valEntries2[0].entry.key,
        keyTxId:    valEntries2[0].txId,
        boundRef:   true,
    })
    console.log('refEntry4:')
    console.log(refEntry4)


    const zSetEntry5 = await client.setZSetEntry({
        set:        Buffer.of(4),
        key:        valEntry3[0].entry.key,
        keyIndex:   3,
    })
    console.log('zSetEntry5:')
    console.log(zSetEntry5)

    const entries6 = await client.setValRefZSetEntries({
        ops: [
            {
                type:   'val',
                key:    Buffer.of(2),
                val:    Buffer.of(6),
            },
            {
                type:       'ref',
                key:        Buffer.of(3),
                referToKey: valEntry3[0].entry.key
            },
            {
                type:   'zSet',
                set:    zSetEntry5.entry.zSet,
                key:    valEntries2[1].entry.key,
                keyIndex: 9,
            }
        ]
    })
    console.log('entries6:')
    console.log(entries6)


    const scanZEntriesAt6 = await client.scanZEntries({
        set: zSetEntry5.entry.zSet
    })
    console.log('scanZEntriesAt6:')
    console.log(scanZEntriesAt6)


    const scanValRefEntriesAt6 = await client.scanValRefEntries({
        scanSkipToKey: refEntry4.entry.key,
    })
    console.log('scanValRefEntriesAt6:')
    console.log(scanValRefEntriesAt6)


    const scanHistoryAt6 = await client.scanHistory({
        key: valEntry3[0].entry.key
    })
    console.log('scanHistoryAt6:')
    console.log(scanHistoryAt6)


    const streamScanValZSetEntriesAt6 = await client.scanValRefEntriesStreaming({
        limit: Long.fromInt(6, true)
    })
    const buffs: Buffer[] = []
    for await (const chunk of streamScanValZSetEntriesAt6) {
        buffs.push(chunk.content)
    }
    console.log('streamScanValZSetEntriesAt6:')
    console.log(stream.toKVEntries(Buffer.concat(buffs)))


    const sqlExecCreateTable7 = await client.sqlExec({sql: `
        create table if not exists testtable (
            id1         integer not null,
            id2         varchar[3] null,
            created     timestamp null,
            data        varchar[512] not null,
            isActive    boolean not null,
            primary key (id1, id2)
        );
    `})
    console.log('sqlExecCreateTable7:')
    console.log(sqlExecCreateTable7)


    const sqlExecUpsert8 = await client.sqlExec({sql: `
        upsert into testtable
            (id1, id2, created, data, isactive)
        values
            (-2, 'kkk', NOW(), 'upsert existing', true),
            (10, 'yoy', NOW(), 'upsert operation 2', false),
            (11, 'qoy', NOW(), 'upsert operation 3', true);
    `})
    console.log('sqlExecUpsert8:')
    console.log(sqlExecUpsert8)


    const sqlTxAt8 = await client.executeSqlTx('ReadWrite', async (txApi) => {
        const sqlQueryInTxAt8 = await txApi.query({sql: `
            select * from testtable;
        `})
        console.log('sqlQueryInTxAt8')
        console.log(sqlQueryInTxAt8)


        // sqlExecUpsert9
        const sqlExecUpsertInTx9 = txApi.exec({sql:`
            upsert into testtable
                (id1, id2, created, data, isactive)
            values
                (12, 'to', NOW(), 'interactive tx 1', false),
                (13, 'ka', NOW(), 'interactive tx 2', true);
        `})


        const sqlQueryInTxAt9 = await txApi.query({sql: `
            select * from testtable;
        `})
        console.log('sqlQueryInTxAt9')
        console.log(sqlQueryInTxAt9)


        throw 'I would like to cancel'

    })
    console.log('sqlTxAt8')
    console.log(sqlTxAt8)


    const sqlQueryAt8 = await client.sqlQuery({sql: `
        select * from testtable;
    `})
    console.log('sqlQueryInTxAt8')
    console.log(sqlQueryAt8)
    const k = sqlQueryAt8[0]
    const d = k[0]
    
    

    const dbScanAt8 = await client.scanDbEntries({
        scanStartAtTxId:        Long.fromValue(1, true),
    })
    console.log('dbScanAt8')
    console.log(dbScanAt8)



    type VerifiableSqlRow = SqlRow & {
        type:   'sql',
        meta?:  types.EntryMetadata,
    } & {
        entryTxId:  Long,
        entryId:    number,
    }
    const dbScanSqlRowsAt8 = dbScanAt8.filter<VerifiableSqlRow>(
        function(x : kvm.GenericVerifiableEntry): x is VerifiableSqlRow {
            return x.type === 'sql' && x.sqlType === 'row'
        }
    )
    const mapTestTableRow = kvm.createSqlMap({
        id1:        {type: 'int',       id: 0},
        id2:        {type: 'string',    id: 1},
        created:    {type: 'timestamp', id: 2},
        data:       {type: 'string',    id: 3},
        isActive:   {type: 'boolean',   id: 4},
    })
    const prettySqlAt8 = dbScanSqlRowsAt8.map(row => mapTestTableRow(row.columns))
    console.log('prettySqlAt8')
    console.log(prettySqlAt8)





    const stateAt8 = await client.getDbCurrentState()
    console.log('stateAt8')
    console.log(stateAt8)


    const setAndProof9 = await client.setValEntriesAndVerify({
        kvs: [{key: Buffer.from('yo'), val: Buffer.from('man')}],
        refTx: {
            id: stateAt8.txId,
            hash: stateAt8.txHash,
        }
    })
    console.log('setAndProof9.entries')
    console.log(setAndProof9.entries)
    console.log('setAndProof9.verified')
    console.log(setAndProof9.verified)

    
    const stateAt9 = await client.getDbCurrentState()
    console.log('stateAt9')
    console.log(stateAt9)

    const getTx2AndVerification = await client.getTxAndVerification({
        txId: Long.fromInt(2, true),
        refHash: stateAt9.txHash,
        refTxId: stateAt9.txId,
    })
    console.log('getTx2AndVerification')
    console.dir(getTx2AndVerification, {depth: 10})

    console.log('verifyVerification result:')
    console.log(verifyVerification(getTx2AndVerification.verification))


    await client.close()

}

```


# Example output


```sh
PS …\immu\node-immu-db> npm run build && node ./dist/src/index.js

> immudb-js@1.0.0 build
> tsc

emptyDbAt1:
[
  {
    type: 'sql',
    sqlType: 'db',
    dbId: 1,
    dbName: 'dbinstance',
    meta: undefined,
    entryTxId: Long { low: 1, high: 0, unsigned: true },
    entryId: 1
  }
]
valEntries2:
[
  {
    type: 'val',
    entry: { key: <Buffer 00>, val: <Buffer 00> },
    txId: Long { low: 2, high: 0, unsigned: true },
    tx: {
      id: [Long],
      entriesCount: 2,
      entriesMht: <Buffer 03 6d 40 04 b6 a1 8c 5d dc 30 2e 41 ff 5f ca 9c d0 ed d4 e1 76 ff 79 38 06 4c 3f 61 cf ef 72 85>, 
      prevTxHash: <Buffer a3 d2 59 75 99 53 53 50 4f 9e 68 f9 a7 1f 29 c3 f3 ed fa e2 77 dc 16 40 89 2c 8a d4 4d 50 37 cc>, 
      prevTxesMht: <Buffer 93 c6 a2 ce 29 8e 92 41 2f f4 bb d7 9c 15 e1 16 12 32 15 06 b7 7e 9d 15 1a ae 04 81 e0 73 bf 4d>,
      timestamp: [Long],
      version: 1
    },
    id: 1
  },
  {
    type: 'val',
    entry: { key: <Buffer 01>, val: <Buffer 01> },
    txId: Long { low: 2, high: 0, unsigned: true },
    tx: {
      id: [Long],
      entriesCount: 2,
      entriesMht: <Buffer 03 6d 40 04 b6 a1 8c 5d dc 30 2e 41 ff 5f ca 9c d0 ed d4 e1 76 ff 79 38 06 4c 3f 61 cf ef 72 85>,
      prevTxHash: <Buffer a3 d2 59 75 99 53 53 50 4f 9e 68 f9 a7 1f 29 c3 f3 ed fa e2 77 dc 16 40 89 2c 8a d4 4d 50 37 cc>,
      prevTxesMht: <Buffer 93 c6 a2 ce 29 8e 92 41 2f f4 bb d7 9c 15 e1 16 12 32 15 06 b7 7e 9d 15 1a ae 04 81 e0 73 bf 4d>,
      timestamp: [Long],
      version: 1
    },
    id: 2
  }
]
valEntry3:
[
  {
    type: 'val',
    entry: { key: <Buffer 02>, val: <Buffer 02> },
    txId: Long { low: 3, high: 0, unsigned: true },
    tx: {
      id: [Long],
      entriesCount: 1,
      entriesMht: <Buffer a2 05 9b c2 cb 19 de 68 96 5d bc 7f b9 8f ef f9 86 79 85 35 53 fa 73 e2 08 0f 75 fe bd 92 9a aa>,
      prevTxHash: <Buffer 5e b8 e5 6d da 26 39 d8 45 b8 19 67 ca 5f 39 74 0a df 98 3b 55 2a c8 62 b3 f8 d0 6a 32 e9 11 0b>,
      prevTxesMht: <Buffer e7 58 d9 1a 3c 0a de e8 43 fa e2 71 2a c0 81 ff 96 9f b9 2c fb 50 76 78 25 13 03 02 33 0c 41 63>,
      timestamp: [Long],
      version: 1
    },
    id: 1
  }
]
refEntry4:
{
  type: 'ref',
  entry: {
    key: <Buffer 03>,
    refKey: <Buffer 00>,
    refKeySeenFromTxId: Long { low: 2, high: 0, unsigned: true },
    meta: undefined
  },
  txId: Long { low: 4, high: 0, unsigned: true },
  tx: {
    id: Long { low: 4, high: 0, unsigned: true },
    entriesCount: 1,
    entriesMht: <Buffer 50 33 41 32 a9 14 05 73 02 32 af 66 80 34 0d e3 ea 7b f0 38 b6 a7 e3 dc f5 be 17 10 05 38 68 88>,
    prevTxHash: <Buffer 53 8b fc 95 2d b5 42 04 b1 75 3e c7 78 ff b5 03 15 9d 01 9f dc b1 e5 4c a8 7a 87 4c de 76 bb d1>,
    prevTxesMht: <Buffer fb 63 04 0a 5d 7c 08 20 f0 c1 f9 09 9d 4d 90 47 1d 29 2e 27 38 4a 51 cd 03 55 7d ab 83 fa 94 25>,
    timestamp: Long { low: 1663281242, high: 0, unsigned: false },
    version: 1
  },
  id: 1
}
zSetEntry5:
{
  type: 'zSet',
  entry: {
    refKey: <Buffer 02>,
    refKeySeenFromTxId: Long { low: 0, high: 0, unsigned: true },
    score: 3,
    zSet: <Buffer 04>
  },
  txId: Long { low: 5, high: 0, unsigned: true },
  tx: {
    id: Long { low: 5, high: 0, unsigned: true },
    entriesCount: 1,
    entriesMht: <Buffer 8a 95 fa 6f f2 38 de c5 f5 3e 6f fa a0 f4 8a ef b7 35 fa 2c 73 b0 af ec 46 23 e3 6d 95 84 48 8c>,
    prevTxHash: <Buffer ce 64 85 bb 06 58 8c 04 b9 5d d1 1a 21 77 8e bc 58 9a 1d 28 bc 99 5e 18 82 a5 9f cc 6e 6e c4 69>,
    prevTxesMht: <Buffer 24 3a b5 0a 4f 4b 30 09 5f bd 2f 17 1d 08 0a 2b 38 3d 87 8b ff f7 93 ba a5 88 7e a5 81 54 d3 7c>,
    timestamp: Long { low: 1663281242, high: 0, unsigned: false },
    version: 1
  },
  id: 1
}
entries6:
[
  {
    type: 'val',
    entry: { key: <Buffer 02>, val: <Buffer 06>, meta: undefined },
    txId: Long { low: 6, high: 0, unsigned: true },
    tx: {
      id: [Long],
      entriesCount: 3,
      entriesMht: <Buffer 23 23 ef c8 12 88 f5 e2 f0 f8 4a 94 f6 7b b0 c5 8b 05 93 43 b5 42 4d 0f 9d f9 d9 5f 30 9b 5c 84>,
      prevTxHash: <Buffer f4 74 86 f8 65 43 b2 72 61 89 ec bc 3e 90 d8 f7 ca 2a 12 7f 9a d4 a1 e4 32 fb 09 d7 39 c3 0a d3>,
      prevTxesMht: <Buffer ab e4 21 1e 62 bd 0e 65 28 cf 2c 94 26 03 8a 68 d2 6c b3 58 6b 60 37 e3 95 f9 cd 88 3e 4c 28 a5>,
      timestamp: [Long],
      version: 1
    },
    id: 1
  },
  {
    type: 'ref',
    entry: {
      key: <Buffer 03>,
      refKey: <Buffer 02>,
      refKeySeenFromTxId: [Long],
      meta: undefined
    },
    txId: Long { low: 6, high: 0, unsigned: true },
    tx: {
      id: [Long],
      entriesCount: 3,
      entriesMht: <Buffer 23 23 ef c8 12 88 f5 e2 f0 f8 4a 94 f6 7b b0 c5 8b 05 93 43 b5 42 4d 0f 9d f9 d9 5f 30 9b 5c 84>,
      prevTxHash: <Buffer f4 74 86 f8 65 43 b2 72 61 89 ec bc 3e 90 d8 f7 ca 2a 12 7f 9a d4 a1 e4 32 fb 09 d7 39 c3 0a d3>,
      prevTxesMht: <Buffer ab e4 21 1e 62 bd 0e 65 28 cf 2c 94 26 03 8a 68 d2 6c b3 58 6b 60 37 e3 95 f9 cd 88 3e 4c 28 a5>,
      timestamp: [Long],
      version: 1
    },
    id: 2
  },
  {
    type: 'zSet',
    entry: {
      refKey: <Buffer 01>,
      refKeySeenFromTxId: [Long],
      score: 9,
      zSet: <Buffer 04>
    },
    txId: Long { low: 6, high: 0, unsigned: true },
    tx: {
      id: [Long],
      entriesCount: 3,
      entriesMht: <Buffer 23 23 ef c8 12 88 f5 e2 f0 f8 4a 94 f6 7b b0 c5 8b 05 93 43 b5 42 4d 0f 9d f9 d9 5f 30 9b 5c 84>,
      prevTxHash: <Buffer f4 74 86 f8 65 43 b2 72 61 89 ec bc 3e 90 d8 f7 ca 2a 12 7f 9a d4 a1 e4 32 fb 09 d7 39 c3 0a d3>,
      prevTxesMht: <Buffer ab e4 21 1e 62 bd 0e 65 28 cf 2c 94 26 03 8a 68 d2 6c b3 58 6b 60 37 e3 95 f9 cd 88 3e 4c 28 a5>,
      timestamp: [Long],
      version: 1
    },
    id: 3
  }
]
scanZEntriesAt6:
[]
scanValRefEntriesAt6:
[
  {
    type: 'val',
    txId: Long { low: 6, high: 0, unsigned: true },
    entry: { key: <Buffer 02>, val: <Buffer 06>, meta: undefined },
    expired: false,
    revision: Long { low: 0, high: 0, unsigned: true }
  },
  {
    type: 'val-ref',
    txId: Long { low: 6, high: 0, unsigned: true },
    entry: { key: <Buffer 02>, val: <Buffer 06>, meta: undefined },
    expired: false,
    revision: Long { low: 2, high: 0, unsigned: true },
    refTxId: Long { low: 6, high: 0, unsigned: true },
    refEntry: {
      key: <Buffer 03>,
      refKey: <Buffer 02>,
      refKeySeenFromTxId: [Long],
      meta: undefined
    }
  }
]
scanHistoryAt6:
[
  {
    type: 'val',
    txId: Long { low: 3, high: 0, unsigned: true },
    entry: { key: <Buffer 02>, val: <Buffer 02>, meta: undefined },
    expired: false,
    revision: Long { low: 1, high: 0, unsigned: true }
  },
  {
    type: 'val',
    txId: Long { low: 6, high: 0, unsigned: true },
    entry: { key: <Buffer 02>, val: <Buffer 06>, meta: undefined },
    expired: false,
    revision: Long { low: 2, high: 0, unsigned: true }
  }
]
streamScanValZSetEntriesAt6:
[
  { key: <Buffer 00>, val: <Buffer 00> },
  { key: <Buffer 01>, val: <Buffer 01> },
  { key: <Buffer 02>, val: <Buffer 06> },
  { key: <Buffer 02>, val: <Buffer 06> }
]
sqlExecCreateTable7:
{ txes: [ undefined ], ongoingTx: false }
sqlExecUpsert8:
{ txes: [ undefined ], ongoingTx: false }
sqlQueryInTxAt8
[
  [
    {
      name: '(defaultdb.testtable.id1)',
      type: 'INTEGER',
      value: [Long]
    },
    {
      name: '(defaultdb.testtable.id2)',
      type: 'VARCHAR',
      value: 'kkk'
    },
    {
      name: '(defaultdb.testtable.created)',
      type: 'TIMESTAMP',
      value: [Long]
    },
    {
      name: '(defaultdb.testtable.data)',
      type: 'VARCHAR',
      value: 'upsert existing'
    },
    {
      name: '(defaultdb.testtable.isactive)',
      type: 'BOOLEAN',
      value: true
    }
  ],
  [
    {
      name: '(defaultdb.testtable.id1)',
      type: 'INTEGER',
      value: [Long]
    },
    {
      name: '(defaultdb.testtable.id2)',
      type: 'VARCHAR',
      value: 'yoy'
    },
    {
      name: '(defaultdb.testtable.created)',
      type: 'TIMESTAMP',
      value: [Long]
    },
    {
      name: '(defaultdb.testtable.data)',
      type: 'VARCHAR',
      value: 'upsert operation 2'
    },
    {
      name: '(defaultdb.testtable.isactive)',
      type: 'BOOLEAN',
      value: false
    }
  ],
  [
    {
      name: '(defaultdb.testtable.id1)',
      type: 'INTEGER',
      value: [Long]
    },
    {
      name: '(defaultdb.testtable.id2)',
      type: 'VARCHAR',
      value: 'qoy'
    },
    {
      name: '(defaultdb.testtable.created)',
      type: 'TIMESTAMP',
      value: [Long]
    },
    {
      name: '(defaultdb.testtable.data)',
      type: 'VARCHAR',
      value: 'upsert operation 3'
    },
    {
      name: '(defaultdb.testtable.isactive)',
      type: 'BOOLEAN',
      value: true
    }
  ]
]
sqlQueryInTxAt9
[
  [
    {
      name: '(defaultdb.testtable.id1)',
      type: 'INTEGER',
      value: [Long]
    },
    {
      name: '(defaultdb.testtable.id2)',
      type: 'VARCHAR',
      value: 'kkk'
    },
    {
      name: '(defaultdb.testtable.created)',
      type: 'TIMESTAMP',
      value: [Long]
    },
    {
      name: '(defaultdb.testtable.data)',
      type: 'VARCHAR',
      value: 'upsert existing'
    },
    {
      name: '(defaultdb.testtable.isactive)',
      type: 'BOOLEAN',
      value: true
    }
  ],
  [
    {
      name: '(defaultdb.testtable.id1)',
      type: 'INTEGER',
      value: [Long]
    },
    {
      name: '(defaultdb.testtable.id2)',
      type: 'VARCHAR',
      value: 'yoy'
    },
    {
      name: '(defaultdb.testtable.created)',
      type: 'TIMESTAMP',
      value: [Long]
    },
    {
      name: '(defaultdb.testtable.data)',
      type: 'VARCHAR',
      value: 'upsert operation 2'
    },
    {
      name: '(defaultdb.testtable.isactive)',
      type: 'BOOLEAN',
      value: false
    }
  ],
  [
    {
      name: '(defaultdb.testtable.id1)',
      type: 'INTEGER',
      value: [Long]
    },
    {
      name: '(defaultdb.testtable.id2)',
      type: 'VARCHAR',
      value: 'qoy'
    },
    {
      name: '(defaultdb.testtable.created)',
      type: 'TIMESTAMP',
      value: [Long]
    },
    {
      name: '(defaultdb.testtable.data)',
      type: 'VARCHAR',
      value: 'upsert operation 3'
    },
    {
      name: '(defaultdb.testtable.isactive)',
      type: 'BOOLEAN',
      value: true
    }
  ]
]
sqlTxAt8
rolled back, reason: I would like to cancel
sqlQueryInTxAt8
[
  [
    {
      name: '(defaultdb.testtable.id1)',
      type: 'INTEGER',
      value: [Long]
    },
    {
      name: '(defaultdb.testtable.id2)',
      type: 'VARCHAR',
      value: 'kkk'
    },
    {
      name: '(defaultdb.testtable.created)',
      type: 'TIMESTAMP',
      value: [Long]
    },
    {
      name: '(defaultdb.testtable.data)',
      type: 'VARCHAR',
      value: 'upsert existing'
    },
    {
      name: '(defaultdb.testtable.isactive)',
      type: 'BOOLEAN',
      value: true
    }
  ],
  [
    {
      name: '(defaultdb.testtable.id1)',
      type: 'INTEGER',
      value: [Long]
    },
    {
      name: '(defaultdb.testtable.id2)',
      type: 'VARCHAR',
      value: 'yoy'
    },
    {
      name: '(defaultdb.testtable.created)',
      type: 'TIMESTAMP',
      value: [Long]
    },
    {
      name: '(defaultdb.testtable.data)',
      type: 'VARCHAR',
      value: 'upsert operation 2'
    },
    {
      name: '(defaultdb.testtable.isactive)',
      type: 'BOOLEAN',
      value: false
    }
  ],
  [
    {
      name: '(defaultdb.testtable.id1)',
      type: 'INTEGER',
      value: [Long]
    },
    {
      name: '(defaultdb.testtable.id2)',
      type: 'VARCHAR',
      value: 'qoy'
    },
    {
      name: '(defaultdb.testtable.created)',
      type: 'TIMESTAMP',
      value: [Long]
    },
    {
      name: '(defaultdb.testtable.data)',
      type: 'VARCHAR',
      value: 'upsert operation 3'
    },
    {
      name: '(defaultdb.testtable.isactive)',
      type: 'BOOLEAN',
      value: true
    }
  ]
]
dbScanAt8
[
  {
    type: 'sql',
    sqlType: 'db',
    dbId: 1,
    dbName: 'dbinstance',
    meta: undefined,
    entryTxId: Long { low: 1, high: 0, unsigned: true },
    entryId: 1
  },
  {
    type: 'value',
    key: <Buffer 00>,
    val: <Buffer 00>,
    meta: undefined,
    entryTxId: Long { low: 2, high: 0, unsigned: true },
    entryId: 1
  },
  {
    type: 'value',
    key: <Buffer 01>,
    val: <Buffer 01>,
    meta: undefined,
    entryTxId: Long { low: 2, high: 0, unsigned: true },
    entryId: 2
  },
  {
    type: 'value',
    key: <Buffer 02>,
    val: <Buffer 02>,
    meta: undefined,
    entryTxId: Long { low: 3, high: 0, unsigned: true },
    entryId: 1
  },
  {
    type: 'reference',
    key: <Buffer 03>,
    refKey: <Buffer 00>,
    refKeySeenFromTxId: Long { low: 2, high: 0, unsigned: true },
    meta: undefined,
    entryTxId: Long { low: 4, high: 0, unsigned: true },
    entryId: 1
  },
  {
    type: 'zSet',
    zSet: <Buffer 04>,
    score: 3,
    refKey: <Buffer 02>,
    refKeySeenFromTxId: Long { low: 0, high: 0, unsigned: true },
    meta: undefined,
    entryTxId: Long { low: 5, high: 0, unsigned: true },
    entryId: 1
  },
  {
    type: 'value',
    key: <Buffer 02>,
    val: <Buffer 06>,
    meta: undefined,
    entryTxId: Long { low: 6, high: 0, unsigned: true },
    entryId: 1
  },
  {
    type: 'reference',
    key: <Buffer 03>,
    refKey: <Buffer 02>,
    refKeySeenFromTxId: Long { low: 0, high: 0, unsigned: true },
    meta: undefined,
    entryTxId: Long { low: 6, high: 0, unsigned: true },
    entryId: 2
  },
  {
    type: 'zSet',
    zSet: <Buffer 04>,
    score: 9,
    refKey: <Buffer 01>,
    refKeySeenFromTxId: Long { low: 0, high: 0, unsigned: true },
    meta: undefined,
    entryTxId: Long { low: 6, high: 0, unsigned: true },
    entryId: 3
  },
  {
    type: 'sql',
    sqlType: 'index',
    dbId: 1,
    tableId: 1,
    indexId: 0,
    indexIsPrimary: 1,
    columns: [ [Object], [Object] ],
    meta: undefined,
    entryTxId: Long { low: 7, high: 0, unsigned: true },
    entryId: 1
  },
  {
    type: 'sql',
    sqlType: 'column',
    dbId: 1,
    tableId: 1,
    columnType: 'INTEGER',
    columnIsAutoIncr: false,
    columnIsNullable: true,
    columnName: 'id1',
    columnMaxLength: 8,
    meta: undefined,
    entryTxId: Long { low: 7, high: 0, unsigned: true },
    entryId: 2
  },
  {
    type: 'sql',
    sqlType: 'column',
    dbId: 1,
    tableId: 1,
    columnType: 'VARCHAR',
    columnIsAutoIncr: false,
    columnIsNullable: false,
    columnName: 'id2',
    columnMaxLength: 3,
    meta: undefined,
    entryTxId: Long { low: 7, high: 0, unsigned: true },
    entryId: 3
  },
  {
    type: 'sql',
    sqlType: 'column',
    dbId: 1,
    tableId: 1,
    columnType: 'TIMESTAMP',
    columnIsAutoIncr: false,
    columnIsNullable: false,
    columnName: 'created',
    columnMaxLength: 8,
    meta: undefined,
    entryTxId: Long { low: 7, high: 0, unsigned: true },
    entryId: 4
  },
  {
    type: 'sql',
    sqlType: 'column',
    dbId: 1,
    tableId: 1,
    columnType: 'VARCHAR',
    columnIsAutoIncr: false,
    columnIsNullable: true,
    columnName: 'data',
    columnMaxLength: 512,
    meta: undefined,
    entryTxId: Long { low: 7, high: 0, unsigned: true },
    entryId: 5
  },
  {
    type: 'sql',
    sqlType: 'column',
    dbId: 1,
    tableId: 1,
    columnType: 'BOOLEAN',
    columnIsAutoIncr: false,
    columnIsNullable: true,
    columnName: 'isactive',
    columnMaxLength: 1,
    meta: undefined,
    entryTxId: Long { low: 7, high: 0, unsigned: true },
    entryId: 6
  },
  {
    type: 'sql',
    sqlType: 'table',
    dbId: 1,
    tableId: 1,
    tableName: 'testtable',
    meta: undefined,
    entryTxId: Long { low: 7, high: 0, unsigned: true },
    entryId: 7
  },
  {
    type: 'sql',
    sqlType: 'row',
    dbId: 1,
    tableId: 1,
    pk: <Buffer 80 7f ff ff ff ff ff ff fe 80 6b 6b 6b 00 00 00 03>,
    columns: [ [Object], [Object], [Object], [Object], [Object] ],
    meta: undefined,
    entryTxId: Long { low: 8, high: 0, unsigned: true },
    entryId: 1
  },
  {
    type: 'sql',
    sqlType: 'row',
    dbId: 1,
    tableId: 1,
    pk: <Buffer 80 80 00 00 00 00 00 00 0a 80 79 6f 79 00 00 00 03>,
    columns: [ [Object], [Object], [Object], [Object], [Object] ],
    meta: undefined,
    entryTxId: Long { low: 8, high: 0, unsigned: true },
    entryId: 2
  },
  {
    type: 'sql',
    sqlType: 'row',
    dbId: 1,
    tableId: 1,
    pk: <Buffer 80 80 00 00 00 00 00 00 0b 80 71 6f 79 00 00 00 03>,
    columns: [ [Object], [Object], [Object], [Object], [Object] ],
    meta: undefined,
    entryTxId: Long { low: 8, high: 0, unsigned: true },
    entryId: 3
  }
]
prettySqlAt8
[
  {
    id1: -2,
    id2: 'kkk',
    created: 2022-09-15T22:34:02.711Z,
    data: 'upsert existing',
    isActive: true
  },
  {
    id1: 10,
    id2: 'yoy',
    created: 2022-09-15T22:34:02.711Z,
    data: 'upsert operation 2',
    isActive: false
  },
  {
    id1: 11,
    id2: 'qoy',
    created: 2022-09-15T22:34:02.711Z,
    data: 'upsert operation 3',
    isActive: true
  }
]
stateAt8
{
  database: 'defaultdb',
  txHash: <Buffer c0 f0 65 54 d1 b7 6b d6 89 90 5e 5b 0e 2c 8f 2d 9b ef 57 0a de 79 fc 77 b0 6f 6e 9a d4 3a 5d dc>,
  txId: Long { low: 8, high: 0, unsigned: true },
  signature: undefined
}
setAndProof9.entries
[
  {
    type: 'val',
    entry: { key: <Buffer 79 6f>, val: <Buffer 6d 61 6e> },
    txId: Long { low: 9, high: 0, unsigned: true },
    tx: {
      id: [Long],
      entriesCount: 1,
      entriesMht: <Buffer 0b a4 84 85 20 75 42 de 07 b6 f6 f2 3a ef 7e 06 94 0d 6f 91 25 65 bf e0 02 d5 67 ec 6e e3 62 01>,
      prevTxHash: <Buffer c0 f0 65 54 d1 b7 6b d6 89 90 5e 5b 0e 2c 8f 2d 9b ef 57 0a de 79 fc 77 b0 6f 6e 9a d4 3a 5d dc>,
      prevTxesMht: <Buffer ec 9c 50 43 62 84 dd 17 f9 ac 1a 76 a1 8e 3a 76 ce a0 6d f2 8d 08 60 eb 89 1f d4 59 cc 05 16 e8>,
      timestamp: [Long],
      version: 1
    },
    id: 1
  }
]
setAndProof9.verified
{
  type: 'refTxInTx',
  data: {
    refTx: {
      id: [Long],
      hash: <Buffer c0 f0 65 54 d1 b7 6b d6 89 90 5e 5b 0e 2c 8f 2d 9b ef 57 0a de 79 fc 77 b0 6f 6e 9a d4 3a 5d dc>
    },
    proof: {
      txTx: [Object],
      refTx: [Object],
      txPrevTxInTxPrevTxesMht: [Array],
      refTxInRefPrevTxesMhtAndTxPrevTxesMht: [Array]
    }
  }
}
stateAt9
{
  database: 'defaultdb',
  txHash: <Buffer 53 31 e7 17 11 25 2f ec c0 a7 ec 19 c1 9a df 0b 36 91 ad 9a 58 ff d5 09 c5 91 f1 d5 e4 fa 28 59>,
  txId: Long { low: 9, high: 0, unsigned: true },
  signature: undefined
}
getTx2AndVerification
{
  transaction: {
    id: Long { low: 2, high: 0, unsigned: true },
    timestamp: Long { low: 1663281242, high: 0, unsigned: false },
    entries: [
      {
        type: 'val',
        version: '1',
        meta: undefined,
        key: Buffer(1) [Uint8Array] [ 0 ],
        val: Buffer(1) [Uint8Array] [ 0 ]
      },
      {
        type: 'val',
        version: '1',
        meta: undefined,
        key: Buffer(1) [Uint8Array] [ 1 ],
        val: Buffer(1) [Uint8Array] [ 1 ]
      }
    ]
  },
  verification: {
    entries: {
      type: 'all-of',
      allEntries: [
        {
          type: 'val',
          version: '1',
          meta: undefined,
          key: Buffer(1) [Uint8Array] [ 0 ],
          val: Buffer(1) [Uint8Array] [ 0 ]
        },
        {
          type: 'val',
          version: '1',
          meta: undefined,
          key: Buffer(1) [Uint8Array] [ 1 ],
          val: Buffer(1) [Uint8Array] [ 1 ]
        }
      ],
      allEntriesMht: Buffer(32) [Uint8Array] [
          3, 109,  64,   4, 182, 161, 140,  93,
        220,  48,  46,  65, 255,  95, 202, 156,
        208, 237, 212, 225, 118, 255, 121,  56,
          6,  76,  63,  97, 207, 239, 114, 133
      ]
    },
    tx: {
      type: 'tx-prev-in-ref-prev',
      ref: {
        type: 'tx-core',
        version: '1',
        id: Long { low: 9, high: 0, unsigned: true },
        timestamp: Long { low: 1663281242, high: 0, unsigned: false },
        prevTxesMht: Buffer(32) [Uint8Array] [
          236, 156,  80,  67,  98, 132, 221,  23,
          249, 172,  26, 118, 161, 142,  58, 118,
          206, 160, 109, 242, 141,   8,  96, 235,
          137,  31, 212,  89, 204,   5,  22, 232
        ],
        prevTxHash: Buffer(32) [Uint8Array] [
          192, 240, 101,  84, 209, 183, 107,
          214, 137, 144,  94,  91,  14,  44,
          143,  45, 155, 239,  87,  10, 222,
          121, 252, 119, 176, 111, 110, 154,
          212,  58,  93, 220
        ],
        allEntriesMht: Buffer(32) [Uint8Array] [
           11, 164, 132, 133,  32, 117,  66, 222,
            7, 182, 246, 242,  58, 239, 126,   6,
          148,  13, 111, 145,  37, 101, 191, 224,
            2, 213, 103, 236, 110, 227,  98,   1
        ],
        allEntriesCount: 1
      },
      refHash: {
        type: 'tx-hash',
        version: '1',
        txHash: Buffer(32) [Uint8Array] [
           83,  49, 231,  23,  17,  37,  47, 236,
          192, 167, 236,  25, 193, 154, 223,  11,
           54, 145, 173, 154,  88, 255, 213,   9,
          197, 145, 241, 213, 228, 250,  40,  89
        ],
        id: Long { low: 9, high: 0, unsigned: true }
      },
      tx: {
        type: 'tx-core',
        version: '1',
        id: Long { low: 2, high: 0, unsigned: true },
        timestamp: Long { low: 1663281242, high: 0, unsigned: false },
        prevTxesMht: Buffer(32) [Uint8Array] [
          147, 198, 162, 206,  41, 142, 146, 65,
           47, 244, 187, 215, 156,  21, 225, 22,
           18,  50,  21,   6, 183, 126, 157, 21,
           26, 174,   4, 129, 224, 115, 191, 77
        ],
        prevTxHash: Buffer(32) [Uint8Array] [
          163, 210,  89, 117, 153,  83, 83,  80,
           79, 158, 104, 249, 167,  31, 41, 195,
          243, 237, 250, 226, 119, 220, 22,  64,
          137,  44, 138, 212,  77,  80, 55, 204
        ],
        allEntriesMht: Buffer(32) [Uint8Array] [
            3, 109,  64,   4, 182, 161, 140,  93,
          220,  48,  46,  65, 255,  95, 202, 156,
          208, 237, 212, 225, 118, 255, 121,  56,
            6,  76,  63,  97, 207, 239, 114, 133
        ],
        allEntriesCount: 2
      },
      refPrevTxInRefPrevTxesMht: [
        Buffer(32) [Uint8Array] [
          139,  39,  75, 215,  33, 151,  81,
          120, 156, 217, 219,  97, 162, 157,
          212, 247, 245, 151, 211, 199, 202,
          222, 179, 122, 227,  21, 129, 119,
          101,  11, 102, 117
        ],
        Buffer(32) [Uint8Array] [
          158, 115, 228,  90,  65, 124, 47, 12,
           84, 253,  54, 251, 148, 133, 11, 63,
           15,  46,  30, 140,  29, 105, 94, 31,
          234,  34, 215,  60,   5,  67, 35, 24
        ],
        Buffer(32) [Uint8Array] [
           36,  58, 181,  10,  79,  75,  48,   9,
           95, 189,  47,  23,  29,   8,  10,  43,
           56,  61, 135, 139, 255, 247, 147, 186,
          165, 136, 126, 165, 129,  84, 211, 124
        ]
      ],
      txPrevInRefPrevTxesMht: [
        Buffer(32) [Uint8Array] [
          147, 198, 162, 206,  41, 142, 146, 65,
           47, 244, 187, 215, 156,  21, 225, 22,
           18,  50,  21,   6, 183, 126, 157, 21,
           26, 174,   4, 129, 224, 115, 191, 77
        ],
        Buffer(32) [Uint8Array] [
          255,  29, 193, 82,  29,  43, 203, 155,
          136,  92,  61, 51,  83,  23,  18, 232,
            6, 133,  95, 91, 198,  58, 227,  86,
          252,  71,  51,  7, 127, 148, 240,  71
        ],
        Buffer(32) [Uint8Array] [
           60,   6, 103, 203, 158, 142, 236,  40,
          237,  53, 205, 141,  66, 159,  49, 196,
           56, 126, 136, 162, 170,  27, 236,  16,
          187, 143, 223, 113, 254, 134,  23, 216
        ]
      ]
    }
  }
}
verifyVerification result:
true
```