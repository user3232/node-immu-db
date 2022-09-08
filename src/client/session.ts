import * as grpc from '@grpc/grpc-js'
// import ImmudbClient from 'immudb-node'
import * as protoLoader from '@grpc/proto-loader'
// import Long from 'long'
import { ProtoGrpcType } from '../proto/schema.js'

// import { ConnectivityState } from '@grpc/grpc-js/build/src/connectivity-state'
// import {createLoggingInterceptor} from '../interceptors/loggingInterceptor'
// import {requiredCredsInterceptor} from '../interceptors/requiredCredsInterceptor'
import * as apiGen from '../grpc/index.js'
import * as common from '../common/index.js'

import Long from 'long'
import { SetRequest } from '../proto/immudb/schema/SetRequest.js'
import { VerifiableTxRequest } from '../proto/immudb/schema/VerifiableTxRequest.js'
import { TxRequest } from '../proto/immudb/schema/TxRequest.js'
import { TxHeader__Output } from '../proto/immudb/schema/TxHeader.js'
import { ZAddRequest } from 'proto/immudb/schema/ZAddRequest.js'
import { ExecAllRequest } from 'proto/immudb/schema/ExecAllRequest.js'
import { VerifiableZAddRequest } from 'proto/immudb/schema/VerifiableZAddRequest.js'
import { KeyRequest } from 'proto/immudb/schema/KeyRequest.js'
import { toKVEntry, toKVEntryAndProof, toKVEntries, toZEntries, fromKVEntries, fromExecEntriesGen, ExecEntryRequest } from '../stream/index.js'
import { VerifiableGetRequest } from 'proto/immudb/schema/VerifiableGetRequest.js'
import { ScanRequest } from 'proto/immudb/schema/ScanRequest.js'
import { ZScanRequest } from 'proto/immudb/schema/ZScanRequest.js'
import { toZEntry } from '../immu-binary-format/index.js'
import { HistoryRequest } from 'proto/immudb/schema/HistoryRequest.js'



export const defaultConf = {
    host: '127.0.0.1',
    port: 3322,
    username: 'immudb',
    password: 'immudb',
    databaseName: 'defaultdb',
}



