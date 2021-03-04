import { CellId, AgentPubKey, Hash, Dictionary, DHTOp, CapSecret } from '@holochain-open-dev/core-types';
import { Conductor } from '../conductor';
import { P2pCell } from '../network/p2p-cell';
import { CellState } from './state';
import { Workflow } from './workflows/workflows';
import { MiddlewareExecutor } from '../../executor/middleware-executor';
import { GetLinksResponse, GetResult } from './cascade/types';
import { GetLinksOptions, GetOptions } from '../../types';
export declare type CellSignal = 'after-workflow-executed' | 'before-workflow-executed';
export declare type CellSignalListener = (payload: any) => void;
export declare class Cell {
    private _state;
    conductor: Conductor;
    p2p: P2pCell;
    _pendingWorkflows: Dictionary<Workflow<any, any>>;
    workflowExecutor: MiddlewareExecutor<Workflow<any, any>>;
    constructor(_state: CellState, conductor: Conductor, p2p: P2pCell);
    get cellId(): CellId;
    get agentPubKey(): AgentPubKey;
    get dnaHash(): Hash;
    getState(): CellState;
    getSimulatedDna(): import("../..").SimulatedDna;
    private getCascade;
    static create(conductor: Conductor, cellId: CellId, membrane_proof: any): Promise<Cell>;
    /** Workflows */
    callZomeFn(args: {
        zome: string;
        fnName: string;
        payload: any;
        cap: string;
        provenance: AgentPubKey;
    }): Promise<any>;
    /** Network handlers */
    handle_new_neighbor(neighborPubKey: AgentPubKey): Promise<void>;
    handle_publish(from_agent: AgentPubKey, dht_hash: Hash, // The basis for the DHTOps
    ops: Dictionary<DHTOp>): Promise<void>;
    handle_get(dht_hash: Hash, options: GetOptions): Promise<GetResult | undefined>;
    handle_get_links(base_address: Hash, options: GetLinksOptions): Promise<GetLinksResponse>;
    handle_call_remote(from_agent: AgentPubKey, zome_name: string, fn_name: string, cap: CapSecret | undefined, payload: any): Promise<any>;
    /** Workflow internal execution */
    triggerWorkflow(workflow: Workflow<any, any>): void;
    _runPendingWorkflows(): Promise<void>;
    _runWorkflow(workflow: Workflow<any, any>): Promise<any>;
    /** Private helpers */
    private buildWorkspace;
}
