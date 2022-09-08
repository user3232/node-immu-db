import * as grpc from '@grpc/grpc-js'
import * as gi from '../../grpc/index.js'
import * as permission from './userPermission.js'
import { ChangePermissionRequest } from 'proto/immudb/schema/ChangePermissionRequest.js'
import Long from "long"


export function createCreateOrUpdateUserDatabasePermission(props: {
    immudbGrpcApi:          gi.ImmudbGrpcApi,
    sessionCredentials?:    grpc.CallCredentials
    currentDatabase:        string,
}) {
    const {immudbGrpcApi, sessionCredentials, currentDatabase} = props

    return createOrUpdateUserDatabasePermission

    /**
     * Create or update permission for user at database.
     */
    function createOrUpdateUserDatabasePermission(props: CreateUpdateUserDatabasePermissionProps) {
        return immudbGrpcApi.changePermission({
            request: mapPropsToGrantRequest(props),
            credentials: sessionCredentials
        })

    }
}

export function createDelateUserDatabasePermission(props: {
    immudbGrpcApi:          gi.ImmudbGrpcApi,
    sessionCredentials?:    grpc.CallCredentials
    currentDatabase:        string,
}) {
    const {immudbGrpcApi, sessionCredentials, currentDatabase} = props

    return delateUserDatabasePermission

    /**
     * Delate permissions for user at database.
     */
    function delateUserDatabasePermission(props: DelateUserDatabasePermissionProps) {
        return immudbGrpcApi.changePermission({
            request: mapPropsToRevokeRequest(props),
            credentials: sessionCredentials
        })

    }
}



/**
 * Props needed to update user permissions on database.
 */
export type CreateUpdateUserDatabasePermissionProps =  {
    /**
     * Name of existing user for whome database permission is to be applied.
     */
    username: string,
    /**
     * Database for with user permission is to be applied.
     */
    database: string,
    /**
     * New permissions for user.
     */
    permission: permission.KnownPermissionName,
}

/**
 * Props needed to delate user permission on database.
 */
 export type DelateUserDatabasePermissionProps =  {
    /**
     * Name of existing user.
     */
    username: string,
    /**
     * Name of existing database
     */
    database: string,
    
}



export function mapPropsToGrantRequest(
    props: CreateUpdateUserDatabasePermissionProps
): ChangePermissionRequest {
    return {
        action:         'GRANT',
        username:       props.username,
        database:       props.database,
        permission:     permission.knownPermissionNameToCode[props.permission],
    }
}

export function mapPropsToRevokeRequest(
    props: DelateUserDatabasePermissionProps
): ChangePermissionRequest {
    return {
        action:         'REVOKE',
        username:       props.username,
        database:       props.database,
    }
}