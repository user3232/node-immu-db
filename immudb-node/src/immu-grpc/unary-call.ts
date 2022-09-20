import { ImmuServiceClient } from 'immudb-grpcjs/immudb/schema/ImmuService.js'
import * as promis from '../grpc-promis/index.js'
import { NewTxRequest } from 'immudb-grpcjs/immudb/schema/NewTxRequest.js'
import { NewTxResponse__Output } from 'immudb-grpcjs/immudb/schema/NewTxResponse.js'
import { OpenSessionRequest } from 'immudb-grpcjs/immudb/schema/OpenSessionRequest.js'
import { OpenSessionResponse__Output } from 'immudb-grpcjs/immudb/schema/OpenSessionResponse.js'
import { Empty, Empty__Output } from 'immudb-grpcjs/google/protobuf/Empty.js'
import { UserList__Output } from 'immudb-grpcjs/immudb/schema/UserList.js'
import { ScanRequest } from 'immudb-grpcjs/immudb/schema/ScanRequest.js'
import { Entries__Output } from 'immudb-grpcjs/immudb/schema/Entries.js'
import { CommittedSQLTx__Output } from 'immudb-grpcjs/immudb/schema/CommittedSQLTx.js'
import { SQLExecRequest } from 'immudb-grpcjs/immudb/schema/SQLExecRequest.js'
import { SQLQueryRequest } from 'immudb-grpcjs/immudb/schema/SQLQueryRequest.js'
import { SQLQueryResult__Output } from 'immudb-grpcjs/immudb/schema/SQLQueryResult.js'
import { SQLExecResult__Output } from 'immudb-grpcjs/immudb/schema/SQLExecResult.js'
import { Table } from 'immudb-grpcjs/immudb/schema/Table.js'
import { VerifiableSQLGetRequest } from 'immudb-grpcjs/immudb/schema/VerifiableSQLGetRequest.js'
import { VerifiableSQLEntry__Output } from 'immudb-grpcjs/immudb/schema/VerifiableSQLEntry.js'
import { KeyRequest } from 'immudb-grpcjs/immudb/schema/KeyRequest.js'
import { Entry__Output } from 'immudb-grpcjs/immudb/schema/Entry.js'
import { TxRequest } from 'immudb-grpcjs/immudb/schema/TxRequest.js'
import { Tx__Output } from 'immudb-grpcjs/immudb/schema/Tx.js'
import { KeyListRequest } from 'immudb-grpcjs/immudb/schema/KeyListRequest.js'
import { TxScanRequest } from 'immudb-grpcjs/immudb/schema/TxScanRequest.js'
import { TxList__Output } from 'immudb-grpcjs/immudb/schema/TxList.js'
import { ZScanRequest } from 'immudb-grpcjs/immudb/schema/ZScanRequest.js'
import { ZEntries__Output } from 'immudb-grpcjs/immudb/schema/ZEntries.js'
import { HistoryRequest } from 'immudb-grpcjs/immudb/schema/HistoryRequest.js'
import { VerifiableGetRequest } from 'immudb-grpcjs/immudb/schema/VerifiableGetRequest.js'
import { VerifiableEntry__Output } from 'immudb-grpcjs/immudb/schema/VerifiableEntry.js'
import { VerifiableTx__Output } from 'immudb-grpcjs/immudb/schema/VerifiableTx.js'
import { VerifiableTxRequest } from 'immudb-grpcjs/immudb/schema/VerifiableTxRequest.js'
import { SetRequest } from 'immudb-grpcjs/immudb/schema/SetRequest.js'
import { TxHeader__Output } from 'immudb-grpcjs/immudb/schema/TxHeader.js'
import { ReferenceRequest } from 'immudb-grpcjs/immudb/schema/ReferenceRequest.js'
import { ZAddRequest } from 'immudb-grpcjs/immudb/schema/ZAddRequest.js'
import { ExecAllRequest } from 'immudb-grpcjs/immudb/schema/ExecAllRequest.js'
import { DeleteKeysRequest } from 'immudb-grpcjs/immudb/schema/DeleteKeysRequest.js'
import { VerifiableSetRequest } from 'immudb-grpcjs/immudb/schema/VerifiableSetRequest.js'
import { VerifiableReferenceRequest } from 'immudb-grpcjs/immudb/schema/VerifiableReferenceRequest.js'
import { VerifiableZAddRequest } from 'immudb-grpcjs/immudb/schema/VerifiableZAddRequest.js'
import { CreateUserRequest } from 'immudb-grpcjs/immudb/schema/CreateUserRequest.js'
import { ChangePasswordRequest } from 'immudb-grpcjs/immudb/schema/ChangePasswordRequest.js'
import { ChangePermissionRequest } from 'immudb-grpcjs/immudb/schema/ChangePermissionRequest.js'
import { SetActiveUserRequest } from 'immudb-grpcjs/immudb/schema/SetActiveUserRequest.js'
import { DatabaseListRequestV2 } from 'immudb-grpcjs/immudb/schema/DatabaseListRequestV2.js'
import { DatabaseListResponseV2__Output } from 'immudb-grpcjs/immudb/schema/DatabaseListResponseV2.js'
import { DatabaseSettingsResponse__Output } from 'immudb-grpcjs/immudb/schema/DatabaseSettingsResponse.js'
import { DatabaseSettingsRequest } from 'immudb-grpcjs/immudb/schema/DatabaseSettingsRequest.js'
import { CreateDatabaseRequest } from 'immudb-grpcjs/immudb/schema/CreateDatabaseRequest.js'
import { CreateDatabaseResponse__Output } from 'immudb-grpcjs/immudb/schema/CreateDatabaseResponse.js'
import { UpdateDatabaseResponse__Output } from 'immudb-grpcjs/immudb/schema/UpdateDatabaseResponse.js'
import { UpdateDatabaseRequest } from 'immudb-grpcjs/immudb/schema/UpdateDatabaseRequest.js'
import { Database } from 'immudb-grpcjs/immudb/schema/Database.js'
import { UseDatabaseReply__Output } from 'immudb-grpcjs/immudb/schema/UseDatabaseReply.js'
import { LoadDatabaseResponse__Output } from 'immudb-grpcjs/immudb/schema/LoadDatabaseResponse.js'
import { LoadDatabaseRequest } from 'immudb-grpcjs/immudb/schema/LoadDatabaseRequest.js'
import { UnloadDatabaseResponse__Output } from 'immudb-grpcjs/immudb/schema/UnloadDatabaseResponse.js'
import { UnloadDatabaseRequest } from 'immudb-grpcjs/immudb/schema/UnloadDatabaseRequest.js'
import { FlushIndexResponse__Output } from 'immudb-grpcjs/immudb/schema/FlushIndexResponse.js'
import { FlushIndexRequest } from 'immudb-grpcjs/immudb/schema/FlushIndexRequest.js'
import { DeleteDatabaseResponse__Output } from 'immudb-grpcjs/immudb/schema/DeleteDatabaseResponse.js'
import { DeleteDatabaseRequest } from 'immudb-grpcjs/immudb/schema/DeleteDatabaseRequest.js'
import { DatabaseHealthResponse__Output } from 'immudb-grpcjs/immudb/schema/DatabaseHealthResponse.js'
import { HealthResponse__Output } from 'immudb-grpcjs/immudb/schema/HealthResponse.js'
import { ImmutableState__Output } from 'immudb-grpcjs/immudb/schema/ImmutableState.js'



