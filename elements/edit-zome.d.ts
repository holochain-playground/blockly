import { LitElement, PropertyValues } from 'lit-element';
import { SimulatedZome } from '@holochain-playground/core';
import { Workspace } from 'blockly';
import 'blockly/javascript';
declare const EditZome_base: typeof LitElement & import("lit-element").Constructor<import("@holochain-playground/elements").IPlaygroundElement>;
export declare class EditZome extends EditZome_base {
    zome: SimulatedZome;
    editing: boolean;
    blocklyArea: HTMLElement;
    _workspace: Workspace;
    static get styles(): import("lit-element").CSSResult[];
    updated(changedValues: PropertyValues): void;
    firstUpdated(): void;
    _checkTimeout: any;
    setupBlockly(): void;
    isValid(): Promise<boolean>;
    getZome(): Promise<SimulatedZome>;
    render(): import("lit-element").TemplateResult;
}
export {};
