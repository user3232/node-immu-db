import Long from "long"




/**
 * Permission names to codes.
 */
export const knownPermissionNameToCode = {
    /**
     * No permissions
     */
    None: 0,
    /**
     *Permission to read database
     */
    Read: 1,
    /**
     * Permission to read and write database
     */
    ReadWrite: 2,

    /**
     * Permission to read, write and administer database
     */
    Admin: 254,
    /**
     * Permission to read, write and administer all databases
     */
    SysAdmin: 255,
} as const



/**
 * Inverts const maps, e.g.
 * 
 * @example
 * Invert<{None: 0, Sth: 1} as const>
 * // -> {1: 'None', 2: 'Sth'} as const
 */
export type Invert<T extends Record<PropertyKey, PropertyKey>> = {
    [P in keyof T as T[P]]: P
}


export const knownPermissionCodeToName: Invert<typeof knownPermissionNameToCode> = {
    /**
     * No permissions
     */
    0: 'None',
    /**
     *Permission to read database
     */
    1: 'Read',
    /**
     * Permission to read and write database
     */
    2: 'ReadWrite',

    /**
     * Permission to read, write and administer database
     */
    254: 'Admin',
    /**
     * Permission to read, write and administer all databases
     */
     255: 'SysAdmin',
} as const



export type KnownPermissionNameToCode = typeof knownPermissionNameToCode
export type KnownPermissionCode = KnownPermissionNameToCode[keyof KnownPermissionNameToCode]
export type KnownPermissionName = keyof KnownPermissionNameToCode

export type PermissionCode = number





export type Permission = PermissionCode | KnownPermissionName

export function fromName(name: KnownPermissionName): Permission {
    return name
}
export function fromCode(code: number): Permission {
    const map: Record<number, KnownPermissionName | undefined> = knownPermissionCodeToName
    return map[code] ?? code
}
export function toCode(permission: Permission): PermissionCode {
    return typeof permission === 'number' 
        ? permission 
        : knownPermissionNameToCode[permission]
}







/**
 * Permission for database
 */
 export type DatabasePermission = {
    /**
     * Database name
     */
    database: string;
    /**
     * Permission known name or code
     */
    permission: Permission;
}


export type UserPermission = {
    /**
     * Name of immudb instance user
     */
    username: string;
     /**
     * Database name
     */
    database: string;
    /**
     * Permission known name or code
     */
    permission: Permission;
    
}









