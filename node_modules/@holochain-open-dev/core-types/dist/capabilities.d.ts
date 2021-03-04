import { AgentPubKey } from "./common";
export declare type CapSecret = string;
export interface CapClaim {
    tag: string;
    grantor: AgentPubKey;
    secret: CapSecret;
}
export interface ZomeCallCapGrant {
    tag: string;
    access: CapAccess;
    functions: Array<{
        zome: string;
        fn_name: string;
    }>;
}
export declare type CapAccess = "Unrestricted" | {
    Transferable: {
        secret: CapSecret;
    };
} | {
    Assigned: {
        secret: CapSecret;
        assignees: AgentPubKey[];
    };
};
export declare type CapGrant = {
    ChainAuthor: AgentPubKey;
} | {
    RemoteAgent: ZomeCallCapGrant;
};
