import { AgentPubKey, CapSecret, CellId, DHTOp, Dictionary, Hash } from '@holochain-open-dev/core-types';
import { MiddlewareExecutor } from '../../executor/middleware-executor';
import { GetLinksOptions, GetOptions } from '../../types';
import { Cell } from '../cell';
import { GetElementResponse, GetEntryResponse, GetLinksResponse } from '../cell/cascade/types';
import { Connection } from './connection';
import { DhtArc } from './dht_arc';
import { SimpleBloomMod } from './gossip/bloom';
import { GossipData } from './gossip/types';
import { Network } from './network';
import { NetworkRequestInfo } from './network-request';
export declare type P2pCellState = {
    neighbors: AgentPubKey[];
    farKnownPeers: AgentPubKey[];
    badAgents: AgentPubKey[];
    redundancyFactor: number;
    neighborNumber: number;
};
export declare class P2pCell {
    cell: Cell;
    protected network: Network;
    farKnownPeers: AgentPubKey[];
    storageArc: DhtArc;
    neighborNumber: number;
    redundancyFactor: number;
    _gossipLoop: SimpleBloomMod;
    networkRequestsExecutor: MiddlewareExecutor<NetworkRequestInfo<any, any>>;
    neighborConnections: Dictionary<Connection | undefined>;
    constructor(state: P2pCellState, cell: Cell, network: Network);
    getState(): P2pCellState;
    get cellId(): CellId;
    get badAgents(): string[];
    /** P2p actions */
    join(containerCell: Cell): Promise<void>;
    leave(): Promise<void>;
    publish(dht_hash: Hash, ops: Dictionary<DHTOp>): Promise<void>;
    get(dht_hash: Hash, options: GetOptions): Promise<GetElementResponse | GetEntryResponse | undefined>;
    get_links(base_address: Hash, options: GetLinksOptions): Promise<GetLinksResponse[]>;
    call_remote(agent: AgentPubKey, zome: string, fnName: string, cap: CapSecret | undefined, payload: any): Promise<any>;
    /** Neighbor handling */
    get neighbors(): Array<AgentPubKey>;
    connectWith(peer: Cell): Promise<Connection>;
    check_agent_valid(peer: Cell): Promise<void>;
    handleOpenNeighborConnection(from: Cell, connection: Connection): void;
    handleCloseNeighborConnection(from: Cell): void;
    openNeighborConnection(withPeer: Cell): Promise<Connection>;
    closeNeighborConnection(withPeer: AgentPubKey): void;
    syncNeighbors(): Promise<void>;
    shouldWeHold(dhtOpHash: Hash): boolean;
    /** Gossip */
    outgoing_gossip(to_agent: AgentPubKey, gossips: GossipData, warrant?: boolean): Promise<void>;
    /** Executors */
    private _executeNetworkRequest;
}
