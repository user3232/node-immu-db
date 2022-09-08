import * as protoLoader from '@grpc/proto-loader'
import * as grpcjs from '@grpc/grpc-js'
import Long from 'long'
import { ProtoGrpcType } from './proto/schema.js'



export const grpcClientFactory = createGrpcClientFactory(
    './proto/schema.proto'
) 





/**
 * Creates grpc clients factory.
 *
 * @param protoPath - path to `.proto` file. 
 */
export function createGrpcClientFactory(protoPath: string) {

    const packageDefinition = protoLoader.loadSync(
        protoPath,
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
            
    const packageApi = (
        grpcjs.loadPackageDefinition(packageDefinition) as unknown
    ) as ProtoGrpcType

    
    /**
     * Creates grpc client instance.
     */
    return function createGrpcClient(props: {
        /**
         * Host and optionally port, e.g. '127.0.0.1:3322'
         */
        address:        string, 
        /**
         * Credentials to be used by grpc channel, e.g. insecure, TLS, Mutual TLS...
         */
        credentials:    grpcjs.ChannelCredentials, 
        /**
         * Grpc client options, for example:
         * 
         * ```ts
         * {
         *   "grpc.max_send_message_length": 1<<4<<10<<10, // 32 * 1024 * 1024 = 32 MB
         *   "grpc.max_receive_message_length": 1<<4<<10<<10, // 32 * 1024 * 1024 = 32 MB
         * }
         * 
         * see also {@link GrpcJsSelectedClientOptions}
         * ```
         */
        options?:       grpcjs.ClientOptions | GrpcJsSelectedClientOptions,
    }) {
        return new packageApi.immudb.schema.ImmuService(
            props.address, 
            props.credentials, 
            props.options,
        )
    }

}


/**
 * Some useful Grpc channel options. To find more informations:
 * - for full list of options go see https://grpc.github.io/grpc/core/group__grpc__arg__keys.html
 * - for default values search https://github.com/grpc/grpc source code. 
 */
export type GrpcJsSelectedClientOptions = {
    /**
     * Default compression algorithm for the channel.
     */
    "grpc.default_compression_algorithm": grpcjs.compressionAlgorithms,


    /**
     * Is it permissible to send keepalive pings from the client 
     * without any outstanding streams. Value:
     * - `1`: keepalive without outstanding streams is allowed
     * - `0` (default): keepalive without outstanding streams is not allowed
     * 
     * @see https://github.com/grpc/grpc/blob/master/doc/keepalive.md
     */
    "grpc.keepalive_permit_without_calls": 0 | 1,
    /**
     * After a duration of this time the client/server pings its peer to see if
     * the transport is still alive. Default value is infinite (max number)
     * 
     * @see https://github.com/grpc/grpc/blob/master/doc/keepalive.md
     * 
     */
    "grpc.keepalive_time_ms": number,
    /**
     * After waiting for a duration of this time (in milliseconds), if the
     * keepalive ping sender does not receive the ping ack, it will close the
     * transport. Default value is 20000 (20 seconds).
     *
     * @see https://github.com/grpc/grpc/blob/master/doc/keepalive.md
     *
     */
    "grpc.keepalive_timeout_ms": number,


    /**
     * Maximum number of concurrent incoming streams to allow on a http2 connection.
     * Default value 4294967295
     * 
     * @see https://github.com/grpc/grpc/blob/master/src/core/ext/transport/chttp2/transport/http2_settings.cc#L51
     */
    "grpc.max_concurrent_streams": number,

    /**
     * Maximum message length (in bytes) that the channel can receive.
     * `-1` means unlimited (default).
     */
    "grpc.max_receive_message_length": number,
    /**
     * Maximum message length that the channel can send. `-1` means unlimited (default).
     */
    "grpc.max_send_message_length": number,
}