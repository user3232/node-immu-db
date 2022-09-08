import {
    IndexNullableSettings,
    IndexNullableSettings__Output
} from "proto/immudb/schema/IndexNullableSettings";
import { IndexSettingsReadonly } from "./IndexSettingsReadonly";
import { IndexSettingsUpdatable } from "./IndexSettingUpdatable";


/**
 * Indexing settings
 */
export type IndexSettings = IndexSettingsUpdatable & IndexSettingsReadonly


export function fromIndexNullableSettings__Output(
    indexSettings?: IndexNullableSettings__Output | null
): IndexSettings {
    return {
        cacheSize:                  indexSettings?.cacheSize?.value,
        cleanupPercentage:          indexSettings?.cleanupPercentage?.value,
        commitLogMaxOpenedFiles:    indexSettings?.commitLogMaxOpenedFiles?.value,
        compactionThld:             indexSettings?.compactionThld?.value,
        delayDuringCompaction:      indexSettings?.delayDuringCompaction?.value,
        flushBufferSize:            indexSettings?.flushBufferSize?.value,
        flushThreshold:             indexSettings?.flushThreshold?.value,
        historyLogMaxOpenedFiles:   indexSettings?.historyLogMaxOpenedFiles?.value,
        maxActiveSnapshots:         indexSettings?.maxActiveSnapshots?.value,
        maxNodeSize:                indexSettings?.maxNodeSize?.value,
        nodesLogMaxOpenedFiles:     indexSettings?.nodesLogMaxOpenedFiles?.value,
        renewSnapRootAfter:         indexSettings?.renewSnapRootAfter?.value,
        syncThreshold:              indexSettings?.syncThreshold?.value,
    }
}


export function toMutableIndexNullableSettings(
    settings?: IndexSettings
): IndexNullableSettings {
    return {
        cacheSize:                  {value: settings?.cacheSize},
        cleanupPercentage:          {value: settings?.cleanupPercentage},
        commitLogMaxOpenedFiles:    {value: settings?.commitLogMaxOpenedFiles},
        compactionThld:             {value: settings?.compactionThld},
        delayDuringCompaction:      {value: settings?.delayDuringCompaction},
        flushBufferSize:            {value: settings?.flushBufferSize},
        flushThreshold:             {value: settings?.flushThreshold},
        historyLogMaxOpenedFiles:   {value: settings?.historyLogMaxOpenedFiles},
        maxActiveSnapshots:         {value: settings?.maxActiveSnapshots},
        nodesLogMaxOpenedFiles:     {value: settings?.maxActiveSnapshots},
        renewSnapRootAfter:         {value: settings?.renewSnapRootAfter},
        syncThreshold:              {value: settings?.syncThreshold},
    }
}