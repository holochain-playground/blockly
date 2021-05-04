import { AgentPubKey, Hash } from './common';
import { Timestamp } from './timestamp';
export declare enum ValidationStatus {
    Valid = 0,
    Rejected = 1,
    Abandoned = 2
}
export interface ValidationReceipt {
    dht_op_hash: Hash;
    validation_status: ValidationStatus;
    validator: AgentPubKey;
    when_integrated: Timestamp;
}
