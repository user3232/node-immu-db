import { IndexNullableSettings } from "proto/immudb/schema/IndexNullableSettings"


/**
 * Indexing unchangable settings
 */
export type IndexSettingsReadonly = {
    /**
     * max size of btree node in bytes
     */
    maxNodeSize?:                number,
}


export function toImmutableIndexNullableSettings(
    settings?: IndexSettingsReadonly
): IndexNullableSettings {
    return {
        maxNodeSize:                {value: settings?.maxNodeSize},
    }
}