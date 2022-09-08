import { DatabaseNullableSettings } from "proto/immudb/schema/DatabaseNullableSettings";
import {
    IndexSettingsReadonly,
    toImmutableIndexNullableSettings
} from "./IndexSettingsReadonly";



/**
 * Database unchangable settings
 */
 export type DatabaseSettingsReadonly = {
    
    /**
     * default storage layer implementation writes data into fixed-size files,
     * default size being 512MB. The current theoretical maximum number of files
     * is 100 millions.
     */
    fileSize?:                  number,

    /**
     * Indexing settings
     */
    indexSettings:              IndexSettingsReadonly,

    
    /**
     * maximum length of keys for entries stored in the database.
     * 
     * max maxKeyLen: 1024 Bytes (2^31-1 bytes)
     * 
     */
    maxKeyLen?:                 number,
    /**
     * In order to provide manageable limits, immudb is designed to set an upper
     * bound to the number of key-value pairs included in a single transaction.
     * The default value being 1024, so using default settings, the theoretical
     * number of key-value pairs that can be stored in immudb is: 1024 * (1^64 -
     * 1).
     * 
     */
    maxTxEntries?:              number,
    /**
     * maximum length of value for entries stored in the database.
     * 
     * Max maxValueLen: 32 MB (2^56-1 bytes)
     */
    maxValueLen?:               number,

}


export function toImmutableDatabaseNullableSettings(
    settings: DatabaseSettingsReadonly
): DatabaseNullableSettings {
    return {
        fileSize:                   {value: settings.fileSize},
        indexSettings:              toImmutableIndexNullableSettings(settings.indexSettings),
        maxKeyLen:                  {value: settings.maxKeyLen},
        maxTxEntries:               {value: settings.maxTxEntries},
        maxValueLen:                {value: settings.maxValueLen},
    }
}