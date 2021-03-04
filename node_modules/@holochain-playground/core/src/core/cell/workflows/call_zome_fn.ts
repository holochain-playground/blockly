import { AgentPubKey } from '@holochain-open-dev/core-types';
import { cloneDeep } from 'lodash-es';
import { Cell } from '../../cell';
import { buildZomeFunctionContext } from '../../hdk/context';
import { getTipOfChain, valid_cap_grant } from '../source-chain/utils';
import { produce_dht_ops_task } from './produce_dht_ops';
import { Workflow, WorkflowType, Workspace } from './workflows';

/**
 * Calls the zome function of the cell DNA
 * This can only be called in the simulated mode: we can assume that cell.simulatedDna exists
 */
export const callZomeFn = (
  zomeName: string,
  fnName: string,
  payload: any,
  provenance: AgentPubKey,
  cap: string
) => async (
  worskpace: Workspace
): Promise<{ result: any; triggers: Array<Workflow<any, any>> }> => {
  if (!valid_cap_grant(worskpace.state, zomeName, fnName, provenance, cap))
    throw new Error('Unauthorized Zome Call');

  const currentHeader = getTipOfChain(worskpace.state);

  const zomeIndex = worskpace.dna.zomes.findIndex(
    zome => zome.name === zomeName
  );
  if (zomeIndex < 0)
    throw new Error(`There is no zome with the name ${zomeName} in this DNA`);

  if (!worskpace.dna.zomes[zomeIndex].zome_functions[fnName])
    throw new Error(
      `There isn't a function with the name ${fnName} in this zome with the name ${zomeName}`
    );

  if (!worskpace.zomeFnContext)
    throw new Error(`Internal error: no zome function context was provided`);

  const result = await worskpace.dna.zomes[zomeIndex].zome_functions[
    fnName
  ].call(worskpace.zomeFnContext)(payload);

  let triggers: Array<Workflow<any, any>> = [];
  if (getTipOfChain(worskpace.state) != currentHeader) {
    // Do validation

    triggers.push(produce_dht_ops_task());
  }

  return {
    result: cloneDeep(result),
    triggers,
  };
};

export type CallZomeFnWorkflow = Workflow<
  { zome: string; fnName: string; payload: any },
  any
>;

export function call_zome_fn_workflow(
  zome: string,
  fnName: string,
  payload: any,
  provenance: AgentPubKey
): CallZomeFnWorkflow {
  return {
    type: WorkflowType.CALL_ZOME,
    details: {
      fnName,
      payload,
      zome,
    },
    task: worskpace =>
      callZomeFn(zome, fnName, payload, provenance, '')(worskpace),
  };
}
