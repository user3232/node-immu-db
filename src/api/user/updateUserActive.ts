import * as grpc from '@grpc/grpc-js'
import * as gi from '../../grpc/index.js'
import * as permission from './userPermission.js'
import { SetActiveUserRequest } from 'proto/immudb/schema/SetActiveUserRequest.js'
import Long from "long"


export function createUpdateUserPassword(props: {
    immudbGrpcApi:          gi.ImmudbGrpcApi,
    sessionCredentials?:    grpc.CallCredentials
    currentDatabase:        string,
}) {
    const {immudbGrpcApi, sessionCredentials, currentDatabase} = props

    

    return updateUserActive

    /**
     * Updates user active state. (Effectively creating or delating user)
     */
    function updateUserActive(props: UpdateUserActivedProps) {
        return immudbGrpcApi.setUserActive({
            request: mapPropsToRequest(props),
            credentials: sessionCredentials
        })

    }
}



/**
 * Props needed to update user active state.
 */
export type UpdateUserActivedProps =  {
    /**
     * Name of existing user.
     */
    username: string,
    /**
     * Should user be active?
     */
    active: boolean,
    
}



export function mapPropsToRequest(props:UpdateUserActivedProps): SetActiveUserRequest {
    return {
        username:       props.username,
        active:         props.active,
    }
}