import * as grpc from '@grpc/grpc-js'
import Long from "long"




export function createLoggingInterceptor<
    TRequestMessage, 
    TResponseMessage
>(interceptorName: string) {

    return function loggingInterceptor(
        options: Parameters<grpc.Interceptor>['0'], 
        nextCall: Parameters<grpc.Interceptor>['1']
    ): ReturnType<grpc.Interceptor> {

        // const interceptorName = 'LoggingInterceptor'
        const info = {
            interceptorName,
            options,
        }
        console.log(info)

        type Intercepted = {
            requestMetadata?:   grpc.Metadata,
            requestMessage?:    TRequestMessage,
            responseMetadata?:  grpc.Metadata,
            responseMessage?:   TResponseMessage,
            responseStatus?:    grpc.StatusObject,
        }
        let intercepted: Intercepted  = {}

        return new grpc.InterceptingCall(
            nextCall(options), {
            start: (metadata, listener, next) =>{
                start({
                    interceptorName,
                    options,
                    requestMetadata: metadata,
                    customListener: {
                        onReceiveMetadata: (metadata, next) => {
                            receiveMetadata({
                                interceptorName,
                                intercepted,
                                responseMetadata: metadata,
                                options,
                                next
                            })
                            intercepted = {...intercepted, responseMetadata: metadata}
                        },
                        onReceiveMessage: (message, next) => {
                            receiveMessage({
                                interceptorName,
                                intercepted,
                                responseMessage: message,
                                options,
                                next
                            })
                            intercepted = {...intercepted, responseMessage: message}
                        },
                        onReceiveStatus: (status, next) => {
                            receiveStatus({
                                interceptorName,
                                intercepted,
                                responseStatus: status,
                                options,
                                next
                            })
                            intercepted = {...intercepted, responseStatus: status}
                        },
                    },
                    next,
                })
                intercepted = {...intercepted, requestMetadata: metadata}
            },
            sendMessage: (message, next) => {
                sendMessage({
                    interceptorName,
                    intercepted,
                    requestMessage: message,
                    options,
                    next
                })
                intercepted = {...intercepted, requestMessage: message}
            },
            halfClose: (next) => {
                halfClose({
                    interceptorName,
                    intercepted: intercepted,
                    options,
                    next
                })
            },
            cancel: (next) => {
                cancel({
                    interceptorName,
                    intercepted: intercepted,
                    options,
                    next
                })
            },
        })





        function start(props: {
            interceptorName:    string,
            options:            grpc.InterceptorOptions,
            requestMetadata:    grpc.Metadata,
            customListener:     grpc.Listener,
            next:               (metadata: grpc.Metadata, listener: grpc.Listener) => void,
            // listener: Required<grpc.Listener>,
        }) {
            const info = {
                interceptorName:    props.interceptorName,
                method:             props.options.method_definition.path,
                hook:               'start',
                requestMetadata: {
                    self:   props.requestMetadata,
                    map:    props.requestMetadata.getMap(),
                    options: props.requestMetadata.getOptions(),
                }
            }
            console.log(info)
            props.next(props.requestMetadata, props.customListener)
        }

        function sendMessage(props: {
            interceptorName:    string,
            options:            grpc.InterceptorOptions,
            intercepted: {
                requestMetadata?:   grpc.Metadata,
            }
            requestMessage:     TRequestMessage,
            next:               (message: TRequestMessage) => void,
            // listener: Required<grpc.Listener>,
        }) {
            const info = {
                interceptorName:    props.interceptorName,
                method:             props.options.method_definition.path,
                hook:               'sendMessage',
                requestMessage:     props.requestMessage,
                intercepted:        props.intercepted,
            }
            console.log(info)
            props.next(props.requestMessage)
        }

        function halfClose(props: {
            interceptorName:    string,
            options:            grpc.InterceptorOptions,
            intercepted:        Intercepted,
            next:               () => void,
        }) {
            const info = {
                interceptorName:    props.interceptorName,
                method:             props.options.method_definition.path,
                hook:               'halfClose',
                intercepted:        props.intercepted,
            }
            console.log(info)
            props.next()
        }

        function cancel(props: {
            interceptorName:    string,
            options:            grpc.InterceptorOptions,
            intercepted:        Intercepted,
            next:               () => void,
        }) {
            const info = {
                interceptorName:    props.interceptorName,
                method:             props.options.method_definition.path,
                hook:               'cancel',
                intercepted:        props.intercepted,
            }
            console.log(info)
            props.next()
        }

        function receiveMetadata(props: {
            interceptorName:    string,
            options:            grpc.InterceptorOptions,
            responseMetadata:   grpc.Metadata,
            intercepted:        Intercepted,
            next:               (metadata: grpc.Metadata) => void,
        }) {
            const info = {
                interceptorName:    props.interceptorName,
                method:             props.options.method_definition.path,
                hook:               'receiveMetadata',
                responseMetadata: {
                    self:   props.responseMetadata,
                    map:    props.responseMetadata.getMap(),
                    options: props.responseMetadata.getOptions(),
                },
                intercepted:        props.intercepted,
            }
            console.log(info)
            props.next(props.responseMetadata)
        }

        function receiveMessage(props: {
            interceptorName:    string,
            options:            grpc.InterceptorOptions,
            responseMessage:    TResponseMessage,
            intercepted:        Intercepted,
            next:               (message: TResponseMessage) => void,
        }) {
            const info = {
                interceptorName:    props.interceptorName,
                method:             props.options.method_definition.path,
                hook:               'receiveMessage',
                responseMessage:    props.responseMessage,
                intercepted:        props.intercepted,
            }
            console.log(info)
            props.next(props.responseMessage)
        }

        function receiveStatus(props: {
            interceptorName:    string,
            options:            grpc.InterceptorOptions,
            responseStatus:     grpc.StatusObject,
            intercepted:        Intercepted,
            next:               (status: grpc.StatusObject) => void,
        }) {
            const info = {
                interceptorName:    props.interceptorName,
                method:             props.options.method_definition.path,
                hook:               'receiveStatus',
                responseStatus: {
                    self:       props.responseStatus,
                    codeString: grpc.status[props.responseStatus.code],
                    metadata: {
                        self:       props.responseStatus.metadata,
                        map:        props.responseStatus.metadata.getMap(),
                        options:    props.responseStatus.metadata.getOptions(),
                    },
                },
                intercepted:        props.intercepted,
            }
            console.log(info)
            props.next(props.responseStatus)
        }
    }

}