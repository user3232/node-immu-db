import * as igrpc from 'immudb-grpcjs'
import * as promis from '../grpc-promis/index.js'



// **************************
// Get Values
// **************************


export function createStreamGet(client: igrpc.ImmuServiceClient) {
    return promis.promisifyGrpcReaderAsync<igrpc.KeyRequest, igrpc.Chunk__Output>(
        client.streamGet.bind(client)
    )
}

export function createStreamScan(client: igrpc.ImmuServiceClient) {
    return promis.promisifyGrpcReaderAsync<igrpc.ScanRequest, igrpc.Chunk__Output>(
        client.streamScan.bind(client)
    )
}

export function createStreamZScan(client: igrpc.ImmuServiceClient) {
    return promis.promisifyGrpcReaderAsync<igrpc.ZScanRequest, igrpc.Chunk__Output>(
        client.streamZScan.bind(client)
    )
}

export function createStreamHistory(client: igrpc.ImmuServiceClient) {
    return promis.promisifyGrpcReaderAsync<igrpc.HistoryRequest, igrpc.Chunk__Output>(
        client.streamHistory.bind(client)
    )
}

// **************************
// Get Values and proof
// **************************

export function createStreamVerifiableGet(client: igrpc.ImmuServiceClient) {
    return promis.promisifyGrpcReaderAsync<igrpc.VerifiableGetRequest, igrpc.Chunk__Output>(
        client.streamVerifiableGet.bind(client)
    )
}


// **************************
// Instance
// **************************

export function createExportTx(client: igrpc.ImmuServiceClient) {
    return promis.promisifyGrpcReaderAsync<igrpc.ExportTxRequest, igrpc.Chunk__Output>(
        client.exportTx.bind(client)
    )
}