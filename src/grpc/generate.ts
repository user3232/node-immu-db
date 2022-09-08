import * as grpc from '@grpc/grpc-js'
import { CallResult, CallResultInfo } from './CallResultInfo.js'
import * as common from '../common/index.js'
import Long from "long"




export function generate<TRequest, TResponse>(
    callFunction: (
        argument:   TRequest, 
        metadata:   grpc.Metadata, 
        options:    grpc.CallOptions, 
        callback:   grpc.requestCallback<TResponse>
    ) => grpc.Call
) {

    
    return function (props: {
        request:                TRequest,
        credentials?:           grpc.CallCredentials,
        requestMetadata?:       grpc.Metadata,
        operationTimeoutMS?:    number,
        cancelSignal?:          AbortSignal,
    }) {
        return new Promise<CallResult<TResponse>>((resolve, reject) => {
    
            if(props.cancelSignal?.aborted === true) {
                return reject(
                    new common.OperationCanceledError(
                        'Operation cancelled by client before started.'
                    )
                )
            }
    
            let responseMetadata: grpc.Metadata | undefined
            let responseStatus: grpc.StatusObject | undefined
            let data: TResponse | undefined
    

            // callbacks runs in following order:
            // 1: metadata
            // 2: callback
            // 3: status
            const call = callFunction(
                props.request,
                props.requestMetadata ?? new grpc.Metadata(),
                {
                    deadline: common.unixTimeNowAfterMS(props.operationTimeoutMS),
                    credentials: props.credentials ?? grpc.credentials.createEmpty(),
                },
                callCallback
            )
            .once(
                'metadata', 
                handleResponseMetadata
            )
            .once(
                'status', 
                handleResponseStatus
            )
            
            
            props.cancelSignal?.addEventListener(
                'abort', 
                handleCallAbort,
                {
                    once: true
                }
            )

            


            function removeListeners() {
                props.cancelSignal?.removeEventListener('abort', handleCallAbort)
                call.removeListener('metadata', handleResponseMetadata)
                call.removeListener('status', handleResponseStatus)
            }

            function handleResponseMetadata(metadata: grpc.Metadata) {
                responseMetadata = metadata 
            }

            function handleResponseStatus(status: grpc.StatusObject) {
                props.cancelSignal?.removeEventListener('abort', handleCallAbort)
                responseStatus = status 

                if(!data) {
                    removeListeners()
                    return reject(
                        new common.NoResponseValueError('Response value is undefined', getInfo())
                    )
                }

                removeListeners()
                return resolve({ 
                    data: data, 
                    info: getInfo(), 
                })
            }
    
            function callCallback(
                err: grpc.ServiceError | null, 
                val: TResponse | undefined
            ): void {
                // console.log('callCallback')
                
                if(err) {
                    removeListeners()
                    return reject(
                        new common.InternalError(err, getInfo())
                    )
                }
    
                data = val
            }
    
    
            function handleCallAbort(this: AbortSignal, ev: Event) {
                // console.log('abortCallHandler')
                call.cancel()

                removeListeners()
                return reject(
                    new common.OperationCanceledError(
                        'Operation canceled by client. Call was canceled',
                        getInfo()
                    )
                )
            }
    
            function getInfo(): CallResultInfo {
                // console.log('getInfo', responseMetadata, responseStatus)
                return {
                    headers: responseMetadata?.getMap(),
                    trailers: responseStatus?.metadata.getMap(),
                    statusCode: responseStatus?.code,
                    statusEnum: responseStatus?.code !== undefined 
                        ? grpc.status[responseStatus?.code] 
                        : undefined,
                    statusDetails: responseStatus?.details,
                }
            }
    
        })
    }
    
}

