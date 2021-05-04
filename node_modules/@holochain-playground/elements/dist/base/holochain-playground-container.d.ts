import { Snackbar } from 'scoped-material-components/mwc-snackbar';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { LitElement, PropertyValues } from 'lit';
import { Conductor, SimulatedHappBundle } from '@holochain-playground/core';
import { AgentPubKey, Hash } from '@holochain-open-dev/core-types';
declare const HolochainPlaygroundContainer_base: new () => LitElement;
export declare class HolochainPlaygroundContainer extends HolochainPlaygroundContainer_base {
    numberOfSimulatedConductors: number;
    simulatedHapp: SimulatedHappBundle;
    private snackbar;
    private message;
    /** Context variables */
    activeDna: Hash | undefined;
    activeAgentPubKey: AgentPubKey | undefined;
    activeHash: Hash | undefined;
    conductors: Conductor[];
    conductorsUrls: string[] | undefined;
    static get provide(): string[];
    static get styles(): import("lit").CSSResultGroup;
    update(changedValues: PropertyValues): void;
    firstUpdated(): Promise<void>;
    showMessage(message: string): void;
    renderSnackbar(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
    static elementDefinitions: {
        'mwc-circular-progress': typeof CircularProgress;
        'mwc-snackbar': typeof Snackbar;
        'mwc-icon-button': typeof IconButton;
    };
}
export {};
