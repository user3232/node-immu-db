import {
    ReplicationNullableSettings,
    ReplicationNullableSettings__Output
} from "proto/immudb/schema/ReplicationNullableSettings"



/**
 * Replication settings
 */
 export type ReplicationSettings = {
    /**
     * password used to connect to the master immudb instance
     */
    followerPassword?:   string,
    /**
     * username used to connect to the master immudb instance
     */
    followerUsername?:   string,
    /**
     * hostname of the master immudb instance
     */
    masterAddress?:      string,
    /**
     * name of the database to replicate
     */
    masterDatabase?:     string,
    /**
     * tcp port of the master immudb instance
     */
    masterPort?:         number,
    /**
     * if true, the database is a replica of another one
     */
    replica?:            boolean,
}


export function fromReplicationNullableSettings__Output(
    replicationSettings?: ReplicationNullableSettings__Output | null
): ReplicationSettings {
    
    return {
        followerPassword:   replicationSettings?.followerPassword?.value,
        followerUsername:   replicationSettings?.followerUsername?.value,
        masterAddress:      replicationSettings?.masterAddress?.value,
        masterDatabase:     replicationSettings?.masterDatabase?.value,
        masterPort:         replicationSettings?.masterPort?.value,
        replica:            replicationSettings?.replica?.value,
    }
}

export function toReplicationNullableSettings(
    settings?: ReplicationSettings
): ReplicationNullableSettings {
    return {
        followerPassword:       {value: settings?.followerPassword},
        followerUsername:       {value: settings?.followerUsername},
        masterAddress:          {value: settings?.masterAddress},
        masterDatabase:         {value: settings?.masterDatabase},
        masterPort:             {value: settings?.masterPort},
        replica:                {value: settings?.replica},
    }
}