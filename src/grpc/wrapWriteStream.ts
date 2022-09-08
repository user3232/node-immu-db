import * as grpc from '@grpc/grpc-js'
import { CallResult, CallResultInfo } from './CallResultInfo.js'
import * as common from '../common/index.js'
import * as stream from 'node:stream'
import {once} from 'node:events'
import {promisify} from 'node:util'


const defaultChunkSize: number = 64 * 1024 // 64 * 1024 64 KiB


export function wrapWriteStreamCall<TRequest, TResponse>(
    callFunction: (
        metadata:   grpc.Metadata, 
        options:    grpc.CallOptions, 
        callback:   (err: grpc.ServiceError | null, res?: TResponse) => void
    ) => grpc.ClientWritableStream<TRequest>
) {

    
    return async function wrappedWriteStreamCall(props: {
        request:                AsyncIterable<TRequest>,
        credentials?:           grpc.CallCredentials,
        requestMetadata?:       grpc.Metadata,
        operationTimeoutMS?:    number,
        cancelSignal?:          AbortSignal,
    }) {

        console.log('wrappedWriteStreamCall fired!')

        try {


        if(props.cancelSignal?.aborted === true) {
            throw new common.OperationCanceledError(
                'Operation cancelled by client before started.'
            )
        }

        const info: any[] = []


        let resolveResult: (props: {res?: TResponse, info: any[]}) => void
        let rejectResult: (err?: any) => void
        const result = new Promise((
            resolve: (props: {res?: TResponse, info: any[]}) => void, 
            reject: (err?: any) => void
        ) => {
            resolveResult = resolve
            rejectResult = reject
        })


        const writeStream = callFunction(
            props.requestMetadata ?? new grpc.Metadata(),
            {
                deadline:       common.unixTimeNowAfterMS(props.operationTimeoutMS),
                credentials:    props.credentials,
            },
            (err, res) => {
                if(err) {
                    console.log('wrappedWriteStreamCall error and info:', err, info)
                    rejectResult({err, info})
                }
                else {
                    console.log('wrappedWriteStreamCall result and info:', res, info)
                    resolveResult({res, info})
                }
            }
        )
        writeStream.addListener(
            'metadata', 
            (metadata) => info.push(metadata.getMap())
        )
        writeStream.addListener(
            'status', 
            (status) => info.push(status)
        )
        writeStream.addListener(
            'close', 
            () => info.push('write stream closed')
        )
        writeStream.addListener(
            'drain', 
            () => info.push('write stream drain')
        )
        writeStream.addListener(
            'error', 
            (err) => info.push('write stream error', err)
        )
        writeStream.addListener(
            'finish', 
            () => info.push('write stream finish')
        )
        writeStream.addListener(
            'pipe', 
            () => info.push('write stream pipe')
        )
        writeStream.addListener(
            'unpipe', 
            () => info.push('write stream unpipe')
        )
        
        

        if(props.cancelSignal) {
            stream.addAbortSignal(props.cancelSignal, writeStream)
        }


        for await (const chunk of props.request) {
            if(!writeStream.write(chunk)) {
                await once(writeStream, 'drain')
            }
        }
        writeStream.end()
        
        
        await stream.promises.finished(writeStream as stream.Writable)

        // const cleanup = stream.finished(
        //     writeStream as stream.Writable, 
        //     // {writable: true}, 
        //     (err) => {
        //         cleanup()
        //     }
        // )

        return await result

        }
        catch (e) {
            console.log(e)
        }
    }
    
}



export function wrapWriteStreamCall2<TRequest, TResponse>(
    callFunction: (
        metadata:   grpc.Metadata, 
        options:    grpc.CallOptions, 
        callback:   (err: grpc.ServiceError | null, res: TResponse) => void
    ) => grpc.ClientWritableStream<TRequest>
) {

    
    return function wrappedWriteStreamCall2(props: {
        request:                AsyncIterable<TRequest>,
        credentials?:           grpc.CallCredentials,
        requestMetadata?:       grpc.Metadata,
        operationTimeoutMS?:    number,
        cancelSignal?:          AbortSignal,
    }) {

        return new Promise<{res: TResponse, info: any[]}>((resolve, reject) => {
            if(props.cancelSignal?.aborted === true) {
                reject(new common.OperationCanceledError(
                    'Operation cancelled by client before started.'
                ))
            }

            const info: any[] = []

            const writeStream = callFunction(
                props.requestMetadata ?? new grpc.Metadata(),
                {
                    deadline:       common.unixTimeNowAfterMS(props.operationTimeoutMS),
                    credentials:    props.credentials,
                },
                (err, res) => {
                    if(err) {
                        reject({
                            err: new common.InternalError(err),
                            info
                        })
                    }

                    resolve({res, info})
                }
            )
            writeStream.addListener(
                'metadata', 
                (metadata) => info.push(metadata.getMap())
            )
            writeStream.addListener(
                'status', 
                (status) => info.push(status)
            )
            writeStream.addListener(
                'close', 
                () => info.push('write stream closed')
            )
            writeStream.addListener(
                'drain', 
                () => info.push('write stream drain')
            )
            writeStream.addListener(
                'error', 
                (err) => info.push('write stream error', err)
            )
            writeStream.addListener(
                'finish', 
                () => info.push('write stream finish')
            )
            writeStream.addListener(
                'pipe', 
                () => info.push('write stream pipe')
            )
            writeStream.addListener(
                'unpipe', 
                () => info.push('write stream unpipe')
            )

            writeChunks({
                chunks: props.request,
                writeStream
            })
            .catch(err => reject({err, info}))
            


        })
    }
}


async function writeChunks<T>(props: {
    chunks: AsyncIterable<T>
    writeStream: grpc.ClientWritableStream<T>
}) {

    for await (const chunk of props.chunks) {
        if(!props.writeStream.write(chunk)) {
            await once(props.writeStream, 'drain')
        }
    }
    props.writeStream.end()
}



/**
 * Creates promise that can be resolved/rejected externally.
 * 
 * ```ts
 * const {
 *   promise, 
 *   emitResolve, 
 *   emitReject
 * } = createDeffered<number>()
 * 
 * emitResolve(44)
 * 
 * const val = await promise
 * console.log(val) // 44
 * ```
 */
export function createDeffered<T>() {
    const emitter: {
        state: {type: 'fulfilled', res: T} | {type: 'rejected', err: any} | {type: 'pending'},
        onResolve?: (res: T) => void,
        onReject?: (err: any) => void
    } = {
        state: {type: 'pending'}
    }

    const promise = new Promise<T>((resolve, reject) => {

        switch (emitter.state.type) {
            case 'pending': break
            case 'fulfilled': return resolve(emitter.state.res)
            case 'rejected': return reject(emitter.state.err)
        }

        emitter.onResolve = (res: T) => {
            resolve(res)
        }
        emitter.onReject = (err: any) => {
            reject(err)
        }
    })
    

    return {
        promise,
        emitResolve: (res: T) => { 
            if (emitter.state.type !== 'pending') {
                return
            }
            emitter.state = {
                type: 'fulfilled',
                res: res,
            }
            emitter.onResolve?.(res) 
        },
        emitReject: (err: any) => { 
            if (emitter.state.type !== 'pending') {
                return
            }
            emitter.state = {
                type: 'rejected',
                err: err,
            }
            emitter.onReject?.(err) 
        },
        state: () => emitter.state.type
    }
    
}