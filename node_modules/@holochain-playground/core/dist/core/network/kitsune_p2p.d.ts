import { AgentPubKey, Hash } from '@holochain-open-dev/core-types';
import { Cell } from '../cell/cell';
import { Network } from './network';
import { NetworkRequest } from './network-request';
export declare class KitsuneP2p {
    protected network: Network;
    discover: Discover;
    constructor(network: Network);
    rpc_single<T>(dna_hash: Hash, from_agent: AgentPubKey, to_agent: AgentPubKey, networkRequest: NetworkRequest<T>): Promise<T>;
    rpc_multi<T>(dna_hash: Hash, from_agent: AgentPubKey, basis: Hash, remote_agent_count: number, networkRequest: NetworkRequest<T>): Promise<Array<T>>;
}
export declare class Discover {
    protected network: Network;
    constructor(network: Network);
    peer_discover(dna_hash: Hash, from_agent: AgentPubKey, to_agent: AgentPubKey): Promise<Cell>;
    message_neighborhood<T>(dna_hash: Hash, from_agent: AgentPubKey, basis: Hash, remote_agent_count: number, networkRequest: NetworkRequest<T>): Promise<Array<T>>;
    private search_for_agents;
}
