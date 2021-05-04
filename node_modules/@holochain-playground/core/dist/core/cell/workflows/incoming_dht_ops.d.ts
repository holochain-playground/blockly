import { Dictionary, DHTOp, AgentPubKey } from '@holochain-open-dev/core-types';
import { Workflow } from '../../cell';
import { WorkflowReturn, Workspace } from './workflows';
export declare const incoming_dht_ops: (dhtOps: Dictionary<DHTOp>, request_validation_receipt: boolean, from_agent: AgentPubKey | undefined) => (workspace: Workspace) => Promise<WorkflowReturn<void>>;
export declare type IncomingDhtOpsWorkflow = Workflow<{
    from_agent: AgentPubKey;
    ops: Dictionary<DHTOp>;
}, void>;
export declare function incoming_dht_ops_task(from_agent: AgentPubKey, request_validation_receipt: boolean, ops: Dictionary<DHTOp>): IncomingDhtOpsWorkflow;
