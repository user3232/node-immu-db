import Long from "long"

export type IndexSettingsUpdatable = {
    /**
     * size of btree node cache
     */
    cacheSize?:                  number,
    /**
     * % of data to be cleaned up from during next automatic flush operation
     */
    cleanupPercentage?:          number | string,
    /**
     * maximum number of files opened for commit log
     */
    commitLogMaxOpenedFiles?:    number,
    /**
     * minimum number of flushed snapshots to enable full compaction of the
     * index
     */
    compactionThld?:             number,
    /**
     * extra delay added during indexing when full compaction is in progress
     */
    delayDuringCompaction?:      number,
    /**
     * in-memory buffer size when doing flush operation
     */
    flushBufferSize?:            number,
    /**
     * threshold in number of entries between automatic flushes
     */
    flushThreshold?:             number,
    /**
     * maximum number of files opened for nodes history
     */
    historyLogMaxOpenedFiles?:   number,
    /**
     * max number of active in-memory btree snapshots
     */
    maxActiveSnapshots?:         number,
    /**
     * maximum number of files opened for nodes data
     */
    nodesLogMaxOpenedFiles?:     number,
    /**
     * threshold in time for automated snapshot renewal during data scans
     * (in seconds?).
     */
    renewSnapRootAfter?:         Long,
    /**
     * threshold in number of entries between flushes with sync
     */
    syncThreshold?:              number,
}