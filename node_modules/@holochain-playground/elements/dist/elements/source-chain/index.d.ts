import { PropertyValues } from 'lit-element';
import { Cell } from '@holochain-playground/core';
import { HelpButton } from '../helpers/help-button';
import { PlaygroundElement } from '../../context/playground-element';
import { Card } from 'scoped-material-components/mwc-card';
/**
 * @element source-chain
 */
export declare class SourceChain extends PlaygroundElement {
    static get styles(): import("lit-element").CSSResult[];
    private cy;
    private nodes;
    get activeCell(): Cell | undefined;
    private graph;
    firstUpdated(): void;
    observedCells(): Cell[];
    setupGraph(): void;
    updated(changedValues: PropertyValues): void;
    renderHelp(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'mwc-card': typeof Card;
        'holochain-playground-help-button': typeof HelpButton;
    };
}
