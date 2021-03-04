import { Cell, Workflow } from '../../cell';
import { CellState, IntegratedDhtOpsValue } from '../state';
import { pullAllIntegrationLimboDhtOps } from '../dht/get';
import {
  putDhtOpData,
  putDhtOpMetadata,
  putDhtOpToIntegrated,
} from '../dht/put';
import { WorkflowReturn, WorkflowType, Workspace } from './workflows';

// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/workflow/integrate_dht_ops_workflow.rs
export const integrate_dht_ops = async (
  worskpace: Workspace
): Promise<WorkflowReturn<void>> => {
  const opsToIntegrate = pullAllIntegrationLimboDhtOps(worskpace.state);

  for (const dhtOpHash of Object.keys(opsToIntegrate)) {
    const integrationLimboValue = opsToIntegrate[dhtOpHash];

    const dhtOp = integrationLimboValue.op;

    await putDhtOpData(dhtOp)(worskpace.state);
    putDhtOpMetadata(dhtOp)(worskpace.state);

    const value: IntegratedDhtOpsValue = {
      op: dhtOp,
      validation_status: integrationLimboValue.validation_status,
      when_integrated: Date.now(),
    };

    putDhtOpToIntegrated(dhtOpHash, value)(worskpace.state);
  }
  return {
    result: undefined,
    triggers: [],
  };
};

export type IntegrateDhtOpsWorkflow = Workflow<void, void>;

export function integrate_dht_ops_task(
): IntegrateDhtOpsWorkflow {
  return {
    type: WorkflowType.INTEGRATE_DHT_OPS,
    details: undefined,
    task: (worskpace) => integrate_dht_ops(worskpace),
  };
}
