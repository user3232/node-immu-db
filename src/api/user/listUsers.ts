import * as grpc from '@grpc/grpc-js'
import * as gi from '../../grpc/index.js'
import * as permission from './userPermission.js'

import { Permission__Output } from 'proto/immudb/schema/Permission.js'
import { User__Output } from 'proto/immudb/schema/User.js'
import Long from "long"


export function createListUsers(props: {
    immudbGrpcApi: gi.ImmudbGrpcApi,
    sessionCredentials?: grpc.CallCredentials
}) {
    const {immudbGrpcApi, sessionCredentials} = props
    /**
     * Lists users registered in immudb instance.
     */
    return function listUsers() {
        return immudbGrpcApi.listUsers({
            request: {},
            credentials: sessionCredentials,
            requestMetadata: new grpc.Metadata({
                // http get method can be used (no side effects in immudb)
                idempotentRequest: true
            })
        })
        .then(users => users.data.users.map(createUserInfo))
    }
}



export type UserInfo = {
    /**
     * Name of immudb instance user
     */
    username: string;
    /**
     * Name of immudb instance user which created this user
     */
    createdBy: string;
    /**
     * Date when immudb instance user was created
     */
    createdDate: Date;
    /**
     * Is this immudb instance user active
     */
    active: boolean;
    /**
     * Immudb instance user permissions for databases
     */
    permissions: permission.DatabasePermission[];
}




/**
 * Transforms User__Output to more friendly object.
 */
function createUserInfo(userResponse: User__Output): UserInfo {
    
    return {
        
        username:       userResponse.user.toString(),
        createdBy:      userResponse.createdby,
        createdDate:    new Date(userResponse.createdat),
        active:         userResponse.active,
        permissions:    userResponse.permissions.map(responseToDatabasePermission)
    }
}


/**
 * Transforms User__Output to more friendly object.
 */
export function listUserPermissions(
    userInfo: UserInfo
): permission.UserPermission[] {
    return userInfo.permissions.map(p => ({
        database:       p.database,
        permission:     p.permission,
        username:       userInfo.username,
    }))
}


function responseToDatabasePermission(
    p: Permission__Output
): permission.DatabasePermission {
    return {
        database:       p.database,
        permission:     permission.fromCode(p.permission),
    }
}



