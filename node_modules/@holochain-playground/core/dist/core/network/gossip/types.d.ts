import { AgentPubKey, DHTOp, Dictionary, ValidationReceipt } from '@holochain-open-dev/core-types';
import { BadAction } from '../utils';
export interface GossipData {
    validated_dht_ops: Dictionary<GossipDhtOpData>;
    neighbors: Array<AgentPubKey>;
    badActions: Array<BadAction>;
}
export interface GossipDhtOpData {
    op: DHTOp;
    validation_receipts: ValidationReceipt[];
}
