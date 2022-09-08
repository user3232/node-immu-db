import { DatabaseNullableSettings } from "proto/immudb/schema/DatabaseNullableSettings";
import { toMutableIndexNullableSettings } from "./IndexSettings";
import { IndexSettingsUpdatable } from "./IndexSettingUpdatable";
import { ReplicationSettings, toReplicationNullableSettings } from "./ReplicationSettings";


/**
 * Database changable settings
 */
export type DatabaseSettingsUpdatable = {
    /**
     * Should database be automatically loaded?:
     * * (default) yes -> leave this value undefined or set to true
     * * no -> set this value to false
     */
    autoload?:                  boolean,
    /**
     * maximum number of open files for commit log
     */
    commitLogMaxOpenedFiles?:   number,

    /**
     * if set to true, commit time is not added to transaction headers allowing
     * reproducible database state
     */
    excludeCommitTime?:          boolean,

    

    /**
     * Indexing settings
     */
    indexSettings:              IndexSettingsUpdatable,

    /**
     * max number of concurrent operations on the db
     */
    maxConcurrency?:            number,
    /**
     * max number of concurrent IO operations on the db
     */
    maxIOConcurrency?:          number,
    
    /**
     * Repliation settings
     */
    replicationSettings:        ReplicationSettings,

    /**
     * size of transaction log cache
     */
    txLogCacheSize?:            number,
    /**
     * maximum number of open files for transaction log
     */
    txLogMaxOpenedFiles?:       number,
    /**
     * maximum number of open files for payload data
     */
    vLogMaxOpenedFiles?:        number,
    /**
     * transaction header version, used for backwards compatibility
     */
    writeTxHeaderVersion?:      number,
}



export function toMutableDatabaseNullableSettings(
    settings: DatabaseSettingsUpdatable
): DatabaseNullableSettings {
    return {
        autoload:                   {value: settings.autoload},
        commitLogMaxOpenedFiles:    {value: settings.commitLogMaxOpenedFiles},
        excludeCommitTime:          {value: settings.excludeCommitTime},
        indexSettings:              toMutableIndexNullableSettings(settings.indexSettings),
        maxConcurrency:             {value: settings.maxConcurrency},
        maxIOConcurrency:           {value: settings.maxIOConcurrency},
        replicationSettings:        toReplicationNullableSettings(settings.replicationSettings),
        txLogCacheSize:             {value: settings.txLogCacheSize},
        txLogMaxOpenedFiles:        {value: settings.txLogMaxOpenedFiles},
        vLogMaxOpenedFiles:         {value: settings.vLogMaxOpenedFiles},
        writeTxHeaderVersion:       {value: settings.writeTxHeaderVersion},
    }
}