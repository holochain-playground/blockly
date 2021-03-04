import { Cell } from '../../cell';
import { ValidationLimboStatus } from '../state';
import { getValidationLimboDhtOps } from '../dht/get';
import { putValidationLimboValue } from '../dht/put';
import { app_validation_task } from './app_validation';
import { Workflow, WorkflowReturn, WorkflowType, Workspace } from './workflows';

// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/workflow/sys_validation_workflow.rs
export const sys_validation = async (
  worskpace: Workspace
): Promise<WorkflowReturn<void>> => {
  const pendingDhtOps = getValidationLimboDhtOps(
    worskpace.state,
    ValidationLimboStatus.Pending
  );

  // TODO: actually validate
  for (const dhtOpHash of Object.keys(pendingDhtOps)) {
    const limboValue = pendingDhtOps[dhtOpHash];

    limboValue.status = ValidationLimboStatus.SysValidated;

    putValidationLimboValue(dhtOpHash, limboValue)(worskpace.state);
  }

  return {
    result: undefined,
    triggers: [app_validation_task()],
  };
};

export type SysValidationWorkflow = Workflow<void, void>;

export function sys_validation_task(): SysValidationWorkflow {
  return {
    type: WorkflowType.SYS_VALIDATION,
    details: undefined,
    task: worskpace => sys_validation(worskpace),
  };
}
