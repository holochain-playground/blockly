import { AgentPubKey, Hash, CellId } from '@holochain-open-dev/core-types';
import { Workflow } from '../../cell';
import { WorkflowReturn, Workspace } from './workflows';
export declare const genesis: (agentId: AgentPubKey, dnaHash: Hash, membrane_proof: any) => (worskpace: Workspace) => Promise<WorkflowReturn<void>>;
export declare type GenesisWorkflow = Workflow<{
    cellId: CellId;
    membrane_proof: any;
}, void>;
export declare function genesis_task(cellId: CellId, membrane_proof: any): GenesisWorkflow;
