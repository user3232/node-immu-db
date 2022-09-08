import { Buffer } from 'node:buffer'
import Long from 'long'
import { Tx } from './Tx.js'
import { ValEntry } from './ValEntry.js'
import { RefEntry } from './RefEntry.js'
import { ZEntry } from './ZEntry.js'




/**
 * Verifiable value entry.
 */
export type ValEntryVerifiable = {
    type: 'val',
    /** Val Entry. */
    entry: ValEntry,
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
    entry: RefEntry,
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
    entry: ValEntry,
    /** Parent tx id. */
    txId: Long,
    /** Parent tx (if available)*/
    tx?: Tx,
    /** Entry id within entry transaction. (if available) */
    id?: number,

    /** Ref Entry. */
    refEntry: RefEntry,
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
    entry: ZEntry,
    /** Parent tx id. */
    txId: Long,
    /** Parent tx (if available)*/
    tx?: Tx,
    /** Entry id within entry transaction. (if available) */
    id?: number,
}