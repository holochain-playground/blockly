import { CellId, Dictionary, Hash } from '@holochain-open-dev/core-types';
import { Cell } from '../core/cell';
export declare class BootstrapService {
    cells: Dictionary<Dictionary<Cell>>;
    announceCell(cellId: CellId, cell: Cell): void;
    getNeighborhood(dnaHash: Hash, basis_dht_hash: Hash, numNeighbors: number): Cell[];
    getFarKnownPeers(dnaHash: Hash, agentPubKey: string): Cell[];
}
