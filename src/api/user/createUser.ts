import * as grpc from '@grpc/grpc-js'
import * as gi from '../../grpc/index.js'
import * as permission from './userPermission.js'
import { CreateUserRequest } from 'proto/immudb/schema/CreateUserRequest.js'
import Long from "long"


export function createCreateUserWithDatabasePermission(props: {
    immudbGrpcApi:          gi.ImmudbGrpcApi,
    sessionCredentials?:    grpc.CallCredentials
    currentDatabase:        string,
}) {
    const {immudbGrpcApi, sessionCredentials, currentDatabase} = props

    

    return createUserWithDatabasePermission

    /**
     * Adds user to immudb instance.
     * If user exists or creator have unsufficient permissions,
     * or database does not exist, exceptions are thrown.
     */
    function createUserWithDatabasePermission(user: CreateUserWithDatabasePermissionProps) {
        
        return immudbGrpcApi.createUser({
            request: mapPropsToRequest({
                ...user, 
                database: user.database ?? currentDatabase
            }),
            credentials: sessionCredentials
        })

    }
}



/**
 * User to add to immudb instance properties.
 */
export type CreateUserWithDatabasePermissionProps =  {
    /**
     * Name of new user. Must be unique.
     */
    username: string,
    /**
     * Password of new user. Password must have between 8 and 32 letters,
     * digits and special characters of which at least 1 uppercase letter, 1
     * digit and 1 special character.
     */
    password: string,
    /**
     * New user database name for which she will have permission
     */
    database: string,
    /**
     * Permission given to new user on selected database.
     * New user creator must have permissions for giving permissions
     * on selected database.
     */
    permission: permission.Permission
}



export function mapPropsToRequest(props: CreateUserWithDatabasePermissionProps): CreateUserRequest {
    return {
        database:   props.database,
        user:       Buffer.from(props.username),
        password:   Buffer.from(props.password),
        permission: permission.toCode(props.permission),
    }
}