import { AgentPubKey, DHTOp, Hash, ValidationReceipt } from '@holochain-open-dev/core-types';
import { CellState } from '../cell';
export declare function getClosestNeighbors(peers: Hash[], targetHash: Hash, numNeighbors: number): Hash[];
export declare function getFarthestNeighbors(peers: Hash[], targetHash: Hash): Hash[];
export interface BadAction {
    badAgents: AgentPubKey[];
    op: DHTOp;
    receipts: ValidationReceipt[];
}
export declare function getBadActions(state: CellState): Array<BadAction>;
export declare function getBadAgents(state: CellState): AgentPubKey[];
