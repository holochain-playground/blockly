import {
  AgentPubKey,
  DHTOp,
  Dictionary,
  Hash,
  Metadata,
  ValidationReceipt,
} from '@holochain-open-dev/core-types';
import { location } from '../../processors/hash';
import { contains, DhtArc } from '../network/dht_arc';

export interface CellState {
  dnaHash: Hash;
  agentPubKey: AgentPubKey;
  sourceChain: Array<Hash>;
  CAS: Dictionary<any>;
  metadata: Metadata; // For the moment only DHT shard
  integratedDHTOps: Dictionary<IntegratedDhtOpsValue>; // Key is the hash of the DHT op
  authoredDHTOps: Dictionary<AuthoredDhtOpsValue>; // Key is the hash of the DHT op
  integrationLimbo: Dictionary<IntegrationLimboValue>; // Key is the hash of the DHT op
  validationLimbo: Dictionary<ValidationLimboValue>; // Key is the hash of the DHT op
  validationReceipts: Dictionary<Dictionary<ValidationReceipt>>; // Segmented by dhtOpHash/authorOfReceipt
  badAgents: AgentPubKey[];
}

export interface IntegratedDhtOpsValue {
  op: DHTOp;
  validation_status: ValidationStatus;
  when_integrated: number;
  /// Send a receipt to this author.
  send_receipt: Boolean;
}

export interface IntegrationLimboValue {
  op: DHTOp;
  validation_status: ValidationStatus;
  /// Send a receipt to this author.
  send_receipt: Boolean;
}

export enum ValidationStatus {
  Valid,
  Rejected,
  Abandoned,
}

// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/state/dht_op_integration.rs
export interface AuthoredDhtOpsValue {
  op: DHTOp;
  receipt_count: number;
  last_publish_time: number | undefined;
}

export enum ValidationLimboStatus {
  Pending,
  AwaitingSysDeps,
  SysValidated,
  AwaitingAppDeps,
}

// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/state/validation_db.rs#L24
export interface ValidationLimboValue {
  status: ValidationLimboStatus;
  op: DHTOp;
  basis: Hash;
  time_added: number;
  last_try: number | undefined;
  num_tries: number;
  from_agent: AgentPubKey | undefined;
  /// Send a receipt to this author.
  send_receipt: Boolean;
}

export function query_dht_ops(
  integratedDHTOps: Dictionary<IntegratedDhtOpsValue>,
  from: number | undefined,
  to: number | undefined,
  dht_arc: DhtArc
): Array<Hash> {
  const isDhtOpsInFilter = ([dhtOpHash, dhtOpValue]: [
    Hash,
    IntegratedDhtOpsValue
  ]) => {
    if (from && dhtOpValue.when_integrated < from) return false;
    if (to && dhtOpValue.when_integrated > to) return false;
    if (dht_arc && !contains(dht_arc, location(dhtOpHash))) return false;
  };

  const ops = Object.entries(integratedDHTOps).filter(isDhtOpsInFilter);
  return ops.map(op => op[0]);
}
