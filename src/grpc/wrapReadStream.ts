import * as grpc from '@grpc/grpc-js'
import { CallResult, CallResultInfo, DataInfo, ReadStreamInfo } from './CallResultInfo.js'
import * as common from '../common/index.js'
import * as stream from 'node:stream'




export function wrapReadStreamCall<TRequest, TResponse>(
    callFunction: (
        argument:   TRequest, 
        metadata:   grpc.Metadata, 
        options:    grpc.CallOptions, 
    ) => grpc.ClientReadableStream<TResponse>
) {

    
    return function wrappedReadStreamCall(props: {
        request:                TRequest,
        credentials?:           grpc.CallCredentials,
        requestMetadata?:       grpc.Metadata,
        operationTimeoutMS?:    number,
        cancelSignal?:          AbortSignal,
    }) {

        return new Promise<DataInfo<TResponse[], ReadStreamInfo>>((resolve, reject) => {
    
            if(props.cancelSignal?.aborted === true) {
                return reject(new common.OperationCanceledError(
                    'Operation cancelled by client before started.'
                ))
            }


            /**
             * Callbacks runs in following order:
             * 
             * 1. metadata
             * 2. data
             * 3. status
             * 4. end
             * 
             * Error or Abort events can happend at any time
             */
            const call = callFunction(
                props.request,
                props.requestMetadata ?? new grpc.Metadata(),
                {
                    deadline:       common.unixTimeNowAfterMS(props.operationTimeoutMS),
                    credentials:    props.credentials ? props.credentials : undefined,
                },
            )


            const context: Context<TResponse> = { 
                data: [],
                responseMetadata: [],
                call,
                resolve,
                reject,
                cleanup,
            }
            

            if(props.cancelSignal) {
                stream.addAbortSignal(props.cancelSignal, call)
            }

            const handleResponseMetadata    = createHandleResponseMetadata(context)
            const handleResponseStatus      = createHandleResponseStatus(context)
            const handleResponseData        = createHandleResponseData(context)
            // const handleAbortSignal         = createHandleAbortSignal(context)
            const handleResponseError       = createHandleResponseError(context)
            const handleResponseEnd         = createHandleResponseEnd(context)


            call.addListener('error',       handleResponseError)
            call.addListener('metadata',    handleResponseMetadata)
            call.addListener('data',        handleResponseData)
            call.addListener('status',      handleResponseStatus)
            call.addListener('end',         handleResponseEnd)
            // props.cancelSignal?.addEventListener('abort', handleAbortSignal)


            function cleanup() {
                // props.cancelSignal?.removeEventListener('abort', handleAbortSignal)
                call.removeListener('error',    handleResponseError)
                call.removeListener('end',      handleResponseEnd)
                call.removeListener('status',   handleResponseStatus)
                call.removeListener('data',     handleResponseData)
                call.removeListener('metadata', handleResponseMetadata)
            }
    
        })
    }
    
}




type Context<TResponse> = {
    responseMetadata:   grpc.Metadata[],
    responseStatus?:    grpc.StatusObject,
    data:               TResponse[],
    call:               grpc.ClientReadableStream<TResponse>,
    cleanup:            () => void,
    reject:             (reason?: any) => void,
    resolve:            (value: DataInfo<TResponse[], ReadStreamInfo> | PromiseLike<DataInfo<TResponse[], ReadStreamInfo>>) => void,
}


function createHandleResponseData<TResponse>(
    context: Context<TResponse>
) {
    return function handleResponseData(chunk: TResponse) {
        context.data.push(chunk)
    }
}


function createHandleResponseMetadata<TResponse>(
    context: Context<TResponse>
) {
    return function handleResponseMetadata(metadata: grpc.Metadata) {
        context.responseMetadata.push(metadata)
    }
}



function getInfo<TResponse>(
    context: Context<TResponse>
): ReadStreamInfo {
    return {
        headers:    context.responseMetadata.map(m => m.getMap()),
        trailers:   context.responseStatus?.metadata.getMap(),
        statusCode: context.responseStatus?.code,
        statusEnum: context.responseStatus?.code !== undefined 
            ? grpc.status[context.responseStatus?.code] 
            : undefined,
        statusDetails: context.responseStatus?.details,
    }
}


function createHandleResponseStatus<TResponse>(
    context:    Context<TResponse>
) {
    return function handleResponseStatus(status: grpc.StatusObject) {
        context.responseStatus = status 
    }
}


function createHandleResponseEnd<TResponse>(context: Context<TResponse>) {
    return function handleResponseEnd() {
        context.cleanup()
        context.resolve({ 
            data: context.data, 
            info: getInfo(context), 
        })
    }
}


function createHandleResponseError<TResponse>(context: Context<TResponse>) {
    return function handleResponseError(err: any) {
        context.cleanup()
        context.reject(new common.InternalError(err, getInfo(context)))
    }
}


function createHandleAbortSignal<TResponse>(context: Context<TResponse>) {
    return function handleCallAbort(this: AbortSignal, ev: Event) {
        context.cleanup()
        context.call.cancel()

        return context.reject(new common.OperationCanceledError(
            'Operation canceled by client. Call was canceled',
            getInfo(context)
        ))
    }
}