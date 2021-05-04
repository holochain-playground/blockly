import { AgentPubKey } from '@holochain-open-dev/core-types';
import { HostFn } from '../host-fn';
export interface AgentInfo {
    agent_initial_pubkey: AgentPubKey;
    agent_latest_pubkey: AgentPubKey;
}
export declare type AgentInfoFn = () => Promise<AgentInfo>;
export declare const agent_info: HostFn<AgentInfoFn>;
