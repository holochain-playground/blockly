import { Hash, SignedHeaderHashed } from '@holochain-open-dev/core-types';
import { CellState } from '../state';
/**
 * Returns the header hashes which don't have their DHTOps in the authoredDHTOps DB
 */
export declare function getNewHeaders(state: CellState): Array<Hash>;
export declare function getAllAuthoredHeaders(state: CellState): Array<SignedHeaderHashed>;
