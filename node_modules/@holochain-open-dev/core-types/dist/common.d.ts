export declare type Dictionary<T> = {
    [key: string]: T;
};
export declare type Hash = string;
export declare type AgentPubKey = string;
export declare type Signature = Uint8Array;
export declare type CellId = [Hash, AgentPubKey];
