import * as api from './immu-api/index.js'
import * as session from './immu-session.js'
import * as grpcjs from '@grpc/grpc-js'
import type * as types from './types/index.js'
import { grpcClientFactory } from './grpc-client.js'
import { ImmuServiceClient } from './proto/immudb/schema/ImmuService.js'
import * as kmv from 'immu-kvm/index.js'
import Long from 'long'
import { RefEntryVerifiable, ValEntryVerifiable } from './types/index.js'









function createImmuGrpcApi(grpcClient: ImmuServiceClient) {
    return {
        // session
        openSession:            api.createOpenSession(grpcClient),
        closeSession:           api.createCloseSession(grpcClient),
        keepAlive:              api.createKeepAlive(grpcClient),
        useDb:                  api.createUseDb(grpcClient),


        // user
        createUser:             api.createCreateUser(grpcClient),
        listUsers:              api.createListUsers(grpcClient),
        setUserActive:          api.createSetUserActive(grpcClient),
        setUserPassword:        api.createSetUserPassword(grpcClient),
        setUserDbPermissions:   api.createSetUserDbPermissions(grpcClient),


        // db
        createDb:               api.createCreateDb(grpcClient),
        loadDb:                 api.createLoadDb(grpcClient),
        unloadDb:               api.createUnloadDb(grpcClient),
        deleteDb:               api.createDeleteDb(grpcClient),
        flushDbIndex:           api.createFlushDbIndex(grpcClient),
        compactDbIndex:         api.createCompactDbIndex(grpcClient),
        listDbs:                api.createListDbs(grpcClient),
        getDbSettings:          api.createGetDbSettings(grpcClient),
        getDbCurrentState:      api.createGetDbCurrentState(grpcClient),
        setDbSettings:          api.createSetDbSettings(grpcClient),



        // gets
        scanValRefEntries:          api.createScanValRefEntries(grpcClient),
        scanValRefEntriesStreaming: api.createScanValRefEntriesStreaming(grpcClient),
        scanZEntries:               api.createScanZEntries(grpcClient),
        scanZEntriesStreaming:      api.createScanZEntriesStreaming(grpcClient),
        scanTxes:                   api.createScanTxes(grpcClient),
        scanDbEntries:              api.createScanDb(grpcClient),
        scanHistory:                api.createScanHistory(grpcClient),
        scanHistoryStreaming:       api.createScanHistoryStreaming(grpcClient),
        getTxWithEntries:           api.createGetTxWithEntries(grpcClient),
        getTxGenericEntries:        api.createGetTxGenericEntries(grpcClient),
        getValRef:                  api.createGetValRef(grpcClient),
        getValRefs:                 api.createGetValRefs(grpcClient),
        getValRefStreaming:         api.createGetValRefStreaming(grpcClient),


        // sets
        setValRefZSetEntries:       api.createSetEntries(grpcClient),
        setValZSetEntriesStreaming: api.createSetEntriesStreaming(grpcClient),
        setValEntries:              api.createSetValEntries(grpcClient),
        setValEntriesStreaming:     api.createSetValEntriesStreaming(grpcClient),
        setZSetEntry:               api.createSetZSetEntry(grpcClient),
        setRefEntry:                api.createSetRefEntry(grpcClient),
        deleteValRef:               api.createDeleteValRef(grpcClient),
        
        
        // sql
        sqlExec:                    api.createSqlExec(grpcClient),
        sqlQuery:                   api.createSqlQuery(grpcClient),
        sqlQueryTable:              api.createSqlQueryTable(grpcClient),
        sqlQueryTables:             api.createSqlQueryTables(grpcClient),
        
        // sql tx
        sqlTxNew:                   api.createSqlTxNew(grpcClient),
        sqlTxCommit:                api.createSqlTxCommit(grpcClient),
        sqlTxRollback:              api.createSqlTxRollback(grpcClient),
        sqlTxExec:                  api.createSqlTxExec(grpcClient),
        sqlTxQuery:                 api.createSqlTxQuery(grpcClient),
        
        // instance 
        replicateTx:                api.createReplicateTx(grpcClient),
        exportTx:                   api.createExportTx(grpcClient),
        
        
        // with verification
        setValEntriesGetProof:      api.createSetValEntriesGetProof(grpcClient),
        getTxAndVerification:       api.createGetTxAndVerification(grpcClient),
    }
}









