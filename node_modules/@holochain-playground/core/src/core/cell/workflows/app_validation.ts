import { Cell, Workflow } from '../../cell';
import {
  ValidationLimboStatus,
  IntegrationLimboValue,
  ValidationStatus,
  CellState,
} from '../state';
import { getValidationLimboDhtOps } from '../dht/get';
import {
  deleteValidationLimboValue,
  putIntegrationLimboValue,
} from '../dht/put';
import { integrate_dht_ops_task } from './integrate_dht_ops';
import { WorkflowReturn, WorkflowType, Workspace } from './workflows';

// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/workflow/app_validation_workflow.rs
export const app_validation = async (
  worskpace: Workspace
): Promise<WorkflowReturn<void>> => {
  const pendingDhtOps = getValidationLimboDhtOps(
    worskpace.state,
    ValidationLimboStatus.SysValidated
  );

  // TODO: actually validate
  for (const dhtOpHash of Object.keys(pendingDhtOps)) {
    deleteValidationLimboValue(dhtOpHash)(worskpace.state);

    const validationLimboValue = pendingDhtOps[dhtOpHash];

    const value: IntegrationLimboValue = {
      op: validationLimboValue.op,
      validation_status: ValidationStatus.Valid,
    };

    putIntegrationLimboValue(dhtOpHash, value)(worskpace.state);
  }

  return {
    result: undefined,
    triggers: [integrate_dht_ops_task()],
  };
};

export type AppValidationWorkflow = Workflow<any, any>;

export function app_validation_task(): AppValidationWorkflow {
  return {
    type: WorkflowType.APP_VALIDATION,
    details: undefined,
    task: worskpace => app_validation(worskpace),
  };
}
