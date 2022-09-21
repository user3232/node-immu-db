import { NamedParam, NamedParam__Output } from "immudb-grpcjs/immudb/schema/NamedParam.js";
import { SqlNamedValue, SqlValue } from "../types/index.js";
import type { SQLQueryResult__Output } from "immudb-grpcjs/immudb/schema/SQLQueryResult.js";
import { SQLValue__Output } from "immudb-grpcjs/immudb/schema/SQLValue.js";
import { Row__Output } from "immudb-grpcjs/immudb/schema/Row.js";




export function grpcSqlObjectNamedValueToNamedValues(
    objectNamedValue: {
        [key: string]: SQLValue__Output;
    }
): SqlNamedValue[] {

    return Object.entries(objectNamedValue).map(([name, grpcSqlValue]) => ({
        name,
        ...grpcSqlValueToSqlValue(grpcSqlValue)
    }))
}





export function grpcQueryResultToListoOfSqlNamedValues(
    queryResult: SQLQueryResult__Output
): SqlNamedValue[][] {
    
    return queryResult.rows.map(grpcSqlRowToSqlNamedValues)
}

export function grpcSqlRowToSqlNamedValues(
    grpcRow: Row__Output
): SqlNamedValue[] {
    return grpcRow.values.map((val, i) => ({
        name: grpcRow.columns[i],
        ...grpcSqlValueToSqlValue(val)
    }))
}




export function sqlNamedValueToGrpcSqlNamedParam(
    param: SqlNamedValue
): NamedParam {
    switch(param.type) {
        case 'BOOLEAN': 
            return {name: param.name, value: { value: 'b',  b: param.value}}
        case 'BLOB':       
            return {name: param.name, value: { value: 'bs', bs: param.value}}
        case 'INTEGER':       
            return {name: param.name, value: { value: 'n',  n: param.value}}
        case 'NULL':        
            return {name: param.name, value: { value: 'null' }}
        case 'VARCHAR':      
            return {name: param.name, value: { value: 's',  s: param.value}}
        case 'TIMESTAMP':   
            return {name: param.name, value: { value: 'ts',  ts: param.value}}
    }
}



/** Maps grpc sql value and value name to more js friendly value.  */
export function grpcSqlNamedParamToSqlNamedValue(
    param: NamedParam__Output
): SqlNamedValue {
    
    if(param.value == undefined) {
        throw 'grpc sql param must have value'
    }

    return {
        name: param.name,
        ...grpcSqlValueToSqlValue(param.value)
    }

}



/** Maps grpc sql value to more js friendly value.  */
export function grpcSqlValueToSqlValue(
    param: SQLValue__Output
): SqlValue {
    
    switch(param.value) {
        case 'b': 
            if(param.b === undefined) {
                throw 'parsing grpc sql param error on BOOLEAN.'
            }
            return {type: 'BOOLEAN', value: param.b}
        case 'bs': 
            if(param.bs === undefined) {
                throw 'parsing grpc sql param error on BLOB.'
            }
            return {type: 'BLOB', value: param.bs}
        case 'n':      
            if(param.n === undefined) {
                throw 'parsing grpc sql param error on INTEGER.'
            }
            return {type: 'INTEGER', value: param.n}
        case 'null':   
            return {type: 'NULL', }     
        case 's':      
            if(param.s === undefined) {
                throw 'parsing grpc sql param error on VARCHAR.'
            }
            return {type: 'VARCHAR', value: param.s}
        case 'ts':   
            if(param.ts === undefined) {
                throw 'parsing grpc sql param error on TIMESTAMP.'
            }
            return {type: 'TIMESTAMP', value: param.ts}
        default:
            throw 'parsing grpc sql param error on value.'
    }
}

