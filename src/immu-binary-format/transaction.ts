
import * as time from 'common/time.js'
import {TxHeader__Output} from 'proto/immudb/schema/TxHeader.js'
import Long from 'long'
import { fromUInt16BE, fromUInt32BE } from '../buffer.js'
import * as hash from '../immu-hash/hash.js'





/**
 * Formats transaction header to immu binary representation v1 and hashes.
 * 
 * Output is construced as fallows, hash (sha256) of:
 * - trasaction id - UInt64 BE
 * - hash of previous transaction immu binary format - sha256, 32 Bytes
 * - hash of (sha256, 32 Bytes):
 *   - timestamp - seconds since unix - UInt64 BE
 *   - binary format version - UInt16 BE
 *   - metadata binary form:
 *     - transaction metadata total length - UInt16 BE
 *     - property (in arbitrary order), as of v1 there are none:
 *       - property tag - UInt8 BE
 *       - property value - bytes.
 *   - entries (KVs) count - UInt32 BE
 *   - entries MHT hash - hash (sha256, 32 Bytes)
 *   - previous database last transaction id - UInt64 BE
 *   - previous database MHT - hash (sha256, 32 Bytes) 
 * 
 * Total length: 8 + 32 + 32 = 72 Bytes.
 */
export function fromTxHeader__Output_v1(props: TxHeader__Output) {

    return hash.ofBuffers(
        Buffer.from(props.id.toBytesBE()),         // id
        props.prevAlh,                             // previous tx hash
        hash.ofBuffers(
            Buffer.from(props.ts.toBytesBE()),      // timestamp
            fromUInt16BE(props.version),      // header version
            fromUInt16BE(0),                  // empty tx metadata
            fromUInt32BE(props.nentries),     // tx entries count
            props.eH,                               // tx entries mht hash
            Buffer.from(props.blTxId.toBytesBE()),  // previous tx id
            props.blRoot,                           // previous tx'es mht hash
        )
    )
    
}



/**
 * Represents input to Merkle Hash Tree for Transactions before binary
 * formatting and hashing.
 * 
 */
export type InputTransaction = {
    /**
     * Transaction (sequence) number
     */
    readonly id: Long,
    /**
     * Transaction timestamp as UInt64 seconds since midnight, January 1, 1970 UTC.
     * For conversion to {@link Date} see {@link time.dateFromLong dateFromLong}
     */
    readonly timestamp: Long,
    /**
     * version of binary format
     */
    readonly version: 1,
    /**
     * Transaction metadata, as of immudb 1.1 
     * it is object with no filds
     */
    readonly metadata?: {},
    /**
     * Entries information
     */
    readonly entries: {
        /**
         * How many entries have transaction?
         */
        count: number,
        /**
         * MHT hash entries contained in transaction.
         */
        readonly mht: Buffer,
    },
    /**
     * Minimal database covering this transaction, MHT aspect.
     */
    readonly previousTransaction: {
        /**
         * Id of previous transaction.
         */
        readonly id: Long,
        /**
         * MHT hash of previous transactions.
         */
        readonly mht: Buffer,
        /**
         * Hash of previous transaction binary format
         */
        readonly hash: Buffer,
    }
}


export function mapTxHeaderToInputTransaction(props: TxHeader__Output): InputTransaction {
    if (props.version !== 1) {
        throw 'Wrong version'
    }
    if (props.id.sub(1).notEquals(props.blTxId)) {
        throw 'Wrong previous transaction id'
    }
    return {
        id:         props.id,
        timestamp:  props.ts,
        version:    props.version,
        metadata:   !props.metadata ? {} : props.metadata,
        entries: {
            count:  props.nentries,
            mht:    props.eH
        },
        previousTransaction: {
            id:     props.blTxId,
            hash:   props.prevAlh,
            mht:    props.blRoot
        }
    }
}


export function mapInputTransactionToTxHeader__Output(props: InputTransaction): TxHeader__Output {
    return {
        version:    props.version,
        id:         props.id,
        ts:         props.timestamp,
        metadata:   props.metadata ?? null,
        blRoot:     props.previousTransaction.mht,
        blTxId:     props.previousTransaction.id,
        prevAlh:    props.previousTransaction.hash,
        nentries:   props.entries.count,
        eH:         props.entries.mht,
    }
}



/**
 * Format transaction metadata to immu binary representation.
 * 
 * Immu binary representation of transaction metadata v1:
 * - transaction metadata total length - UInt16 BE
 * - property (in arbitrary order), as of v1 there are none:
 *   - property tag - UInt8 BE
 *   - property value - bytes.
 * 
 * Total length: 2 Bytes.
 */
export function fromTxMetadata_v1(metadata?: {}): Buffer {
    return fromUInt16BE(0)

    // return Buffer.concat([
    //     bufferFromUInt16Be(0),  // transaction metadata length
    //     Buffer.of(),            // transaction metadata tag
    //     Buffer.of(),            // transaction metadata tag value
    // ])
}


