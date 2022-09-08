import { ImmuServiceClient } from 'proto/immudb/schema/ImmuService.js'
import { generate } from './generate.js'
import { wrapReadStreamCall } from './wrapReadStream.js'
import Long from "long"
import * as grpc from '@grpc/grpc-js'

import { OpenSessionRequest } from 'proto/immudb/schema/OpenSessionRequest.js'
import { OpenSessionResponse__Output } from 'proto/immudb/schema/OpenSessionResponse.js'
import { Empty, Empty__Output } from 'proto/google/protobuf/Empty.js'
import { KeyRequest } from 'proto/immudb/schema/KeyRequest.js'
import { Entry__Output } from 'proto/immudb/schema/Entry.js'
import { TxHeader__Output } from 'proto/immudb/schema/TxHeader.js'
import { SetRequest } from 'proto/immudb/schema/SetRequest.js'
import { CreateUserRequest } from 'proto/immudb/schema/CreateUserRequest.js'
import { DatabaseListRequestV2 } from 'proto/immudb/schema/DatabaseListRequestV2.js'
import { DatabaseListResponseV2__Output } from 'proto/immudb/schema/DatabaseListResponseV2.js'
import { UserList__Output } from 'proto/immudb/schema/UserList.js'
import { NewTxRequest } from 'proto/immudb/schema/NewTxRequest.js'
import { NewTxResponse__Output } from 'proto/immudb/schema/NewTxResponse.js'
import { CommittedSQLTx__Output } from 'proto/immudb/schema/CommittedSQLTx.js'
import { ChangePasswordRequest } from 'proto/immudb/schema/ChangePasswordRequest.js'
import { ChangePermissionRequest } from 'proto/immudb/schema/ChangePermissionRequest.js'
import { SetActiveUserRequest } from 'proto/immudb/schema/SetActiveUserRequest.js'
import { CreateDatabaseRequest } from 'proto/immudb/schema/CreateDatabaseRequest.js'
import { CreateDatabaseResponse__Output } from 'proto/immudb/schema/CreateDatabaseResponse.js'
import { UpdateDatabaseRequest } from 'proto/immudb/schema/UpdateDatabaseRequest.js'
import { UpdateDatabaseResponse__Output } from 'proto/immudb/schema/UpdateDatabaseResponse.js'
import { Database } from 'proto/immudb/schema/Database.js'
import { UseDatabaseReply__Output } from 'proto/immudb/schema/UseDatabaseReply.js'
import { LoadDatabaseRequest } from 'proto/immudb/schema/LoadDatabaseRequest.js'
import { LoadDatabaseResponse__Output } from 'proto/immudb/schema/LoadDatabaseResponse.js'
import { UnloadDatabaseRequest } from 'proto/immudb/schema/UnloadDatabaseRequest.js'
import { UnloadDatabaseResponse__Output } from 'proto/immudb/schema/UnloadDatabaseResponse.js'
import { FlushIndexResponse__Output } from 'proto/immudb/schema/FlushIndexResponse.js'
import { FlushIndexRequest } from 'proto/immudb/schema/FlushIndexRequest.js'
import { HealthResponse__Output } from 'proto/immudb/schema/HealthResponse.js'
import { DatabaseSettingsRequest } from 'proto/immudb/schema/DatabaseSettingsRequest.js'
import { DatabaseSettingsResponse__Output } from 'proto/immudb/schema/DatabaseSettingsResponse.js'
import { DeleteDatabaseResponse__Output } from 'proto/immudb/schema/DeleteDatabaseResponse.js'
import { DeleteDatabaseRequest } from 'proto/immudb/schema/DeleteDatabaseRequest.js'
import { DatabaseHealthResponse__Output } from 'proto/immudb/schema/DatabaseHealthResponse.js'
import { VerifiableGetRequest } from 'proto/immudb/schema/VerifiableGetRequest.js'
import { VerifiableEntry__Output } from 'proto/immudb/schema/VerifiableEntry.js'
import { VerifiableSetRequest } from 'proto/immudb/schema/VerifiableSetRequest.js'
import { VerifiableTx__Output } from 'proto/immudb/schema/VerifiableTx.js'
import { ImmutableState__Output } from 'proto/immudb/schema/ImmutableState.js'
import { TxRequest } from 'proto/immudb/schema/TxRequest.js'
import { Tx__Output } from 'proto/immudb/schema/Tx.js'
import { VerifiableTxRequest } from 'proto/immudb/schema/VerifiableTxRequest.js'
import { ZAddRequest } from 'proto/immudb/schema/ZAddRequest.js'
import { ExecAllRequest } from 'proto/immudb/schema/ExecAllRequest.js'
import { VerifiableZAddRequest } from 'proto/immudb/schema/VerifiableZAddRequest.js'
import { SQLQueryRequest } from 'proto/immudb/schema/SQLQueryRequest.js'
import { SQLQueryResult__Output } from 'proto/immudb/schema/SQLQueryResult.js'
import { SQLExecRequest } from 'proto/immudb/schema/SQLExecRequest.js'
import { KeyListRequest } from 'proto/immudb/schema/KeyListRequest.js'
import { Entries__Output } from 'proto/immudb/schema/Entries.js'
import { DeleteKeysRequest } from 'proto/immudb/schema/DeleteKeysRequest.js'
import { ScanRequest } from 'proto/immudb/schema/ScanRequest.js'
import { TxScanRequest } from 'proto/immudb/schema/TxScanRequest.js'
import { TxList__Output } from 'proto/immudb/schema/TxList.js'
import { HistoryRequest } from 'proto/immudb/schema/HistoryRequest.js'
import { VerifiableReferenceRequest } from 'proto/immudb/schema/VerifiableReferenceRequest.js'
import { ReferenceRequest } from 'proto/immudb/schema/ReferenceRequest.js'
import { ZScanRequest } from 'proto/immudb/schema/ZScanRequest.js'
import { ZEntries__Output } from 'proto/immudb/schema/ZEntries.js'
import { ExportTxRequest } from 'proto/immudb/schema/ExportTxRequest.js'
import { SQLExecResult__Output } from 'proto/immudb/schema/SQLExecResult.js'
import { Table } from 'proto/immudb/schema/Table.js'
import { VerifiableSQLGetRequest } from 'proto/immudb/schema/VerifiableSQLGetRequest.js'
import { VerifiableSQLEntry__Output } from 'proto/immudb/schema/VerifiableSQLEntry.js'
import { Chunk, Chunk__Output } from 'proto/immudb/schema/Chunk.js'
import { wrapWriteStreamCall } from './wrapWriteStream.js'
import { createScan } from '../immu-grpc/unary-call.js'