export class Client {
    private readonly conf:              Config
    private readonly immuGrpcClient:    ImmuServiceClient
    private readonly immuGrpcApi:       ReturnType<typeof createImmuGrpcApi>
    private sessionTokens?:             types.SessionTokens
    private callCredentials?:           grpcjs.CallCredentials

    constructor(conf: Config) {
        this.conf = conf
        this.immuGrpcClient = grpcClientFactory({
            address:        buildAddress(this.conf),
            credentials:    grpcjs.credentials.createInsecure(),
            options: {
                "grpc.max_send_message_length":     1<<4<<10<<10,   // 32 MB
                "grpc.max_receive_message_length":  1<<4<<10<<10,   // 32 MB
            }
        })
        this.immuGrpcApi = createImmuGrpcApi(this.immuGrpcClient)
    }





    



    // **********************************************************
    // session
    // **********************************************************






    /**
     * Gets and caches session tokens.
     */
    private async getSessionTokens() {
        if(this.sessionTokens) {
            return this.sessionTokens
        }

        this.sessionTokens = await this.immuGrpcApi.openSession(this.conf)
        return this.sessionTokens
    }

    /**
     * Creates and caches session credentials.
     */
    private async getCallCredentials() {
        if(this.callCredentials) {
            return this.callCredentials
        }

        this.callCredentials = session.createImmuGrpcCallCredentials(
            await this.getSessionTokens()
        )

        return this.callCredentials
    }


    /**
     * Clears stored session tokens and credentials and closses session
     * with ImmuDb
     */
    async close() {
        await this.immuGrpcApi.closeSession(await this.getCallCredentials())
        this.sessionTokens = undefined
        this.callCredentials = undefined
    }

    /** 
     * Asks ImmuDb to not close (idle?) connection.
     */
    async keepAlive() {
        return this.immuGrpcApi.keepAlive({
            credentials:    await this.getCallCredentials(),
        })
    }





    // **********************************************************
    // setting values
    // **********************************************************





    /** 
     * Sets multiple ValEntries, RefEntries or ZSetEntries in one transaction.
     */
    async setValRefZSetEntries(
        props: api.SetEntryProps
    ) {
        return this.immuGrpcApi.setValRefZSetEntries({
            ...props,
            credentials:    await this.getCallCredentials()
        })
    }

    

    /** 
     * Sets multiple ValEntries or ZSetEntries in one transaction.
     */
    async setValZSetEntriesStreaming(
        props: api.SetEntriesStreamingProps 
    ) {
        return this.immuGrpcApi.setValZSetEntriesStreaming({
            ...props,
            credentials:    await this.getCallCredentials()
        })
    }


    /** 
     * Sets all value entries in one transaction.
     */
    async setValEntries(
        props: api.SetVEntryProps
    ) {
        return this.immuGrpcApi.setValEntries({
            kvs:            props.kvs,
            preconditions:  props.preconditions,
            options:        props.options,
            credentials:    await this.getCallCredentials()
        })
    }


    /** 
     * Sets all value entries in one transaction. Verifies verification
     * structure.
     *
     * Returns entries set and verification structure of transaction.
     */
     async setValEntriesAndVerify(
        props: api.SetVEntryProps & api.ProofRequestProps
    ) {
        return this.immuGrpcApi.setValEntriesGetProof({
            ...props,
            credentials:    await this.getCallCredentials()
        })
    }

    /** 
     * Sets multiple ValEntries in one transaction.
     */
    async setValEntriesStreaming(
        props: api.SetValEntriesStreamingProps 
    ) {
        return this.immuGrpcApi.setValEntriesStreaming({
            ...props,
            credentials:    await this.getCallCredentials()
        })
    }

