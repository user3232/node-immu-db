import { type ImmuServiceClient } from '../proto/immudb/schema/ImmuService.js'
import type * as types from '../types/index.js'
import * as immuConvert from '../immu-convert/index.js'
import * as grpcjs from '@grpc/grpc-js'
import * as immuGrpc from '../immu-grpc/index.js'
import * as buffer from '../buffer.js'
import { Buffer } from 'node:buffer'
import Long from 'long'
import { User__Output } from 'proto/immudb/schema/User.js'
import { Permission__Output } from 'proto/immudb/schema/Permission.js'





export function createListUsers(client: ImmuServiceClient) {
    const sqlQueryGrpc = immuGrpc.unaryCall.createListUsers(client)

    
    return function sqlQuery(props: {
        credentials: grpcjs.CallCredentials,
    }) {

        return sqlQueryGrpc({
            request: {
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('UserList__Output must be defined')
        )
        .then(grpcUsers => grpcUsers.users.map(grpcUserInfoToUserInfo))
    }
}





/**
 * Transforms User__Output to more friendly object.
 */
function grpcUserInfoToUserInfo(userResponse: User__Output): types.UserInfo {
    
    return {
        
        username:       userResponse.user.toString(),
        createdBy:      userResponse.createdby,
        createdDate:    new Date(userResponse.createdat),
        active:         userResponse.active,
        permissions:    userResponse.permissions.map(grpcPermissionToDatabasePermission)
    }
}


/**
 * Transforms grpc user permissions to more friendly output.
 */
function grpcPermissionToDatabasePermission(
    p: Permission__Output
): types.DatabasePermission {
    return {
        database:       p.database,
        permission:     immuConvert.permissionFromCode(p.permission),
    }
}






export type CreateUsersProps = {
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
    permission: types.Permission
}


export function createCreateUser(client: ImmuServiceClient) {
    const createUsersGrpc = immuGrpc.unaryCall.createCreateUsers(client)

    
    return function createUsers(props: CreateUsersProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return createUsersGrpc({
            request: {
                database:   props.database,
                user:       Buffer.from(props.username),
                password:   Buffer.from(props.password),
                permission: immuConvert.permissionToCode(props.permission)
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('Empty__Output must be defined')
        )
        .then(_ => {
            const res: types.UserCredentials & types.DatabasePermission = props
            return res
        })
    }
}




export type SetUserPasswordProps = {
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


export function createSetUserPassword(client: ImmuServiceClient) {
    const changePasswordGrpc = immuGrpc.unaryCall.createChangePassword(client)

    
    return function setUserPassword(props: SetUserPasswordProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return changePasswordGrpc({
            request: {
                user:           Buffer.from(props.username),
                oldPassword:    Buffer.from(props.password),
                newPassword:    Buffer.from(props.newPassword),
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('Empty__Output must be defined')
        )
        .then(_ => props.username)
    }
}



export type SetUserActiveProps = {
    /**
     * Name of existing user.
     */
    username: string,
     /**
      * Should user be active?
      */
    active: boolean,
}


export function createSetUserActive(client: ImmuServiceClient) {
    const setActiveUserGrpc = immuGrpc.unaryCall.createSetActiveUser(client)

    
    return function setUserActive(props: SetUserActiveProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return setActiveUserGrpc({
            request: {
                username:       props.username,
                active:         props.active,
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('Empty__Output must be defined')
        )
        .then(_ => props)
    }
}



export type SetUserDbPermissionsProps = {
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
    permission: types.KnownPermissionName,
    /**
     * 
     */
    grantRevoke: 'GRANT' | 'REVOKE'
}


export function createSetUserDbPermissions(client: ImmuServiceClient) {
    const changePermissionGrpc = immuGrpc.unaryCall.createChangePermission(client)

    
    return function setUserDbPermissions(props: SetUserDbPermissionsProps & {
        credentials: grpcjs.CallCredentials,
    }) {

        return changePermissionGrpc({
            request: {
                action:         props.grantRevoke,
                username:       props.username,
                database:       props.database,
                permission:     immuConvert.permissionToCode((props.permission)),
            },
            options: {
                credentials: props.credentials,
            },
        })
        .then(maybeResponse => maybeResponse 
            ? maybeResponse 
            : Promise.reject('Empty__Output must be defined')
        )
        .then(_ => props)
    }
}

