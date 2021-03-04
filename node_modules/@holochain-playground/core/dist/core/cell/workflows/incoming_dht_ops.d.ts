import { Hash, Dictionary, DHTOp, AgentPubKey } from '@holochain-open-dev/core-types';
import { Workflow } from '../../cell';
import { WorkflowReturn, Workspace } from './workflows';
export declare const incoming_dht_ops: (basis: Hash, dhtOps: Dictionary<DHTOp>, from_agent: AgentPubKey | undefined) => (worskpace: Workspace) => Promise<WorkflowReturn<void>>;
export declare type IncomingDhtOpsWorkflow = Workflow<{
    from_agent: AgentPubKey;
    dht_hash: Hash;
    ops: Dictionary<DHTOp>;
}, void>;
export declare function incoming_dht_ops_task(from_agent: AgentPubKey, dht_hash: Hash, // The basis for the DHTOps
ops: Dictionary<DHTOp>): IncomingDhtOpsWorkflow;
