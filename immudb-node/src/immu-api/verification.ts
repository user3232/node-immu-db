import { type ImmuServiceClient } from 'immudb-grpcjs/immudb/schema/ImmuService.js'
import * as grpcjs from '@grpc/grpc-js'
import * as immuGrpc from '../immu-grpc/index.js'
import Long from 'long'
import * as ver from '../immu-verification/index.js'




export type GetTxAndVerificationProps = {
    txId:       Long,
    refTxId:    Long,
    refHash:    Buffer,
    dbTxesWindow?: {
        startId?: Long
    }
}


export function createGetTxAndVerification(client: ImmuServiceClient) {
    const verifiableTxByIdGrpc = immuGrpc.unaryCall.createVerifiableTxById(client)

    /**
     * 
     */
    return function getTxAndVerification(props: GetTxAndVerificationProps & {
        credentials: grpcjs.CallCredentials,
    }) {



        return verifiableTxByIdGrpc({
            request: { 
                proveSinceTx:               props.refTxId,
                tx:                         props.txId,
                keepReferencesUnresolved:   true,
                sinceTx:                    props.dbTxesWindow?.startId,

                entriesSpec: {
                    kvEntriesSpec:  {action: 'RAW_VALUE'},
                    zEntriesSpec:   {action: 'RAW_VALUE'},
                    sqlEntriesSpec: {action: 'RAW_VALUE'},
                },
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('VerifiableTx__Output must be defined')
        )
        .then(grpcVerTx => {
            
            return ver.verificationAndTxFromGrpcVerTx({
                grpcVerTx,
                refHash: props.refHash,
                refTxId: props.refTxId,
            })
            
        })
    }
}



