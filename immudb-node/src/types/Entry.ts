import { Buffer } from 'node:buffer'
import Long from 'long'
import { Tx } from './Tx.js'
import { ValEntryData } from './ValEntry.js'
import { RefEntryData } from './RefEntry.js'
import { ZEntryData } from './ZEntry.js'




/**
 * Verifiable value entry.
 */
export type ValEntryVerifiable = {
    type: 'val',
    /** Val Entry. */
    entry: ValEntryData,
    /** Parent tx id. */
    txId: Long,
    /** Parent tx (if available)*/
    tx?: Tx,
    /** Entry id within entry transaction. (if available) */
    id?: number,
}


/**
 * Verifiable value entry.
 */
 export type RefEntryVerifiable = {
    type: 'ref',
    /** Key. */
    entry: RefEntryData,
    /** Parent tx id. */
    txId: Long,
    /** Parent tx (if available)*/
    tx?: Tx,
    /** Entry id within entry transaction. (if available) */
    id?: number,
}

/**
 * Verifiable value and reference entry.
 */
 export type ValRefEntryVerifiable = {
    type: 'val-ref',
    /** Val Entry. */
    entry: ValEntryData,
    /** Parent tx id. */
    txId: Long,
    /** Parent tx (if available)*/
    tx?: Tx,
    /** Entry id within entry transaction. (if available) */
    id?: number,

    /** Ref Entry. */
    refEntry: RefEntryData,
    /** Ref Entry Parent tx id. */
    refTxId: Long,
    /** Ref Entry Parent tx (if available)*/
    refTx?: Tx,
    /** Ref Entry id within entry transaction. (if available) */
    refId?: number,
}


/**
 * Verifiable z entry.
 */
 export type ZEntryVerifiable = {
    type: 'zSet',
    /** Z Entry. */
    entry: ZEntryData,
    /** Parent tx id. */
    txId: Long,
    /** Parent tx (if available)*/
    tx?: Tx,
    /** Entry id within entry transaction. (if available) */
    id?: number,
}