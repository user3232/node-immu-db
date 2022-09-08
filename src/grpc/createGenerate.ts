import * as grpc from '@grpc/grpc-js'
import { CallResult, CallResultInfo } from './CallResultInfo.js'
import * as common from '../common/index.js'
import Long from "long"


function createCallCallback<TResponse>(
    props: {
        cancelSignal?: AbortSignal
    },
    abortCallHandler: (this: AbortSignal, ev: Event) => void,
    reject: (reason?: any) => void,
    setData: (data?: TResponse) => void,
    getInfo: () => CallResultInfo
) {

    return function callCallback(
        err: grpc.ServiceError | null, 
        val: TResponse | undefined
    ): void {
        // console.log('callCallback')
        props.cancelSignal?.removeEventListener('abort', abortCallHandler)

        if(err) {
            return reject(
                new common.InternalError(err, getInfo())
            )
        }

        setData(val)
    }
}



function createAbortHandler(
    props: {
        cancelSignal?: AbortSignal
    },
    reject: (reason?: any) => void,
    call: grpc.Call,
    getInfo: () => common.CallResultInfo
) {

    return function abortCallHandler(this: AbortSignal, ev: Event) {
        console.log('abortCallHandler')
        props.cancelSignal?.removeEventListener('abort', abortCallHandler)
        call.cancel()
        return reject(
            new common.OperationCanceledError(
                'Operation canceled by client. Call was canceled',
                getInfo()
            )
        )
    }
}