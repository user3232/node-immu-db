// import {promisify} from 'node:util'
import * as grpc from '@grpc/grpc-js'

import { ImmuServiceClient } from 'proto/immudb/schema/ImmuService.js'
import { OpenSessionRequest } from 'proto/immudb/schema/OpenSessionRequest.js'
import { OpenSessionResponse__Output } from 'proto/immudb/schema/OpenSessionResponse.js'

import * as errors from '../common/errors.js'
import * as common from '../common/index.js'
import Long from "long"

  

// const controller = new AbortController()
// const abortSignal = controller.signal


// promisify example
// const immuGrpcApiOpenSession = promisify<
//     OpenSessionRequest,
//     grpc.Metadata,
//     grpc.CallOptions,
//     OpenSessionResponse__Output | undefined
// >(immuGrpcApi.openSession).bind(immuGrpcApi)




export type OpenSessionResult = {
    data: OpenSessionResponse__Output,
    info: common.CallResultInfo,
}



export function openSession(props: {
    client:                 ImmuServiceClient,
    request:                OpenSessionRequest,
    credentials?:           grpc.CallCredentials,
    requestMetadata?:       grpc.Metadata,
    operationTimeoutMS?:    number,
    cancelSignal?:          AbortSignal,
}) {
    return new Promise<OpenSessionResult>((resolve, reject) => {

        if(props.cancelSignal?.aborted === true) {
            return reject(
                new errors.OperationCanceledError('Operation cancelled by client before started.')
            )
        }

        let responseMetadata: grpc.Metadata | undefined
        let responseStatus: grpc.StatusObject | undefined
        let data: OpenSessionResponse__Output | undefined

        // callbacks runs in following order:
        // 1: metadata
        // 2: callback
        // 3: status
        const call = props.client.openSession(
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
            (metadata) => { 
                // console.log('oncemetadata', metadata)
                responseMetadata = metadata 
            }
        )
        .once(
            'status', 
            (status) => { 
                // console.log('oncestatus', status)
                responseStatus = status 

                if(!data) {
                    return reject(
                        new errors.NoResponseValueError('Response value is undefined', getInfo())
                    )
                }

                return resolve({ 
                    data: data, 
                    info: getInfo(), 
                })
            }
        )
        
        props.cancelSignal?.addEventListener(
            'abort', 
            abortCallHandler,
            {
                once: true
            }
        )

        function callCallback(
            err: grpc.ServiceError | null, 
            val: OpenSessionResponse__Output | undefined
        ): void {
            // console.log('callCallback')
            props.cancelSignal?.removeEventListener('abort', abortCallHandler)

            if(err) {
                return reject(
                    new errors.InternalError(err, getInfo())
                )
            }
            

            data = val
            // return resolve({ 
            //     data: val, 
            //     info: getInfo(), 
            // })
        }


        function abortCallHandler(this: AbortSignal, ev: Event) {
            console.log('abortCallHandler')
            props.cancelSignal?.removeEventListener('abort', abortCallHandler)
            call.cancel()
            return reject(
                new errors.OperationCanceledError(
                    'Operation canceled by client. Call was canceled',
                    getInfo()
                )
            )
        }

        function getInfo(): common.CallResultInfo {
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

