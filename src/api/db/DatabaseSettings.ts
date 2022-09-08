import {
    DatabaseNullableSettings,
    DatabaseNullableSettings__Output
} from "proto/immudb/schema/DatabaseNullableSettings";
import {
    DatabaseSettingsReadonly,
    toImmutableDatabaseNullableSettings
} from "./DatabaseSettingsReadonly";
import {
    DatabaseSettingsUpdatable,
    toMutableDatabaseNullableSettings
} from "./DatabaseSettingsUpdatable";
import { fromIndexNullableSettings__Output } from "./IndexSettings";
import { fromReplicationNullableSettings__Output } from "./ReplicationSettings";


/**
 * Database settings.
 * 
 * > **NOTE**
 * > 
 * > Following settings cannot be updated after database creation:
 * > * fileSize, 
 * > * maxKeyLen, 
 * > * maxValueLen, 
 * > * maxTxEntries,
 * > * indexOptions.maxNodeSize
 * 
 */
export type DatabaseSettings = DatabaseSettingsReadonly & DatabaseSettingsUpdatable



export function createEmpty(): DatabaseSettings {
    return {
        indexSettings: {},
        replicationSettings: {}
    }
}




export function fromDatabaseNullableSettings__Output(
    databaseSettings: DatabaseNullableSettings__Output | null
): DatabaseSettings {

    return {
        autoload:                   databaseSettings?.autoload?.value,
        commitLogMaxOpenedFiles:    databaseSettings?.commitLogMaxOpenedFiles?.value,
        fileSize:                   databaseSettings?.fileSize?.value,

        indexSettings:              fromIndexNullableSettings__Output(databaseSettings?.indexSettings),

        maxConcurrency:             databaseSettings?.maxConcurrency?.value,
        maxIOConcurrency:           databaseSettings?.maxIOConcurrency?.value,
        maxKeyLen:                  databaseSettings?.maxKeyLen?.value,
        maxTxEntries:               databaseSettings?.maxTxEntries?.value,
        maxValueLen:                databaseSettings?.maxValueLen?.value,

        replicationSettings:        fromReplicationNullableSettings__Output(databaseSettings?.replicationSettings),

        txLogCacheSize:             databaseSettings?.txLogCacheSize?.value,
        txLogMaxOpenedFiles:        databaseSettings?.txLogMaxOpenedFiles?.value,
        vLogMaxOpenedFiles:         databaseSettings?.vLogMaxOpenedFiles?.value,
        writeTxHeaderVersion:       databaseSettings?.writeTxHeaderVersion?.value,
    }
}



export function toDatabaseNullableSettings(
    settings: DatabaseSettings
): DatabaseNullableSettings {
    return {
        ...toMutableDatabaseNullableSettings(settings),
        ...toImmutableDatabaseNullableSettings(settings),
    }
}