import { PropertyValues } from 'lit';
import { Cell } from '@holochain-playground/core';
import { HelpButton } from '../helpers/help-button';
import { PlaygroundElement } from '../../base/playground-element';
import { Card } from 'scoped-material-components/mwc-card';
import { CellObserver } from '../../base/cell-observer';
import { CellsController } from '../../base/cells-controller';
import { CopyableHash } from '../helpers/copyable-hash';
/**
 * @element source-chain
 */
export declare class SourceChain extends PlaygroundElement implements CellObserver {
    private graph;
    private cy;
    private nodes;
    _cellsController: CellsController;
    get activeCell(): Cell | undefined;
    observedCells(): Cell[];
    firstUpdated(): void;
    setupGraph(): void;
    updated(changedValues: PropertyValues): void;
    renderHelp(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
    static get styles(): import("lit").CSSResultGroup[];
    static elementDefinitions: {
        'mwc-card': typeof Card;
        'copyable-hash': typeof CopyableHash;
        'help-button': typeof HelpButton;
    };
}
