import { type ImmuServiceClient } from 'immudb-grpcjs/immudb/schema/ImmuService.js'
import type * as immu from '../types/index.js'
import * as grpcjs from '@grpc/grpc-js'
import * as immuGrpc from '../immu-grpc/index.js'
import * as igt from '../immu-grpc-tx/index.js'
import Long from 'long'
import { Chunk } from 'immudb-grpcjs/immudb/schema/Chunk.js'


export function createServerInfo(client: ImmuServiceClient) {
    const healthGrpc = immuGrpc.unaryCall.createHealth(client)

    
    return function serverInfo(props: {
        credentials: grpcjs.CallCredentials,
    }): Promise<immu.ServerInfo> {

        return healthGrpc({
            request: {
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('HealthResponse__Output must be defined')
        )
    }
}



export type ExportTxProps = {
    txId: Long
}

export function createExportTx(client: ImmuServiceClient) {
    const exportTxGrpc = immuGrpc.readerCall.createExportTx(client)

    
    return function exportTx(props: ExportTxProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return exportTxGrpc({
            request: {
                tx: props.txId,
            },
            credentials: props.credentials,
        })
        
    }
}




export type ReplicateTxProps = {
    chunks: AsyncIterable<Chunk>
}

export function createReplicateTx(client: ImmuServiceClient) {
    const replicateTxGrpc = immuGrpc.writerCall.createReplicateTx(client)

    
    return function replicateTx(props: ReplicateTxProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return replicateTxGrpc({
            request: props.chunks,
            credentials: props.credentials,
        })
        .then(({res, info}) => res
            ? res 
            : Promise.reject('TxHeader__Output must be defined')
        )
        .then(txGrpc => igt.grpcTxHeaderToTxCore(txGrpc))
        
    }
}