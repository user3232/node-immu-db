import { ImmuServiceClient } from 'immudb-grpcjs/immudb/schema/ImmuService.js'
import * as promis from '../grpc-promis/index.js'
import { Chunk } from 'immudb-grpcjs/immudb/schema/Chunk.js'
import { TxHeader__Output } from 'immudb-grpcjs/immudb/schema/TxHeader.js'
import { VerifiableTx__Output } from 'immudb-grpcjs/immudb/schema/VerifiableTx.js'



// **************************
// Set Values
// **************************

export function createStreamSet(client: ImmuServiceClient) {
    return promis.promisifyGrpcWriter<Chunk, TxHeader__Output>(
        client.streamSet.bind(client)
    )
}

export function createStreamExecAll(client: ImmuServiceClient) {
    return promis.promisifyGrpcWriter<Chunk, TxHeader__Output>(
        client.streamExecAll.bind(client)
    )
}

// **************************
// Set Values and proof
// **************************

export function createStreamVerifiableSet(client: ImmuServiceClient) {
    return promis.promisifyGrpcWriter<Chunk, VerifiableTx__Output>(
        client.streamVerifiableSet.bind(client)
    )
}


// **************************
// Instance
// **************************

export function createReplicateTx(client: ImmuServiceClient) {
    return promis.promisifyGrpcWriter<Chunk, TxHeader__Output>(
        client.replicateTx.bind(client)
    )
}