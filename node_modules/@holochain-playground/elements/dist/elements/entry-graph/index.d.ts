import { Checkbox } from 'scoped-material-components/mwc-checkbox';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { Formfield } from 'scoped-material-components/mwc-formfield';
import { Card } from 'scoped-material-components/mwc-card';
import { HelpButton } from '../helpers/help-button';
import { Menu } from 'scoped-material-components/mwc-menu';
import { Button } from 'scoped-material-components/mwc-button';
import { Icon } from 'scoped-material-components/mwc-icon';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { PlaygroundElement } from '../../base/playground-element';
import { CellObserver } from '../../base/cell-observer';
import { CellsController } from '../../base/cells-controller';
import { CopyableHash } from '../helpers/copyable-hash';
/**
 * @element entry-graph
 */
export declare class EntryGraph extends PlaygroundElement implements CellObserver {
    hideFilter: boolean;
    showEntryContents: boolean;
    showHeaders: boolean;
    showOnlyActiveAgentsShard: boolean;
    excludedEntryTypes: string[];
    private entryGraph;
    private lastEntriesIds;
    private cy;
    private layout;
    private ready;
    private _entryTypes;
    private _visibleEntriesButton;
    private _visibleEntriesMenu;
    _cellsController: CellsController;
    observedCells(): import("@holochain-playground/core").Cell[];
    firstUpdated(): void;
    updated(changedValues: any): void;
    updatedGraph(): any;
    static get styles(): import("lit").CSSResultGroup[];
    renderHelp(): import("lit-html").TemplateResult<1>;
    renderFilter(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
    static elementDefinitions: {
        'mwc-checkbox': typeof Checkbox;
        'mwc-formfield': typeof Formfield;
        'mwc-icon-button': typeof IconButton;
        'copyable-hash': typeof CopyableHash;
        'mwc-card': typeof Card;
        'mwc-menu': typeof Menu;
        'mwc-icon': typeof Icon;
        'mwc-list-item': typeof ListItem;
        'mwc-button': typeof Button;
        'holochain-playground-help-button': typeof HelpButton;
    };
}
