import { ImmuServiceClient } from '../proto/immudb/schema/ImmuService.js'
import * as promis from '../grpc-promis/index.js'
import { NewTxRequest } from '../proto/immudb/schema/NewTxRequest.js'
import { NewTxResponse__Output } from '../proto/immudb/schema/NewTxResponse.js'
import { OpenSessionRequest } from '../proto/immudb/schema/OpenSessionRequest.js'
import { OpenSessionResponse__Output } from '../proto/immudb/schema/OpenSessionResponse.js'
import { Empty, Empty__Output } from '../proto/google/protobuf/Empty.js'
import { UserList__Output } from '../proto/immudb/schema/UserList.js'
import { ScanRequest } from '../proto/immudb/schema/ScanRequest.js'
import { Entries__Output } from '../proto/immudb/schema/Entries.js'
import { CommittedSQLTx__Output } from '../proto/immudb/schema/CommittedSQLTx.js'
import { SQLExecRequest } from '../proto/immudb/schema/SQLExecRequest.js'
import { SQLQueryRequest } from '../proto/immudb/schema/SQLQueryRequest.js'
import { SQLQueryResult__Output } from '../proto/immudb/schema/SQLQueryResult.js'
import { SQLExecResult__Output } from '../proto/immudb/schema/SQLExecResult.js'
import { Table } from '../proto/immudb/schema/Table.js'
import { VerifiableSQLGetRequest } from '../proto/immudb/schema/VerifiableSQLGetRequest.js'
import { VerifiableSQLEntry__Output } from '../proto/immudb/schema/VerifiableSQLEntry.js'
import { KeyRequest } from '../proto/immudb/schema/KeyRequest.js'
import { Entry__Output } from '../proto/immudb/schema/Entry.js'
import { TxRequest } from '../proto/immudb/schema/TxRequest.js'
import { Tx__Output } from '../proto/immudb/schema/Tx.js'
import { KeyListRequest } from '../proto/immudb/schema/KeyListRequest.js'
import { TxScanRequest } from '../proto/immudb/schema/TxScanRequest.js'
import { TxList__Output } from '../proto/immudb/schema/TxList.js'
import { ZScanRequest } from '../proto/immudb/schema/ZScanRequest.js'
import { ZEntries__Output } from '../proto/immudb/schema/ZEntries.js'
import { HistoryRequest } from '../proto/immudb/schema/HistoryRequest.js'
import { VerifiableGetRequest } from '../proto/immudb/schema/VerifiableGetRequest.js'
import { VerifiableEntry__Output } from '../proto/immudb/schema/VerifiableEntry.js'
import { VerifiableTx__Output } from '../proto/immudb/schema/VerifiableTx.js'
import { VerifiableTxRequest } from '../proto/immudb/schema/VerifiableTxRequest.js'
import { SetRequest } from '../proto/immudb/schema/SetRequest.js'
import { TxHeader__Output } from '../proto/immudb/schema/TxHeader.js'
import { ReferenceRequest } from '../proto/immudb/schema/ReferenceRequest.js'
import { ZAddRequest } from '../proto/immudb/schema/ZAddRequest.js'
import { ExecAllRequest } from '../proto/immudb/schema/ExecAllRequest.js'
import { DeleteKeysRequest } from '../proto/immudb/schema/DeleteKeysRequest.js'
import { VerifiableSetRequest } from '../proto/immudb/schema/VerifiableSetRequest.js'
import { VerifiableReferenceRequest } from '../proto/immudb/schema/VerifiableReferenceRequest.js'
import { VerifiableZAddRequest } from '../proto/immudb/schema/VerifiableZAddRequest.js'
import { CreateUserRequest } from '../proto/immudb/schema/CreateUserRequest.js'
import { ChangePasswordRequest } from '../proto/immudb/schema/ChangePasswordRequest.js'
import { ChangePermissionRequest } from '../proto/immudb/schema/ChangePermissionRequest.js'
import { SetActiveUserRequest } from '../proto/immudb/schema/SetActiveUserRequest.js'
import { DatabaseListRequestV2 } from '../proto/immudb/schema/DatabaseListRequestV2.js'
import { DatabaseListResponseV2__Output } from '../proto/immudb/schema/DatabaseListResponseV2.js'
import { DatabaseSettingsResponse__Output } from '../proto/immudb/schema/DatabaseSettingsResponse.js'
import { DatabaseSettingsRequest } from '../proto/immudb/schema/DatabaseSettingsRequest.js'
import { CreateDatabaseRequest } from '../proto/immudb/schema/CreateDatabaseRequest.js'
import { CreateDatabaseResponse__Output } from '../proto/immudb/schema/CreateDatabaseResponse.js'
import { UpdateDatabaseResponse__Output } from '../proto/immudb/schema/UpdateDatabaseResponse.js'
import { UpdateDatabaseRequest } from '../proto/immudb/schema/UpdateDatabaseRequest.js'
import { Database } from '../proto/immudb/schema/Database.js'
import { UseDatabaseReply__Output } from '../proto/immudb/schema/UseDatabaseReply.js'
import { LoadDatabaseResponse__Output } from '../proto/immudb/schema/LoadDatabaseResponse.js'
import { LoadDatabaseRequest } from '../proto/immudb/schema/LoadDatabaseRequest.js'
import { UnloadDatabaseResponse__Output } from '../proto/immudb/schema/UnloadDatabaseResponse.js'
import { UnloadDatabaseRequest } from '../proto/immudb/schema/UnloadDatabaseRequest.js'
import { FlushIndexResponse__Output } from '../proto/immudb/schema/FlushIndexResponse.js'
import { FlushIndexRequest } from '../proto/immudb/schema/FlushIndexRequest.js'
import { DeleteDatabaseResponse__Output } from '../proto/immudb/schema/DeleteDatabaseResponse.js'
import { DeleteDatabaseRequest } from '../proto/immudb/schema/DeleteDatabaseRequest.js'
import { DatabaseHealthResponse__Output } from '../proto/immudb/schema/DatabaseHealthResponse.js'
import { HealthResponse__Output } from '../proto/immudb/schema/HealthResponse.js'
import { ImmutableState__Output } from '../proto/immudb/schema/ImmutableState.js'



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


