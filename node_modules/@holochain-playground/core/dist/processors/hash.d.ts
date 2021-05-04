import { Hash } from '@holochain-open-dev/core-types';
export declare enum HashType {
    AGENT = 0,
    ENTRY = 1,
    DHTOP = 2,
    HEADER = 3,
    DNA = 4
}
export declare const AGENT_PREFIX = "hCAk";
export declare const ENTRY_PREFIX = "hCEk";
export declare const DHTOP_PREFIX = "hCQk";
export declare const DNA_PREFIX = "hC0k";
export declare const HEADER_PREFIX = "hCkk";
export declare function hash(content: any, type: HashType): Hash;
export declare function location(hash: string): number;
export declare function distance(hash1: Hash, hash2: Hash): number;
export declare function shortest_arc_distance(location1: number, location2: number): number;
export declare function wrap(uint: number): number;
export declare function getHashType(hash: Hash): HashType;
