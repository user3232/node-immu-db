import * as grpcjs from '@grpc/grpc-js'



export function requiredCredsInterceptor<TRequestMessage, TResponseMessage> (
    options: Parameters<grpcjs.Interceptor>['0'], 
    nextCall: Parameters<grpcjs.Interceptor>['1']
): ReturnType<grpcjs.Interceptor> {

    // const interceptorName = 'RequiredCredentialsInterceptor'
    // const info = {
    //     interceptorName,
    //     options,
    // }
    // console.log(info)

    
    return new grpcjs.InterceptingCall(
        nextCall(options),
        {
            start: (metadata, builtInListener, next) => {
                
                if(!options.credentials) {

                    builtInListener.onReceiveMetadata(
                        new grpcjs.Metadata()
                    )

                    builtInListener.onReceiveMessage(
                        {}
                    )

                    builtInListener.onReceiveStatus({
                        code: grpcjs.status.UNAUTHENTICATED,
                        details: 'Call credentials must be provided.',
                        metadata: new grpcjs.Metadata(),
                    })


                }
                else {
                    next(metadata, builtInListener)
                }
            }
        }
    )
}