export type ImmudbGrpcApi = ReturnType<typeof generateApi>

export function generateApi(client: ImmuServiceClient) {

    // const someWriteCall = client.makeClientStreamRequest(
    //     'someMethod',
    //     (value: {key: string}) => Buffer.of(),
    //     (value: Buffer) => ({result: 15}),
    //     new grpc.Metadata(),
    //     {
    //         credentials: grpc.credentials.createEmpty()
    //     },
    //     (err, res) => {
    //         console.log(res)
    //     }
    // )
    // someWriteCall.write({key: 'yoyo'}, () => {
    //     console.log('successfully written')
    // })


    // const someReadCall = client.makeServerStreamRequest(
    //     'someMethod',
    //     (value: {key: string}) => Buffer.of(),
    //     (value: Buffer) => ({result: 15}),
    //     {
    //         key: 'yoyo'
    //     },
    //     new grpc.Metadata(),
    //     {
    //         credentials: grpc.credentials.createEmpty()
    //     },
    // )
    // someReadCall.read()

    // const setWriteCall = client.streamSet(
    //     new grpc.Metadata(),
    //     {
    //         credentials: grpc.credentials.createEmpty()
    //     },
    //     (err, res) => {

    //     }
    // )

    

    return {



        // **************************
        // Session
        // **************************

        // openSession: generate(client.openSession.bind(client)),
        openSession: generate<OpenSessionRequest, OpenSessionResponse__Output>(
            (...args) => client.openSession(...args)
        ),
        closeSession: generate<Empty, Empty__Output>(
            (...args) => client.closeSession(...args)
        ),
        keepAlive: generate<Empty, Empty__Output>(
            (...args) => client.keepAlive(...args)
        ),






        // **************************
        // SQL
        // **************************

        startSqlTransaction: generate<NewTxRequest, NewTxResponse__Output>(
            (...args) => client.newTx(...args)
        ),
        commitSqlTransaction: generate<Empty, CommittedSQLTx__Output>(
            (...args) => client.commit(...args)
        ),
        rollbackSqlTransaction: generate<Empty, Empty__Output>(
            (...args) => client.rollback(...args)
        ),


        txSqlExec: generate<SQLExecRequest, Empty__Output>(
            (...args) => client.txSqlExec(...args)
        ),
        txSqlQuery: generate<SQLQueryRequest, SQLQueryResult__Output>(
            (...args) => client.txSqlQuery(...args)
        ),


        sqlExec: generate<SQLExecRequest, SQLExecResult__Output>(
            (...args) => client.sqlExec(...args)
        ),
        sqlQuery: generate<SQLQueryRequest, SQLQueryResult__Output>(
            (...args) => client.sqlQuery(...args)
        ),

        
        listTables: generate<Empty, SQLQueryResult__Output>(
            (...args) => client.listTables(...args)
        ),
        describeTable: generate<Table, SQLQueryResult__Output>(
            (...args) => client.describeTable(...args)
        ),


        

        // **************************
        // SQL and proof
        // **************************

        verifiableSqlGet: generate<VerifiableSQLGetRequest, VerifiableSQLEntry__Output>(
            (...args) => client.verifiableSqlGet(...args)
        ),

        



        // **************************
        // Get Values
        // **************************

        get: generate<KeyRequest, Entry__Output>(
            (...args) => client.get(...args)
        ),
        getTx: generate<TxRequest, Tx__Output>(
            (...args) => client.txById(...args)
        ),
        
        getAll: generate<KeyListRequest, Entries__Output>(
            (...args) => client.getAll(...args)
        ),

        scan: generate<ScanRequest, Entries__Output>(
            (...args) => client.scan(...args)
        ),
        // scan: generateScan(client),
        txScan: generate<TxScanRequest, TxList__Output>(
            (...args) => client.txScan(...args)
        ),
        zScan: generate<ZScanRequest, ZEntries__Output>(
            (...args) => client.zScan(...args)
        ),
        history: generate<HistoryRequest, Entries__Output>(
            (...args) => client.history(...args)
        ),


        streamGet: wrapReadStreamCall<KeyRequest, Chunk__Output>(
            (...args) => client.streamGet(...args)
        ),
        streamScan: wrapReadStreamCall<ScanRequest, Chunk__Output>(
            (...args) => client.streamScan(...args)
        ),
        streamZScan: wrapReadStreamCall<ZScanRequest, Chunk__Output>(
            (...args) => client.streamZScan(...args)
        ),
        streamHistory: wrapReadStreamCall<HistoryRequest, Chunk__Output>(
            (...args) => client.streamHistory(...args)
        ),

        // **************************
        // Get Values and proof
        // **************************

        verifiableGet: generate<VerifiableGetRequest, VerifiableEntry__Output>(
            (...args) => client.verifiableGet(...args)
        ),
        verifableGetTx: generate<VerifiableTxRequest, VerifiableTx__Output>(
            (...args) => client.verifiableTxById(...args)
        ),
        streamGetAndProof: wrapReadStreamCall<VerifiableGetRequest, Chunk__Output>(
            (...args) => client.streamVerifiableGet(...args)
        ),





        // **************************
        // Set Values
        // **************************

        zAdd: generate<ZAddRequest, TxHeader__Output>(
            (...args) => client.zAdd(...args)
        ),
        set: generate<SetRequest, TxHeader__Output>(
            (...args) => client.set(...args)
        ),
        setRef: generate<ReferenceRequest, TxHeader__Output>(
            (...args) => client.setReference(...args)
        ),
        execAll: generate<ExecAllRequest, TxHeader__Output>(
            (...args) => client.execAll(...args)
        ),
        delete: generate<DeleteKeysRequest, TxHeader__Output>(
            (...args) => client.delete(...args)
        ),


        
        streamSet: wrapWriteStreamCall<Chunk, TxHeader__Output>(
            (...args) => client.streamSet(...args)
        ),
        streamExecAll: wrapWriteStreamCall<Chunk, TxHeader__Output>(
            (...args) => client.streamExecAll(...args)
        ),


        
        
        // **************************
        // Set Values and proof
        // **************************
        
        verifiableSet: generate<VerifiableSetRequest, VerifiableTx__Output>(
            (...args) => client.verifiableSet(...args)
        ),
        verifiableZAdd: generate<VerifiableZAddRequest, VerifiableTx__Output>(
            (...args) => client.verifiableZAdd(...args)
        ),
        verifiableSetRef: generate<VerifiableReferenceRequest, VerifiableTx__Output>(
            (...args) => client.verifiableSetReference(...args)
        ),
        streamSetAndProof: wrapWriteStreamCall<Chunk, VerifiableTx__Output>(
            (...args) => client.streamVerifiableSet(...args)
        ),



        


        

        // **************************
        // User
        // **************************

        createUser: generate<CreateUserRequest, Empty__Output>(
            (...args) => client.createUser(...args)
        ),
        listUsers: generate<Empty, UserList__Output>(
            (...args) => client.listUsers(...args)
        ),
        changePassword: generate<ChangePasswordRequest, Empty__Output>(
            (...args) => client.changePassword(...args)
        ),
        changePermission: generate<ChangePermissionRequest, Empty__Output>(
            (...args) => client.changePermission(...args)
        ),
        setUserActive: generate<SetActiveUserRequest, Empty__Output>(
            (...args) => client.setActiveUser(...args)
        ),







        // **************************
        // Database
        // **************************

        listDatabases: generate<DatabaseListRequestV2, DatabaseListResponseV2__Output>(
            (...args) => client.databaseListV2(...args)
        ),
        getDatabase: generate<DatabaseSettingsRequest, DatabaseSettingsResponse__Output>(
            (...args) => client.getDatabaseSettingsV2(...args)
        ),
        createDatabase: generate<CreateDatabaseRequest, CreateDatabaseResponse__Output>(
            (...args) => client.createDatabaseV2(...args)
        ),
        updateDatabase: generate<UpdateDatabaseRequest, UpdateDatabaseResponse__Output>(
            (...args) => client.updateDatabaseV2(...args)
        ),
        useDatabase: generate<Database, UseDatabaseReply__Output>(
            (...args) => client.useDatabase(...args)
        ),
        loadDatabase: generate<LoadDatabaseRequest, LoadDatabaseResponse__Output>(
            (...args) => client.loadDatabase(...args)
        ),
        unloadDatabase: generate<UnloadDatabaseRequest, UnloadDatabaseResponse__Output>(
            (...args) => client.unloadDatabase(...args)
        ),
        compactIndex: generate<Empty, Empty__Output>(
            (...args) => client.compactIndex(...args)
        ),
        flushIndex: generate<FlushIndexRequest, FlushIndexResponse__Output>(
            (...args) => client.flushIndex(...args)
        ),
        deleteDatabase: generate<DeleteDatabaseRequest, DeleteDatabaseResponse__Output>(
            (...args) => client.deleteDatabase(...args)
        ),
        databaseHealth: generate<Empty, DatabaseHealthResponse__Output>(
            (...args) => client.databaseHealth(...args)
        ),







        // **************************
        // Instance
        // **************************
        health: generate<Empty, HealthResponse__Output>(
            (...args) => client.health(...args)
        ),
        state: generate<Empty, ImmutableState__Output>(
            (...args) => client.currentState(...args)
        ),
        // exportTx: generate<ExportTxRequest, ImmutableState__Output>(
        //     (...args) => client.exportTx(...args)
        // ),
        // replicateTx: generate<Empty, TxHeader__Output>(
        //     (...args) => client.replicateTx(...args)
        // ),
        
    }
}








