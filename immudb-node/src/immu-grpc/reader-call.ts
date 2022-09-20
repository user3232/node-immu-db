import { ImmuServiceClient } from 'immudb-grpcjs/immudb/schema/ImmuService.js'
import * as promis from '../grpc-promis/index.js'
import { KeyRequest } from 'immudb-grpcjs/immudb/schema/KeyRequest.js'
import { Chunk__Output } from 'immudb-grpcjs/immudb/schema/Chunk.js'
import { ScanRequest } from 'immudb-grpcjs/immudb/schema/ScanRequest.js'
import { ZScanRequest } from 'immudb-grpcjs/immudb/schema/ZScanRequest.js'
import { HistoryRequest } from 'immudb-grpcjs/immudb/schema/HistoryRequest.js'
import { VerifiableGetRequest } from 'immudb-grpcjs/immudb/schema/VerifiableGetRequest.js'
import { ExportTxRequest } from 'immudb-grpcjs/immudb/schema/ExportTxRequest.js'


// **************************
// Get Values
// **************************


export function createStreamGet(client: ImmuServiceClient) {
    return promis.promisifyGrpcReaderAsync<KeyRequest, Chunk__Output>(
        client.streamGet.bind(client)
    )
}

export function createStreamScan(client: ImmuServiceClient) {
    return promis.promisifyGrpcReaderAsync<ScanRequest, Chunk__Output>(
        client.streamScan.bind(client)
    )
}

export function createStreamZScan(client: ImmuServiceClient) {
    return promis.promisifyGrpcReaderAsync<ZScanRequest, Chunk__Output>(
        client.streamZScan.bind(client)
    )
}

export function createStreamHistory(client: ImmuServiceClient) {
    return promis.promisifyGrpcReaderAsync<HistoryRequest, Chunk__Output>(
        client.streamHistory.bind(client)
    )
}

// **************************
// Get Values and proof
// **************************

export function createStreamVerifiableGet(client: ImmuServiceClient) {
    return promis.promisifyGrpcReaderAsync<VerifiableGetRequest, Chunk__Output>(
        client.streamVerifiableGet.bind(client)
    )
}


// **************************
// Instance
// **************************

export function createExportTx(client: ImmuServiceClient) {
    return promis.promisifyGrpcReaderAsync<ExportTxRequest, Chunk__Output>(
        client.exportTx.bind(client)
    )
}