export function createGrpcFactory() {
    const packageDefinition = protoLoader.loadSync(
        './proto/schema.proto',
        {
            longs: Long,
            enums: String,
            bytes: Buffer,
            defaults: true,
            arrays: true,
            objects: true,
            oneofs: true,
            json: true,
        }
    )
            
    const packageApi = (grpc.loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType
    return packageApi
}



export async function createImmudbSession(props: {
    host: string,
    port?: number,
    username: string,
    password: string,
    databaseName: string,
}) {

    const connectionString = props.port === undefined
        ? props.host
        : `${props.host}:${props.port}`

    const grpcChannelCredentials = grpc.credentials.createInsecure()
    
    
    const immudbGrpcFactory = createGrpcFactory()
    const immudbGrpcClient = new immudbGrpcFactory.immudb.schema.ImmuService(
        connectionString,
        grpcChannelCredentials,
        {
            
        }
    )

    

    // immudbGrpcFactory.immudb.schema.Database
    
    const immudbGrpcApi: apiGen.ImmudbGrpcApi = apiGen.generateApi(immudbGrpcClient)
    

    const session = await immudbGrpcApi.openSession({
        request: common.createOpenSessionRequest(props),
    })
    let sessionCredentials: grpc.CallCredentials | undefined = 
        common.createImmuCallCredentials(session.data)

    

    return {
        listDBs,
        listUsers,
        createUser,
        get,
        set,
        setAll(request: SetRequest) {
            return immudbGrpcApi.set({
                request,
                credentials: sessionCredentials
            })
        },
        // scan(request: ScanRequest) {
        //     return immudbGrpcApi.scan({
        //         request,
        //         options: {
        //             credentials: sessionCredentials
        //         }
        //     })
        // },
        scan(request: ScanRequest) {
            return immudbGrpcApi.scan({
                request,
                credentials: sessionCredentials
            })
        },
        getVerified(key: string, proveSinceTx?: number) {
            return immudbGrpcApi.verifiableGet({
                request: {
                    keyRequest: {
                        key: Buffer.from(key)
                    },
                    proveSinceTx: proveSinceTx !== undefined ? new Long(proveSinceTx) : undefined,
                },
                credentials: sessionCredentials
            })
        },

        getVerified2(props: {key: Buffer, proveSinceTx?: number}) {
            return immudbGrpcApi.verifiableGet({
                request: {
                    keyRequest: {
                        key: props.key,
                    },
                    proveSinceTx: props.proveSinceTx !== undefined
                        ? new Long(props.proveSinceTx)
                        : undefined,
                },
                credentials: sessionCredentials
            })
        },

        setVerified(key: string, value: string) {
            return immudbGrpcApi.verifiableSet({
                request: {
                    setRequest: {
                        KVs: [{key: Buffer.from(key), value: Buffer.from(value)}]
                    }
                },
                credentials: sessionCredentials
            })
        },

        setStream(kvs: {
            key: Buffer,
            val: Buffer,
        }[]) {
            return immudbGrpcApi.streamSet({
                request: fromKVEntries(kvs),
                credentials: sessionCredentials,
            })
            // .then((gg) => gg.res)
        },
        execAllStream(entries: ExecEntryRequest[]) {
            return immudbGrpcApi.streamExecAll({
                request: fromExecEntriesGen(entries),
                credentials: sessionCredentials,
            })
            // .then((gg) => gg.res)
        },
        getState() {
            return immudbGrpcApi.state({
                request: {},
                credentials: sessionCredentials,
            })
        },
        verifableGetTx(request: VerifiableTxRequest) {
            return immudbGrpcApi.verifableGetTx({
                request,
                credentials: sessionCredentials,
            })
        },
        getTx(request: TxRequest) {
            return immudbGrpcApi.getTx({
                request,
                credentials: sessionCredentials,
            })
        },
        getStream(request: KeyRequest) {
            return immudbGrpcApi.streamGet({
                request,
                credentials: sessionCredentials,
            }).then(({data, info}) => toKVEntry(
                Buffer.concat(data.map(chunkOutput => chunkOutput.content))
            ))
        },
        getAndProofStream(request: VerifiableGetRequest) {
            return immudbGrpcApi.streamGetAndProof({
                request,
                credentials: sessionCredentials,
            }).then(({data, info}) => toKVEntryAndProof(data.map(chunkOutput => chunkOutput.content)))
        },
        scanStream(request: ScanRequest) {
            return immudbGrpcApi.streamScan({
                request,
                credentials: sessionCredentials,
            })
            .then(
                ({data, info}) => toKVEntries(
                    Buffer.concat(data.map(chunkOutput => chunkOutput.content))
                )
            )
        },
        historyStream(request: HistoryRequest) {
            return immudbGrpcApi.streamHistory({
                request,
                credentials: sessionCredentials,
            })
            .then(
                ({data, info}) => toKVEntries(
                    Buffer.concat(data.map(chunkOutput => chunkOutput.content))
                )
            )
        },
        zScanStream(request: ZScanRequest) {
            return immudbGrpcApi.streamZScan({
                request,
                credentials: sessionCredentials,
            })
            .then(
                ({data, info}) => toZEntries(
                    Buffer.concat(data.map(chunkOutput => chunkOutput.content))
                )
            )
        },
        getTxVerified(request: VerifiableTxRequest) {
            return immudbGrpcApi.verifableGetTx({
                request,
                credentials: sessionCredentials,
            })
        },
        zAdd(request: ZAddRequest) {
            return immudbGrpcApi.zAdd({
                request,
                credentials: sessionCredentials,
            })
        },
        zAddAndVerify(request: VerifiableZAddRequest) {
            return immudbGrpcApi.verifiableZAdd({
                request,
                credentials: sessionCredentials,
            })
        },
        execAll(request: ExecAllRequest) {
            return immudbGrpcApi.execAll({
                request,
                credentials: sessionCredentials,
            })
        },

        closeSession,
    }

    
    function listUsers() {
        return immudbGrpcApi.listUsers({
            request: {},
            credentials: sessionCredentials
        })
    }

    function listDBs() {
        return immudbGrpcApi.listDatabases({
            request: {},
            credentials: sessionCredentials
        })
    }

    function createUser(user: {
        username: string,
        password: string,
        database?: string,
    }) {
        // PermissionNone = 0
        // PermissionR = 1
        // PermissionRW = 2
        return immudbGrpcApi.createUser({
            request: {
                database:   user.database ?? props.databaseName,
                user:       Buffer.from(user.username),
                password:   Buffer.from(user.password),
                permission: 2
            },
            credentials: sessionCredentials
        })
    }

    async function closeSession() {
        await immudbGrpcApi.closeSession({
            request: { },
            credentials: sessionCredentials
        })
        sessionCredentials = undefined
    }


    function get(key: string) {
        return immudbGrpcApi.get({
            request: {
                key: Buffer.from(key)
            },
            credentials: sessionCredentials
        })
    }

    async function set(kv: {key: string, value: string}) {

        const result = await immudbGrpcApi.set({
            request: {
                KVs: [
                    {key: Buffer.from(kv.key), value: Buffer.from(kv.value)}]
            },
            credentials: sessionCredentials
        })

        
        // return result
        return {
            data: normalifyTxHeader__Output(result.data),
            info: result.info,
        }
    }

}




export function normalifyTxHeader__Output(output: TxHeader__Output) {

    // output.ts.
    return {
        blRoot:     output.blRoot,
        blTxId:     output.blTxId,
        eH:         output.eH,
        id:         output.id,
        nentries:   output.nentries,
        prevAlh:    output.prevAlh,
        ts:         output.ts,
        version:    output.version,
        timestamp:  new Date(output.ts.low),
    }
}