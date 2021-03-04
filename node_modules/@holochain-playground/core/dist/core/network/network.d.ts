import { CellId, Dictionary, Hash } from '@holochain-open-dev/core-types';
import { BootstrapService } from '../../bootstrap/bootstrap-service';
import { Conductor } from '../conductor';
import { P2pCell, P2pCellState } from '../network/p2p-cell';
import { KitsuneP2p } from './kitsune_p2p';
import { NetworkRequest } from './network-request';
export interface NetworkState {
    p2pCellsState: Dictionary<Dictionary<P2pCellState>>;
}
export declare class Network {
    conductor: Conductor;
    bootstrapService: BootstrapService;
    p2pCells: Dictionary<Dictionary<P2pCell>>;
    kitsune: KitsuneP2p;
    constructor(state: NetworkState, conductor: Conductor, bootstrapService: BootstrapService);
    getState(): NetworkState;
    getAllP2pCells(): P2pCell[];
    createP2pCell(cellId: CellId): P2pCell;
    sendRequest<T>(dna: Hash, fromAgent: Hash, toAgent: Hash, request: NetworkRequest<T>): Promise<T>;
}