    /** 
     * Sets ZEntry in one transaction.
     */
    async setZSetEntry(
        props: api.SetZEntryProps
    ) {
        return this.immuGrpcApi.setZSetEntry({
            ...props,
            credentials:    await this.getCallCredentials()
        })
    }


    /** 
     * Sets RefEntry in one transaction.
     */
    async setRefEntry(
        props: api.SetRefEntryProps
    ) {
        return this.immuGrpcApi.setRefEntry({
            ...props,
            credentials:    await this.getCallCredentials()
        })
    }


    
    /**
     * Deletes keys or references to keys in one transaction.
     * 
     * Key or reference to key **marked** as deleted will be ignored
     * by the indexer (e.g. {@link Client.getValRef} method) seeing database
     * at this operation transaction and further transactions if key
     * will not be set once more.
     */
    async deleteValRef(props: api.DeleteValRefProps) {
        // const entriesToDelete = await this.getAll(props)
        const delTx = await this.immuGrpcApi.deleteValRef({
            ...props,
            credentials: await this.getCallCredentials(),
        })
        const delTxEntries = await this.scanDbEntries({
            seenSinceTxId: props.seenSinceTxId,
            scanStartAtTxId: delTx.id,
            limit: 1,
        })

        type X1 = kmv.EntryRef & { entryTxId: Long; entryId: number; }
        type X2 = kmv.EntryVal & { entryTxId: Long; entryId: number; }
        const delTxRefOrValEntries = delTxEntries.filter<X1 | X2>(
            function(x: kmv.EntryGeneric): x is X1 | X2  {
                return x.type === 'reference' || x.type === 'value'
            }
        )

        return delTxRefOrValEntries.map((refOrVal, refOrValIndex) => {
            switch(refOrVal.type) {
                case 'reference': {
                    const ref: RefEntryVerifiable = {
                        type: 'ref',
                        entry: {
                            key:                refOrVal.key,
                            refKey:             refOrVal.refKey,
                            refKeySeenFromTxId: refOrVal.refKeySeenFromTxId,
                            meta:               refOrVal.meta,
                        },
                        txId: delTx.id,
                        tx: delTx,
                        id: refOrValIndex + 1,
                    }
                    return ref
                }
                case 'value': {
                    const ref: ValEntryVerifiable = {
                        type: 'val',
                        entry: {
                            key:                refOrVal.key,
                            val:                refOrVal.val,
                            meta:               refOrVal.meta,
                        },
                        txId: delTx.id,
                        tx: delTx,
                        id: refOrValIndex + 1,
                    }
                    return ref
                }
            }
        })

        
    }





    // **********************************************************
    // getting values
    // **********************************************************








