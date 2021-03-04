import { MenuSurface } from 'scoped-material-components/mwc-menu-surface';
import { Button } from 'scoped-material-components/mwc-button';
import { Cell, NetworkRequestType, WorkflowType } from '@holochain-playground/core';
import { Card } from 'scoped-material-components/mwc-card';
import { Slider } from 'scoped-material-components/mwc-slider';
import { Switch } from 'scoped-material-components/mwc-switch';
import { CellTasks } from '../helpers/cell-tasks';
import { HelpButton } from '../helpers/help-button';
import { PlaygroundElement } from '../../context/playground-element';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { Formfield } from 'scoped-material-components/mwc-formfield';
import { Icon } from 'scoped-material-components/mwc-icon';
import { Menu } from 'scoped-material-components/mwc-menu';
import { ListItem } from 'scoped-material-components/mwc-list-item';
/**
 * @element dht-cells
 */
export declare class DhtCells extends PlaygroundElement {
    animationDelay: number;
    workflowsToDisplay: WorkflowType[];
    networkRequestsToDisplay: NetworkRequestType[];
    hideTimeController: boolean;
    stepByStep: boolean;
    private _graph;
    private _activeWorkflowsButton;
    private _activeWorkflowsMenu;
    private _networkRequestsButton;
    private _networkRequestsMenu;
    private _cy;
    private _layout;
    private _resumeObservable;
    private _onPause;
    firstUpdated(): Promise<void>;
    highlightNodesWithEntry(): void;
    observedCells(): Cell[];
    onNewObservedCell(cell: Cell): import("@holochain-playground/core").MiddlewareSubscription[];
    onCellsChanged(): void;
    setupGraphNodes(): void;
    _neighborEdges: any[];
    updated(changedValues: any): void;
    renderTimeController(): import("lit-element").TemplateResult;
    renderHelp(): import("lit-element").TemplateResult;
    renderTasksTooltips(): import("lit-element").TemplateResult;
    renderCopyButton(): import("lit-element").TemplateResult;
    renderBottomToolbar(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    static get styles(): import("lit-element").CSSResult[];
    static get scopedElements(): {
        'mwc-card': typeof Card;
        'mwc-menu-surface': typeof MenuSurface;
        'mwc-button': typeof Button;
        'mwc-icon': typeof Icon;
        'mwc-menu': typeof Menu;
        'mwc-list-item': typeof ListItem;
        'mwc-slider': typeof Slider;
        'mwc-switch': typeof Switch;
        'mwc-formfield': typeof Formfield;
        'mwc-icon-button': typeof IconButton;
        'holochain-playground-help-button': typeof HelpButton;
        'holochain-playground-cell-tasks': typeof CellTasks;
    };
}
