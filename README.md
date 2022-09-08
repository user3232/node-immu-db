

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



    await client.close()



}

```


# Example output


```sh

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
      prevTxHash: <Buffer 40 cd a4 1e a0 9f 89 12 0a b3 5c 71 09 05 14 91 94 ff fd 65 7e 45 24 96 8d f9 59 a8 ea a2 aa 86>,
      prevTxesMht: <Buffer 82 31 5f 30 64 22 31 b2 9f 0e bc d5 18 47 0a 42 4f 5d 57 78 80 38 e2 e6 e6 1e 63 25 a2 f8 74 da>,
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
      prevTxHash: <Buffer 40 cd a4 1e a0 9f 89 12 0a b3 5c 71 09 05 14 91 94 ff fd 65 7e 45 24 96 8d f9 59 a8 ea a2 aa 86>,
      prevTxesMht: <Buffer 82 31 5f 30 64 22 31 b2 9f 0e bc d5 18 47 0a 42 4f 5d 57 78 80 38 e2 e6 e6 1e 63 25 a2 f8 74 da>,
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
      prevTxHash: <Buffer 1a 8a eb 98 be 88 60 ab 5d 5f 7e 04 9b b5 4a 5d dc 17 da 1f 71 83 f1 80 cc fb 96 e0 7f e7 9c 4e>,
      prevTxesMht: <Buffer 8b f1 4a b2 ea 82 a7 2f fb 1c ff 5f 36 c8 52 53 1e 9e 45 93 99 a2 cf 4c 75 b4 c4 68 b9 07 a7 a5>,
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
    prevTxHash: <Buffer 5c 34 4b 3f 07 c4 29 8c 15 8f 38 50 dc ac 3b 6b e6 2f 8e 2d 40 d7 63 be 57 40 3d 0e a5 7f 24 84>,
    prevTxesMht: <Buffer ad 4b 7c dc 8b 9f ed e8 b0 5d 5b ec b5 b6 22 69 44 6e a5 9b b5 5e b0 a1 f3 97 33 4b 69 09 dc e6>,
    timestamp: Long { low: 1662594788, high: 0, unsigned: false },
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
    prevTxHash: <Buffer b3 86 41 87 6a 60 a7 5f f3 18 66 54 42 b0 e2 4a 53 a9 1b 28 2d d3 b1 45 f3 d8 33 79 f5 00 3d ea>,
    prevTxesMht: <Buffer a4 c1 2d 97 3b 45 53 e2 11 f1 1d fd ae a7 4b da 48 68 48 30 59 4b 6c be 2c 97 74 e1 83 11 87 c5>,
    timestamp: Long { low: 1662594788, high: 0, unsigned: false },
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
      prevTxHash: <Buffer 55 ef fa 11 e4 7e d2 7c a5 5e aa 67 70 b5 8f 4d 05 e5 45 28 d8 fb b6 9b f4 34 53 8a 85 f3 bb 43>,
      prevTxesMht: <Buffer 6a 67 bf 5d 8a ee e1 bd af 6a 19 5f e9 57 ed c6 ba 53 ef ca 7a 35 6f 27 83 ac 77 58 fc bb 60 dd>,
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
      prevTxHash: <Buffer 55 ef fa 11 e4 7e d2 7c a5 5e aa 67 70 b5 8f 4d 05 e5 45 28 d8 fb b6 9b f4 34 53 8a 85 f3 bb 43>,
      prevTxesMht: <Buffer 6a 67 bf 5d 8a ee e1 bd af 6a 19 5f e9 57 ed c6 ba 53 ef ca 7a 35 6f 27 83 ac 77 58 fc bb 60 dd>,
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
      prevTxHash: <Buffer 55 ef fa 11 e4 7e d2 7c a5 5e aa 67 70 b5 8f 4d 05 e5 45 28 d8 fb b6 9b f4 34 53 8a 85 f3 bb 43>,
      prevTxesMht: <Buffer 6a 67 bf 5d 8a ee e1 bd af 6a 19 5f e9 57 ed c6 ba 53 ef ca 7a 35 6f 27 83 ac 77 58 fc bb 60 dd>,
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
  },
  {
    type: 'val',
    txId: Long { low: 9, high: 0, unsigned: true },
    entry: { key: <Buffer 79 6f>, val: <Buffer 6d 61 6e>, meta: undefined },
    expired: false,
    revision: Long { low: 0, high: 0, unsigned: true }
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
    columnId: 1,
    isAscending: true,
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
    columnIsNullable: false,
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
    columnIsNullable: true,
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
    columnIsNullable: true,
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
    columnIsNullable: false,
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
    columnIsNullable: false,
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
    pk: <Buffer 7f ff ff ff ff ff ff fe 80 6b 6b 6b 00 00 00 03>,
    isPKNullable: true,
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
    pk: <Buffer 80 00 00 00 00 00 00 0a 80 79 6f 79 00 00 00 03>,
    isPKNullable: true,
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
    pk: <Buffer 80 00 00 00 00 00 00 0b 80 71 6f 79 00 00 00 03>,
    isPKNullable: true,
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
    created: 2022-09-07T23:53:08.593Z,
    data: 'upsert existing',
    isActive: true
  },
  {
    id1: 10,
    id2: 'yoy',
    created: 2022-09-07T23:53:08.593Z,
    data: 'upsert operation 2',
    isActive: false
  },
  {
    id1: 11,
    id2: 'qoy',
    created: 2022-09-07T23:53:08.593Z,
    data: 'upsert operation 3',
    isActive: true
  }
]
stateAt8
{
  database: 'defaultdb',
  txHash: <Buffer 7c c3 eb 27 7e 6c 14 27 10 54 2d 67 82 ee c7 29 60 45 c1 e9 65 5b b9 ac 11 8e 68 3a e6 44 64 00>,
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
      prevTxHash: <Buffer 7c c3 eb 27 7e 6c 14 27 10 54 2d 67 82 ee c7 29 60 45 c1 e9 65 5b b9 ac 11 8e 68 3a e6 44 64 00>,  
      prevTxesMht: <Buffer fd 81 6e 64 24 e2 20 f0 34 a3 25 33 27 11 5c 9d f2 48 a6 f5 eb 51 77 d7 b7 59 61 75 75 fe 2e df>, 
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
      hash: <Buffer 7c c3 eb 27 7e 6c 14 27 10 54 2d 67 82 ee c7 29 60 45 c1 e9 65 5b b9 ac 11 8e 68 3a e6 44 64 00>
    },
    proof: {
      txTx: [Object],
      refTx: [Object],
      txPrevTxInTxPrevTxesMht: [Array],
      refTxInRefPrevTxesMhtAndTxPrevTxesMht: [Array]
    }
  }
}
```