import { Hash } from '@holochain-open-dev/core-types';
export declare function getClosestNeighbors(peers: Hash[], targetHash: Hash, numNeighbors: number): Hash[];
export declare function getFarthestNeighbors(peers: Hash[], targetHash: Hash): Hash[];
