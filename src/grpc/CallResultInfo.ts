import * as grpc from '@grpc/grpc-js'
import Long from "long"

export type CallResult<TResponse> = {
    data: TResponse,
    info: CallResultInfo,
}


export type CallResultInfo = {
    headers?:       Record<string, grpc.MetadataValue>,
    trailers?:      Record<string, grpc.MetadataValue>,
    statusCode?:    grpc.status,
    statusEnum?:    string,
    statusDetails?: string,
}


export type DataInfo<TData, TInfo> = {
    data: TData,
    info: TInfo
}

export type ReadStreamInfo = {
    headers:        Record<string, grpc.MetadataValue>[],
    trailers?:      Record<string, grpc.MetadataValue>,
    statusCode?:    grpc.status,
    statusEnum?:    string,
    statusDetails?: string,
}