    /** 
     * Scans database VEntries and RefEntries in one transaction.
     */
    async scanValRefEntries(props?: api.ScanValRefEntriesProps) {
        return this.immuGrpcApi.scanValRefEntries({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }

    /** 
     * Scans database VEntries and RefEntries in one transaction.
     * Returns output as stream.
     */
     async scanValRefEntriesStreaming(props: api.ScanValRefEntriesProps) {
        return this.immuGrpcApi.scanValRefEntriesStreaming({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }

    /** 
     * Scans database ZEntries in one transaction.
     */
     async scanZEntries(props: api.ScanZSetEntriesProps) {
        return this.immuGrpcApi.scanZEntries({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }


    /** 
     * Scans database ZEntries in one transaction.
     * Returns output as stream.
     */
    async scanZEntriesStreaming(props: api.ScanZSetEntriesProps) {
        return this.immuGrpcApi.scanZEntriesStreaming({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }
    


    /** 
     * Scans database transactions in one transaction. This is most fundamental
     * operation of ImmuDb.
     *
     * Result is composed in following way:
     * - entries are filtered out for actions:
     *   - `EXCLUDE`,
     * - entries go ordered into `entries` array fild for actions:
     *   - `RAW_VALUE`,
     *   - `ONLY_DIGEST`,
     *   - `undefined`,
     * - KV entries go ordered into `kvEntries` array fild for
     *   `kvOrRefEntryAction` action:
     *   - `RESOLVE`,
     * - Z entries go ordered into `zEntries` array fild for `zEntryAction`
     *   action:
     *   - `RESOLVE`,
     *
     * Transactions are ordered with transaction id, however depending on
     * operation parameters it may not be sequential (`RESOLVE` action will
     * cause values to go to separate arrays, `EXCLUDE` will filter them out).
     *
     * To obtain sequential transactions ordering set all actions as:
     * - `RAW_VALUE` or
     * - `ONLY_DIGEST`.
     */
    async scanTxes(props: api.ScanTxesProps) {
        return this.immuGrpcApi.scanTxes({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }



    /** 
     * Scans database transaction entries.
     *
     * Result is composed in following way:
     * - entries are filtered out for actions:
     *   - `EXCLUDE`,
     * - entries go ordered into `entries` array fild for actions:
     *   - `RAW_VALUE`,
     *   - `ONLY_DIGEST`,
     *   - `undefined`,
     * - KV entries go ordered into `kvEntries` array fild for
     *   `kvOrRefEntryAction` action:
     *   - `RESOLVE`,
     * - Z entries go ordered into `zEntries` array fild for `zEntryAction`
     *   action:
     *   - `RESOLVE`,
     *
     * To obtain sequential entries ordering set all actions to:
     * - `RAW_VALUE` or
     * - `ONLY_DIGEST`.
     */
    async getTxWithEntries(props: api.GetTxWithEntriesProps) {
        return this.immuGrpcApi.getTxWithEntries({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }

    /**
     * Gets value, ref, zSet entries of transaction heaving specified id.
     * Obtained entries are verifiable.
     */
    async getTxGenericEntries(props: api.GetTxWGenericEntriesProps) {
        return this.immuGrpcApi.getTxGenericEntries({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }


    /**
     * Gets value for provided key in one transaction. Key may refer to value or
     * reference.
     */
    async getValRef(props: api.GetValRefProps) {
        return this.immuGrpcApi.getValRef({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }

    
    /**
     * Gets value for provided key in one transaction. Key may refer to value or
     * reference.
     */
     async getValRefStreaming(props: api.GetValRefProps) {
        return this.immuGrpcApi.getValRefStreaming({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }

    /**
     * Gets values and refs for all provided keys.
     */
    async getValRefs(props: api.GetAllValRefsProps) {
        return this.immuGrpcApi.getValRefs({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }



    /**
     * Scans all database entries in one transaction.
     */
    async scanDbEntries(props: api.ScanDBProps) {
        return this.immuGrpcApi.scanDbEntries({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }


    /**
     * Scans entry history.
     */
    async scanHistory(props: api.GetHistoryProps) {
        return this.immuGrpcApi.scanHistory({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }



    /**
     * Scans entry history.
     * Returns output as stream.
     */
    async scanHistoryStreaming(props: api.GetHistoryProps) {
        return this.immuGrpcApi.scanHistoryStreaming({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }



    // **********************************************************
    // sql
    // **********************************************************







    /**
     * Sql queries DB in one transaction. (Multiple result sets?)
     */
    async sqlQuery(props: api.SqlQueryProps) {
        return this.immuGrpcApi.sqlQuery({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }


    /**
     * Queries current db for sql tables.
     */
    async sqlQueryTables(props: api.SqlQueryProps) {
        return this.immuGrpcApi.sqlQueryTables({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }


    /**
     * Queries sql table schema.
     */
    async sqlQueryTable(table: string) {
        return this.immuGrpcApi.sqlQueryTable({
            table,
            credentials: await this.getCallCredentials(),
        })
    }


    /**
     * Executes sql batch as one transaction.
     */
    async sqlExec(props: api.SqlExecProps) {
        return this.immuGrpcApi.sqlExec({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }



    /**
     * Executes interactive sql transaction. Transaction will be:
     * - commited if no errors will be thrown,
     * - rolled back if:
     *   - there are sql errors
     *   - user throws
     * 
     * Committing transaction example:
     * 
     * ```ts
     * 
     * client.executeSqlTx(
     *     'ReadWrite', 
     *     async txApi => {
     *         const testTable = await txApi.query({sql: `
     *             select * from testtable;
     *         `})
     *         txApi.exec({sql: `
     *             insert into testtable 
     *                 (id, value) 
     *             values 
     *                 (1, 'yoyo');
     *         `})
     *     }
     * )
     * 
     * // testtable with inserted rows
     * console.log(await client.sqlQuery({sql: `
     *     select * from testtable;
     * `}))
     * 
     * ```
     * 
     * Rolling back transaction example:
     * 
     * ```ts
     * 
     * const txRes = await client.executeSqlTx(
     *     'ReadWrite', 
     *     async txApi => {
     *         const testTable = await txApi.query({sql: `
     *             select * from testtable;
     *         `})
     *         txApi.exec({sql: `
     *             insert into testtable 
     *                 (id, value) 
     *             values 
     *                 (1, 'yoyo');
     *         `})
     *         throw 'Changed my decision, don't update testtable'
     * 
     *         console.log('This will not be executed')
     *     }
     * )
     * 
     * console.log(txRes)
     * // Changed my decision, don't update testtable
     * 
     * // testtable without inserted rows
     * console.log(await client.sqlQuery({sql: `
     *     select * from testtable;
     * `}))
     * 
     * ```
     * 
     */
    async executeSqlTx(
        mode: "ReadOnly" | "WriteOnly" | "ReadWrite",
        run: (txApi: {
            query(props: api.SqlTxQueryProps): Promise<types.SqlNamedValue[][]>,
            exec(props: api.SqlTxExecProps): Promise<void>,
        }) => Promise<void>,
    ) {

        const txCredentials = session.createImmuGrpcCallCredentials({
            ...await this.getSessionTokens(),
            ...await this.immuGrpcApi.sqlTxNew({
                mode,
                credentials: await this.getCallCredentials(),
            }),
        })

        type SqlExecSummary = {tx?: types.Tx, updatedRows: number}
        type SqlCommitRollback = SqlExecSummary | string

        const operation = new Promise<SqlCommitRollback>((resolve, reject) => {

            const commit = async () => {
                const commitResult = await this.immuGrpcApi.sqlTxCommit({
                    credentials: txCredentials,
                })
                resolve(commitResult)
            }
    
            const errorRollBack = async (reason?: any) => {
                await this.immuGrpcApi.sqlTxRollback({
                    credentials: txCredentials,
                })
                resolve('rolled back, reason: ' + reason)
            }
    
            const exec = async (props: api.SqlTxExecProps) => {
                await this.immuGrpcApi.sqlTxExec({
                    ...props,
                    credentials: txCredentials,
                })
            }
    
            const query = async (props: api.SqlTxQueryProps) => {
                return await this.immuGrpcApi.sqlTxQuery({
                    ...props,
                    credentials: txCredentials,
                })
            }
    
            
            return run({
                exec,
                query,
            })
            .then(commit)
            .catch(errorRollBack)
        })

        
        return await operation
    }





    


    // **********************************************************
    // user
    // **********************************************************






    /**
     * Creates ImmuDb server user
     */
     async createUser(props: api.CreateUsersProps) {
        return this.immuGrpcApi.createUser({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }

    /**
     * Deletes (deactivates) ImmuDb server user, can also activate user.
     */
    async deleteUser(props: api.SetUserActiveProps) {
        return this.immuGrpcApi.setUserActive({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }

    /**
     * Lists ImmuDb server users, can also activate user.
     */
    async listUsers() {
        return this.immuGrpcApi.listUsers({
            credentials: await this.getCallCredentials(),
        })
    }


    /**
     * Sets ImmuDb server user permissions.
     */
    async setUserDbPermissions(props: api.SetUserDbPermissionsProps) {
        return this.immuGrpcApi.setUserDbPermissions({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }

    /**
     * Sets ImmuDb server user password.
     */
     async setUserPassword(props: api.SetUserPasswordProps) {
        return this.immuGrpcApi.setUserPassword({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }





    

    // **********************************************************
    // db
    // **********************************************************


    /**
     * Creates database as ImmuDb server.
     */
    async createDb(props: api.CreateDatabaseProps) {
        return this.immuGrpcApi.createDb({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }

    /**
     * Deletes database as ImmuDb server.
     */
    async deleteDb(props: api.DeleteDatabaseProps) {
        return this.immuGrpcApi.deleteDb({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }

    /**
     * Loads database at ImmuDb server.
     */
    async loadDb(props: api.LoadDbProps) {
        return this.immuGrpcApi.loadDb({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }

    /**
     * Unloads database at ImmuDb server.
     */
    async unloadDb(props: api.UnloadDbProps) {
        return this.immuGrpcApi.unloadDb({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }

    /**
     * Flushes current database index.
     */
    async flushDbIndex(props: api.FlushDatabaseIndexProps) {
        return this.immuGrpcApi.flushDbIndex({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }

    /**
     * Compacts current database index.
     */
    async compactDbIndex() {
        return this.immuGrpcApi.compactDbIndex({
            credentials: await this.getCallCredentials(),
        })
    }


    /**
     * Lists all ImmuDb server databases.
     */
    async listDbs() {
        return this.immuGrpcApi.listDbs({
            credentials: await this.getCallCredentials(),
        })
    }

    /**
     * Gets current database state.
     */
    async getDbCurrentState() {
        return this.immuGrpcApi.getDbCurrentState({
            credentials: await this.getCallCredentials(),
        })
    }

    /**
     * Gets current database settings.
     */
    async getDbSettings() {
        return this.immuGrpcApi.getDbSettings({
            credentials: await this.getCallCredentials(),
        })
    }

    /**
     * Sets database settings.
     */
    async setDbSettings(props: api.SetDbSettingsProps) {
        return this.immuGrpcApi.setDbSettings({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }







    // **************************
    // Instance
    // **************************


    /**
     * Replicates transaction.
     */
    async replicateTx(props: api.ReplicateTxProps) {
        return this.immuGrpcApi.replicateTx({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }


    /**
     * Exports transaction.
     */
    async exportTx(props: api.ExportTxProps) {
        return this.immuGrpcApi.exportTx({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }






    // **************************
    // With verification
    // **************************




    async getTxAndVerification(props: api.GetTxAndVerificationProps) {
        return this.immuGrpcApi.getTxAndVerification({
            ...props,
            credentials: await this.getCallCredentials(),
        })
    }


}


















/**
 * Session configuration.
 */
 export type Config = {
    /**
     * Immudb server host address.
     */
    host:           string,
    /**
     * Immudb server port number.
     */
    port?:           number,
    /**
     * Immudb server instance user name.
     */
    user:       string,
    /**
     * Immudb server instance user password.
     */
    password:       string,
    /**
     * Immudb server instance database name.
     */
    database:   string,
}

/**
 * Config for local develpoment.
 */
export const devConfig: Config = {
    host:       '127.0.0.1',
    port:       3322,
    user:       'immudb',
    password:   'immudb',
    database:   'defaultdb',
}






/**
 * Builds address.
 * 
 * Example:
 * 
 * ```ts
 * console.log(buildAddress({
 *     host:       '127.0.0.1',
 *     port:       3322,
 *     user:       'immudb',
 *     password:   'immudb',
 *     database:   'defaultdb',
 * }))
 * // '127.0.0.1:3322'
 * ```
 */
 function buildAddress(conf: Config) {
    const host = conf.host
    const port = conf.port != undefined ? ':' + conf.port : ''
    return host + port
}

