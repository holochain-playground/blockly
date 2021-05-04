import { PlaygroundContext } from './context';
import { Hash, AgentPubKey } from '@holochain-open-dev/core-types';
import { Conductor } from '@holochain-playground/core';
import { LitElement } from 'lit';
declare const PlaygroundElement_base: new () => LitElement;
export declare class PlaygroundElement extends PlaygroundElement_base {
    /** Context variables */
    activeDna: Hash | undefined;
    activeAgentPubKey: AgentPubKey | undefined;
    activeHash: Hash | undefined;
    conductors: Conductor[];
    conductorsUrls: string[] | undefined;
    static get inject(): string[];
    updatePlayground(context: Partial<PlaygroundContext>): void;
    showMessage(message: string): void;
}
export {};
