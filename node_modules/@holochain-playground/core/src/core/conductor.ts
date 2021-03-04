import {
  AgentPubKey,
  CellId,
  Dictionary,
  Hash,
} from '@holochain-open-dev/core-types';
import { Cell, getCellId } from '../core/cell';
import { hash, HashType } from '../processors/hash';
import { Network, NetworkState } from './network/network';

import { SimulatedDna, SimulatedDnaTemplate } from '../dnas/simulated-dna';
import { CellState } from './cell/state';
import { BootstrapService } from '../bootstrap/bootstrap-service';

export interface ConductorState {
  // DnaHash / AgentPubKey
  cellsState: Dictionary<Dictionary<CellState>>;
  networkState: NetworkState;
  registeredTemplates: Dictionary<SimulatedDnaTemplate>;
  registeredDnas: Dictionary<SimulatedDna>;
}

export class Conductor {
  readonly cells: Dictionary<Dictionary<Cell>>;
  registeredTemplates!: Dictionary<SimulatedDnaTemplate>;
  registeredDnas!: Dictionary<SimulatedDna>;

  network: Network;

  constructor(state: ConductorState, bootstrapService: BootstrapService) {
    this.network = new Network(state.networkState, this, bootstrapService);
    this.registeredDnas = state.registeredDnas;
    this.registeredTemplates = state.registeredTemplates;

    this.cells = {};
    for (const [dnaHash, dnaCellsStates] of Object.entries(state.cellsState)) {
      if (!this.cells[dnaHash]) this.cells[dnaHash] = {};

      for (const [agentPubKey, cellState] of Object.entries(dnaCellsStates)) {
        this.cells[dnaHash][agentPubKey] = new Cell(
          cellState,
          this,
          this.network.createP2pCell(getCellId(cellState))
        );
      }
    }
  }

  static async create(bootstrapService: BootstrapService): Promise<Conductor> {
    const state: ConductorState = {
      cellsState: {},
      networkState: {
        p2pCellsState: {},
      },
      registeredDnas: {},
      registeredTemplates: {},
    };

    return new Conductor(state, bootstrapService);
  }

  getState(): ConductorState {
    const cellsState: Dictionary<Dictionary<CellState>> = {};

    for (const [dnaHash, dnaCells] of Object.entries(this.cells)) {
      if (!cellsState[dnaHash]) cellsState[dnaHash];

      for (const [agentPubKey, cell] of Object.entries(dnaCells)) {
        cellsState[dnaHash][agentPubKey] = cell.getState();
      }
    }

    return {
      networkState: this.network.getState(),
      cellsState,
      registeredDnas: this.registeredDnas,
      registeredTemplates: this.registeredTemplates,
    };
  }

  getAllCells(): Cell[] {
    const nestedCells = Object.values(this.cells).map(dnaCells =>
      Object.values(dnaCells)
    );

    return ([] as Cell[]).concat(...nestedCells);
  }

  getCells(dnaHash: Hash): Cell[] {
    const dnaCells = this.cells[dnaHash];
    return dnaCells ? Object.values(dnaCells) : [];
  }

  getCell(dnaHash: Hash, agentPubKey: AgentPubKey): Cell | undefined {
    return this.cells[dnaHash] ? this.cells[dnaHash][agentPubKey] : undefined;
  }

  async registerDna(dna_template: SimulatedDnaTemplate): Promise<Hash> {
    const templateHash = hash(dna_template, HashType.DNA);

    this.registeredTemplates[templateHash] = dna_template;
    return templateHash;
  }

  async installApp(
    dna_hash: Hash,
    membrane_proof: any,
    properties: any,
    uuid: string
  ): Promise<Cell> {
    const rand = `${Math.random().toString()}/${Date.now()}`;
    const agentId = hash(rand, HashType.AGENT);

    const template = this.registeredTemplates[dna_hash];
    if (!template) {
      throw new Error(`The given dna is not registered on this conductor`);
    }

    const dna: SimulatedDna = {
      ...template,
      properties,
      uuid,
    };
    const dnaHash = hash(dna, HashType.DNA);
    this.registeredDnas[dnaHash] = dna;

    const cellId: CellId = [dnaHash, agentId];
    const cell = await Cell.create(this, cellId, membrane_proof);

    if (!this.cells[cell.dnaHash]) this.cells[cell.dnaHash] = {};

    this.cells[cell.dnaHash][cell.agentPubKey] = cell;

    return cell;
  }

  callZomeFn(args: {
    cellId: CellId;
    zome: string;
    fnName: string;
    payload: any;
    cap: string;
  }): Promise<any> {
    const dnaHash = args.cellId[0];
    const agentPubKey = args.cellId[1];
    const cell = this.cells[dnaHash][agentPubKey];

    if (!cell)
      throw new Error(`No cells existst with cellId ${dnaHash}:${agentPubKey}`);

    return cell.callZomeFn({
      zome: args.zome,
      cap: args.cap,
      fnName: args.fnName,
      payload: args.payload,
      provenance: agentPubKey,
    });
  }
}
