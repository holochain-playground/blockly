import {
  CellId,
  AgentPubKey,
  Hash,
  Dictionary,
  DHTOp,
  SignedHeaderHashed,
  NewEntryHeader,
  Element,
  Entry,
  CapSecret,
} from '@holochain-open-dev/core-types';
import { Conductor } from '../conductor';
import { genesis, genesis_task } from './workflows/genesis';
import {
  CallZomeFnWorkflow,
  call_zome_fn_workflow,
} from './workflows/call_zome_fn';
import { P2pCell } from '../network/p2p-cell';
import { incoming_dht_ops_task } from './workflows/incoming_dht_ops';
import { CellState } from './state';
import { Workflow, WorkflowType, Workspace } from './workflows/workflows';
import { MiddlewareExecutor } from '../../executor/middleware-executor';
import { GetLinksResponse, GetResult } from './cascade/types';
import { Authority } from './cascade/authority';
import { getHashType, HashType } from '../../processors/hash';
import { valid_cap_grant } from './source-chain/utils';
import { GetLinksOptions, GetOptions } from '../../types';
import { Cascade } from './cascade/cascade';
import { cloneDeep } from 'lodash-es';
import {
  buildZomeFunctionContext,
  HostFnWorkspace,
  SimulatedZomeFunctionContext,
} from '../hdk';

export type CellSignal = 'after-workflow-executed' | 'before-workflow-executed';
export type CellSignalListener = (payload: any) => void;

export class Cell {
  _pendingWorkflows: Dictionary<Workflow<any, any>> = {};

  workflowExecutor = new MiddlewareExecutor<Workflow<any, any>>();

  constructor(
    private _state: CellState,
    public conductor: Conductor,
    public p2p: P2pCell
  ) {
    // Let genesis be run before actually joining
    setTimeout(() => {
      this.p2p.join(this);
    });
  }

  get cellId(): CellId {
    return [this._state.dnaHash, this._state.agentPubKey];
  }

  get agentPubKey(): AgentPubKey {
    return this.cellId[1];
  }

  get dnaHash(): Hash {
    return this.cellId[0];
  }

  getState(): CellState {
    return cloneDeep(this._state);
  }

  getSimulatedDna() {
    return this.conductor.registeredDnas[this.dnaHash];
  }

  private getCascade(): Cascade {
    return new Cascade(this._state, this.p2p);
  }

  static async create(
    conductor: Conductor,
    cellId: CellId,
    membrane_proof: any
  ): Promise<Cell> {
    const newCellState: CellState = {
      dnaHash: cellId[0],
      agentPubKey: cellId[1],
      CAS: {},
      integrationLimbo: {},
      metadata: {
        link_meta: [],
        misc_meta: {},
        system_meta: {},
      },
      validationLimbo: {},
      integratedDHTOps: {},
      authoredDHTOps: {},
      sourceChain: [],
    };

    const p2p = conductor.network.createP2pCell(cellId);

    const cell = new Cell(newCellState, conductor, p2p);

    await cell._runWorkflow(genesis_task(cellId, membrane_proof));

    return cell;
  }

  /** Workflows */

  callZomeFn(args: {
    zome: string;
    fnName: string;
    payload: any;
    cap: string;
    provenance: AgentPubKey;
  }): Promise<any> {
    return this._runWorkflow(
      call_zome_fn_workflow(
        args.zome,
        args.fnName,
        args.payload,
        args.provenance
      )
    );
  }

  /** Network handlers */
  // https://github.com/holochain/holochain/blob/develop/crates/holochain/src/conductor/cell.rs#L429
  public async handle_new_neighbor(neighborPubKey: AgentPubKey): Promise<void> {
    this.p2p.addNeighbor(neighborPubKey);
  }

  public handle_publish(
    from_agent: AgentPubKey,
    dht_hash: Hash, // The basis for the DHTOps
    ops: Dictionary<DHTOp>
  ): Promise<void> {
    return this._runWorkflow(incoming_dht_ops_task(from_agent, dht_hash, ops));
  }

  public async handle_get(
    dht_hash: Hash,
    options: GetOptions
  ): Promise<GetResult | undefined> {
    const authority = new Authority(this._state, this.p2p);

    const hashType = getHashType(dht_hash);
    if (hashType === HashType.ENTRY || hashType === HashType.AGENT) {
      return authority.handle_get_entry(dht_hash, options);
    } else if (hashType === HashType.HEADER) {
      return authority.handle_get_element(dht_hash, options);
    }
    return undefined;
  }

  public async handle_get_links(
    base_address: Hash,
    options: GetLinksOptions
  ): Promise<GetLinksResponse> {
    const authority = new Authority(this._state, this.p2p);
    return authority.handle_get_links(base_address, options);
  }

  public async handle_call_remote(
    from_agent: AgentPubKey,
    zome_name: string,
    fn_name: string,
    cap: CapSecret | undefined,
    payload: any
  ): Promise<any> {
    return this.callZomeFn({
      zome: zome_name,
      cap: cap as CapSecret,
      fnName: fn_name,
      payload,
      provenance: from_agent,
    });
  }

  /** Workflow internal execution */

  triggerWorkflow(workflow: Workflow<any, any>) {
    this._pendingWorkflows[workflow.type] = workflow;

    setTimeout(() => this._runPendingWorkflows(), 20);
  }

  async _runPendingWorkflows() {
    const workflowsToRun = this._pendingWorkflows;
    this._pendingWorkflows = {};

    const promises = Object.values(workflowsToRun).map(w =>
      this._runWorkflow(w)
    );

    await Promise.all(promises);
  }

  async _runWorkflow(workflow: Workflow<any, any>): Promise<any> {
    let zomeIndex: number | undefined = undefined;
    if (workflow.type === WorkflowType.CALL_ZOME) {
      const zomeName = (workflow as CallZomeFnWorkflow).details.zome;
      const i = this.getSimulatedDna().zomes.findIndex(
        zome => zome.name === zomeName
      );
      if (i >= 0) zomeIndex = i;
    }

    const result = await this.workflowExecutor.execute(
      () => workflow.task(this.buildWorkspace(zomeIndex)),
      workflow
    );

    result.triggers.forEach(triggeredWorkflow =>
      this.triggerWorkflow(triggeredWorkflow)
    );
    return result.result;
  }

  /** Private helpers */

  private buildWorkspace(zomeIndex?: number): Workspace {
    let zomeFnContext: SimulatedZomeFunctionContext | undefined = undefined;

    if (zomeIndex !== undefined) {
      const hostFnWorkspace: HostFnWorkspace = {
        cascade: this.getCascade(),
        state: this._state,
        dna: this.getSimulatedDna(),
        p2p: this.p2p,
      };
      zomeFnContext = buildZomeFunctionContext(hostFnWorkspace, zomeIndex);
    }

    return {
      state: this._state,
      p2p: this.p2p,
      dna: this.getSimulatedDna(),
      zomeFnContext,
    };
  }
}
