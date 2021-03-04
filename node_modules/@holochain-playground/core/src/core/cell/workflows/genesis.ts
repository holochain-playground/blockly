import {
  AgentPubKey,
  Hash,
  Entry,
  CellId,
} from '@holochain-open-dev/core-types';
import { Cell, Workflow } from '../../cell';
import {
  buildAgentValidationPkg,
  buildCreate,
  buildDna,
  buildShh,
} from '../source-chain/builder-headers';
import { putElement } from '../source-chain/put';
import { CellState } from '../state';
import { produce_dht_ops_task } from './produce_dht_ops';
import { WorkflowReturn, WorkflowType, Workspace } from './workflows';

export const genesis = (
  agentId: AgentPubKey,
  dnaHash: Hash,
  membrane_proof: any
) => async (worskpace: Workspace): Promise<WorkflowReturn<void>> => {
  const dna = buildDna(dnaHash, agentId);
  putElement({ signed_header: buildShh(dna), entry: undefined })(
    worskpace.state
  );

  const pkg = buildAgentValidationPkg(worskpace.state, membrane_proof);
  putElement({ signed_header: buildShh(pkg), entry: undefined })(
    worskpace.state
  );

  const entry: Entry = {
    content: agentId,
    entry_type: 'Agent',
  };
  const create_agent_pub_key_entry = buildCreate(
    worskpace.state,
    entry,
    'Agent'
  );
  putElement({
    signed_header: buildShh(create_agent_pub_key_entry),
    entry: entry,
  })(worskpace.state);

  return {
    result: undefined,
    triggers: [produce_dht_ops_task()],
  };
};

export type GenesisWorkflow = Workflow<
  { cellId: CellId; membrane_proof: any },
  void
>;

export function genesis_task(
  cellId: CellId,
  membrane_proof: any
): GenesisWorkflow {
  return {
    type: WorkflowType.GENESIS,
    details: {
      cellId,
      membrane_proof,
    },
    task: worskpace => genesis(cellId[1], cellId[0], membrane_proof)(worskpace),
  };
}
