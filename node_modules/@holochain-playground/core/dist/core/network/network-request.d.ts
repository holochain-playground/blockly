import { AgentPubKey, DHTOp, Dictionary, Hash } from '@holochain-open-dev/core-types';
import { GetOptions } from '../../types';
import { Cell } from '../cell/cell';
export declare enum NetworkRequestType {
    CALL_REMOTE = "Call Remote",
    PUBLISH_REQUEST = "Publish Request",
    GET_REQUEST = "Get Request",
    WARRANT = "Warrant",
    GOSSIP = "Gossip",
    CONNECT = "Connect"
}
export declare type NetworkRequest<T> = (cell: Cell) => Promise<T>;
export interface NetworkRequestInfo<T extends NetworkRequestType, D> {
    dnaHash: Hash;
    fromAgent: AgentPubKey;
    toAgent: AgentPubKey;
    type: T;
    details: D;
}
export declare type PublishRequestInfo = NetworkRequestInfo<NetworkRequestType.PUBLISH_REQUEST, {
    dhtOps: Dictionary<DHTOp>;
}>;
export declare type GetRequestInfo = NetworkRequestInfo<NetworkRequestType.GET_REQUEST, {
    hash: Hash;
    options: GetOptions;
}>;
export declare type CallRemoteRequestInfo = NetworkRequestInfo<NetworkRequestType.CALL_REMOTE, {}>;