// **************************
// Session
// **************************

export function createOpenSession(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<OpenSessionRequest, OpenSessionResponse__Output>(
        client.openSession.bind(client)
    )
}

export function createCloseSession(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<Empty, Empty__Output>(
        client.closeSession.bind(client)
    )
}

export function createKeepAlive(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<Empty, Empty__Output>(
        client.keepAlive.bind(client)
    )
}


// **************************
// SQL transactional
// **************************


export function createNewTx(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<NewTxRequest, NewTxResponse__Output>(
        client.newTx.bind(client)
    )
}

export function createCommit(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<Empty, CommittedSQLTx__Output>(
        client.commit.bind(client)
    )
} 

export function createRollback(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<Empty, Empty__Output>(
        client.rollback.bind(client)
    )
} 



export function createTxSqlExec(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<SQLExecRequest, Empty__Output>(
        client.txSqlExec.bind(client)
    )
} 

export function createTxSqlQuery(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<SQLQueryRequest, SQLQueryResult__Output>(
        client.txSqlQuery.bind(client)
    )
} 

// **************************
// SQL
// **************************

export function createSqlExec(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<SQLExecRequest, SQLExecResult__Output>(
        client.sqlExec.bind(client)
    )
} 

export function createSqlQuery(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<SQLQueryRequest, SQLQueryResult__Output>(
        client.sqlQuery.bind(client)
    )
} 


// **************************
// SQL util
// **************************

export function createListTables(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<Empty, SQLQueryResult__Output>(
        client.listTables.bind(client)
    )
} 

export function createDescribeTable(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<Table, SQLQueryResult__Output>(
        client.describeTable.bind(client)
    )
} 

// **************************
// SQL and proof
// **************************

export function createVerifiableSqlGet(client: ImmuServiceClient) {
    
    return promis.promisifyGrpcCall<VerifiableSQLGetRequest, VerifiableSQLEntry__Output>(
        client.verifiableSqlGet.bind(client)
    )
} 





// **************************
// Get Values
// **************************

export function createGet(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<KeyRequest, Entry__Output>(
        client.get.bind(client)
    )
}

