import * as grpc from '@grpc/grpc-js'
import * as gi from '../../grpc/index.js'
import * as permission from './userPermission.js'
import { ChangePasswordRequest } from 'proto/immudb/schema/ChangePasswordRequest.js'
import Long from "long"


export function createUpdateUserPassword(props: {
    immudbGrpcApi:          gi.ImmudbGrpcApi,
    sessionCredentials?:    grpc.CallCredentials
    currentDatabase:        string,
}) {
    const {immudbGrpcApi, sessionCredentials, currentDatabase} = props

    

    return updateUserPassword

    /**
     * Adds user to immudb instance.
     * If user exists or creator have unsufficient permissions,
     * or database does not exist, exceptions are thrown.
     */
    function updateUserPassword(props: UpdateUserPasswordProps) {
        return immudbGrpcApi.changePassword({
            request: mapPropsToRequest(props),
            credentials: sessionCredentials
        })

    }
}



/**
 * Props needed to update user password.
 */
export type UpdateUserPasswordProps =  {
    /**
     * Name of new user. Must be unique.
     */
    username: string,
    /**
     * Actual password
     */
    password: string,
    /**
     * New password. Must have between 8 and 32 letters, digits and special
     * characters of which at least 1 uppercase letter, 1 digit and 1 special
     * character.
     */
    newPassword: string,
}



export function mapPropsToRequest(props:UpdateUserPasswordProps): ChangePasswordRequest {
    return {
        user:           Buffer.from(props.username),
        oldPassword:    Buffer.from(props.password),
        newPassword:    Buffer.from(props.newPassword),
    }
}