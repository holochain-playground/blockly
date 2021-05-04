import { SimulatedDna } from '../../../dnas/simulated-dna';
import { BadAgentConfig } from '../../bad-agent';
import { P2pCell } from '../../network/p2p-cell';
import { CellState } from '../state';
import { app_validation_task } from './app_validation';
import { integrate_dht_ops_task } from './integrate_dht_ops';
import { produce_dht_ops_task } from './produce_dht_ops';
import { publish_dht_ops_task } from './publish_dht_ops';
import { sys_validation_task } from './sys_validation';
import { validation_receipt_task } from './validation_receipt';

export interface Workspace {
  state: CellState;
  p2p: P2pCell;
  dna: SimulatedDna;
  badAgentConfig?: BadAgentConfig & { counterfeit_dna?: SimulatedDna };
}

export interface Workflow<D, R> {
  type: WorkflowType;
  details: D;
  task: (worskpace: Workspace) => Promise<WorkflowReturn<R>>;
}
export type WorkflowReturn<R> = {
  result: R;
  triggers: Array<Workflow<any, any>>;
};

export enum WorkflowType {
  CALL_ZOME = 'Call Zome Function',
  SYS_VALIDATION = 'System Validation',
  PUBLISH_DHT_OPS = 'Publish DHT Ops',
  PRODUCE_DHT_OPS = 'Produce DHT Ops',
  APP_VALIDATION = 'App Validation',
  AGENT_VALIDATION = 'Validate Agent',
  INTEGRATE_DHT_OPS = 'Integrate DHT Ops',
  GENESIS = 'Genesis',
  INCOMING_DHT_OPS = 'Incoming DHT Ops',
  VALIDATION_RECEIPT = 'Validation Receipt',
}

export function workflowPriority(workflowType: WorkflowType): number {
  switch (workflowType) {
    case WorkflowType.GENESIS:
      return 0;
    case WorkflowType.CALL_ZOME:
      return 1;
    default:
      return 10;
  }
}

export function triggeredWorkflowFromType(
  type: WorkflowType
): Workflow<any, any> {
  switch (type) {
    case WorkflowType.APP_VALIDATION:
      return app_validation_task();
    case WorkflowType.INTEGRATE_DHT_OPS:
      return integrate_dht_ops_task();
    case WorkflowType.PRODUCE_DHT_OPS:
      return produce_dht_ops_task();
    case WorkflowType.PUBLISH_DHT_OPS:
      return publish_dht_ops_task();
    case WorkflowType.SYS_VALIDATION:
      return sys_validation_task();
    case WorkflowType.VALIDATION_RECEIPT:
      return validation_receipt_task();
    default:
      throw new Error('Trying to trigger a workflow that cannot be triggered');
  }
}
