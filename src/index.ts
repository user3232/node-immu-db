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
        set: zSetEntry5.entry.zSet,
    })
    console.log('scanZEntriesAt6:')
    console.log(scanZEntriesAt6)


    const scanValRefEntriesAt6 = await client.scanValRefEntries({
        scanSkipToKey: valEntries2[1].entry.key,
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







