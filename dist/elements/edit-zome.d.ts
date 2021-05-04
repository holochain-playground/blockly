import { PropertyValues } from 'lit';
import { PlaygroundElement } from '@holochain-playground/elements';
import { SimulatedZome } from '@holochain-playground/core';
import { Workspace } from 'blockly';
import 'blockly/javascript';
export declare class EditZome extends PlaygroundElement {
    zome: SimulatedZome;
    editing: boolean;
    blocklyArea: HTMLElement;
    _workspace: Workspace;
    static get styles(): import("lit").CSSResultGroup[];
    updated(changedValues: PropertyValues): void;
    firstUpdated(): void;
    _checkTimeout: any;
    setupBlockly(): void;
    isValid(): Promise<boolean>;
    getZome(): Promise<SimulatedZome>;
    render(): import("lit-html").TemplateResult<1>;
}