export function createGetAll(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<KeyListRequest, Entries__Output>(
        client.getAll.bind(client)
    )
}

export function createTxById(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<TxRequest, Tx__Output>(
        client.txById.bind(client)
    )
}

export function createScan(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<ScanRequest, Entries__Output>(
        client.scan.bind(client)
    )
}

export function createTxScan(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<TxScanRequest, TxList__Output>(
        client.txScan.bind(client)
    )
}

export function createZScan(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<ZScanRequest, ZEntries__Output>(
        client.zScan.bind(client)
    )
}

export function createHistory(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<HistoryRequest, Entries__Output>(
        client.history.bind(client)
    )
}

// **************************
// Get Values and proof
// **************************

export function createVerifiableGet(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<VerifiableGetRequest, VerifiableEntry__Output>(
        client.verifiableGet.bind(client)
    )
}

export function createVerifiableTxById(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<VerifiableTxRequest, VerifiableTx__Output>(
        client.verifiableTxById.bind(client)
    )
}


// **************************
// Set Values
// **************************

export function createSet(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<SetRequest, TxHeader__Output>(
        client.set.bind(client)
    )
}

export function createSetReference(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<ReferenceRequest, TxHeader__Output>(
        client.setReference.bind(client)
    )
}

export function createZAdd(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<ZAddRequest, TxHeader__Output>(
        client.zAdd.bind(client)
    )
}

export function createExecAll(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<ExecAllRequest, TxHeader__Output>(
        client.execAll.bind(client)
    )
}

export function createDelete(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<DeleteKeysRequest, TxHeader__Output>(
        client.delete.bind(client)
    )
}


// **************************
// Set Values and proof
// **************************


export function createVerifiableSet(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<VerifiableSetRequest, VerifiableTx__Output>(
        client.verifiableSet.bind(client)
    )
}

export function createVerifiableSetReference(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<VerifiableReferenceRequest, VerifiableTx__Output>(
        client.verifiableSetReference.bind(client)
    )
}

export function createVerifiableZAdd(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<VerifiableZAddRequest, VerifiableTx__Output>(
        client.verifiableZAdd.bind(client)
    )
}

// **************************
// User
// **************************

export function createCreateUsers(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<CreateUserRequest, Empty__Output>(
        client.createUser.bind(client)
    )
}

export function createListUsers(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<Empty, UserList__Output>(
        client.listUsers.bind(client)
    )
}

export function createChangePassword(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<ChangePasswordRequest, Empty__Output>(
        client.changePassword.bind(client)
    )
}

export function createChangePermission(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<ChangePermissionRequest, Empty__Output>(
        client.changePermission.bind(client)
    )
}

export function createSetActiveUser(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<SetActiveUserRequest, Empty__Output>(
        client.setActiveUser.bind(client)
    )
}

// **************************
// Database
// **************************

export function createDatabaseListV2(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<DatabaseListRequestV2, DatabaseListResponseV2__Output>(
        client.databaseListV2.bind(client)
    )
}

export function createGetDatabaseSettingsV2(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<DatabaseSettingsRequest, DatabaseSettingsResponse__Output>(
        client.getDatabaseSettingsV2.bind(client)
    )
}

export function createCreateDatabaseV2(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<CreateDatabaseRequest, CreateDatabaseResponse__Output>(
        client.createDatabaseV2.bind(client)
    )
}

export function createUpdateDatabaseV2(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<UpdateDatabaseRequest, UpdateDatabaseResponse__Output>(
        client.updateDatabaseV2.bind(client)
    )
}

export function createUseDatabase(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<Database, UseDatabaseReply__Output>(
        client.useDatabase.bind(client)
    )
}

export function createLoadDatabase(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<LoadDatabaseRequest, LoadDatabaseResponse__Output>(
        client.loadDatabase.bind(client)
    )
}

export function createUnloadDatabase(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<UnloadDatabaseRequest, UnloadDatabaseResponse__Output>(
        client.unloadDatabase.bind(client)
    )
}

export function createCompactIndex(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<Empty, Empty__Output>(
        client.compactIndex.bind(client)
    )
}

export function createFlushIndex(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<FlushIndexRequest, FlushIndexResponse__Output>(
        client.flushIndex.bind(client)
    )
}

export function createDeleteDatabase(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<DeleteDatabaseRequest, DeleteDatabaseResponse__Output>(
        client.deleteDatabase.bind(client)
    )
}

export function createDatabaseHealth(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<Empty, DatabaseHealthResponse__Output>(
        client.databaseHealth.bind(client)
    )
}


// **************************
// Instance
// **************************


export function createHealth(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<Empty, HealthResponse__Output>(
        client.health.bind(client)
    )
}

export function createCurrentState(client: ImmuServiceClient) {
    return promis.promisifyGrpcCall<Empty, ImmutableState__Output>(
        client.currentState.bind(client)
    )
}


