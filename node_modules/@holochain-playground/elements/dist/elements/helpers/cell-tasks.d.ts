import { Cell, WorkflowType } from '@holochain-playground/core';
import { Subject } from 'rxjs';
import { Card } from 'scoped-material-components/mwc-card';
import { Icon } from 'scoped-material-components/mwc-icon';
import { LinearProgress } from 'scoped-material-components/mwc-linear-progress';
import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { PlaygroundElement } from '../../context/playground-element';
export declare class CellTasks extends PlaygroundElement {
    /** Public properties */
    cell: Cell;
    workflowsToDisplay: WorkflowType[];
    workflowDelay: number;
    hideErrors: boolean;
    stepByStep: boolean;
    _onPause: boolean;
    _resumeObservable: Subject<any>;
    /** Private properties */
    private _callZomeTasks;
    private _runningTasks;
    private _errors;
    observedCells(): Cell[];
    onNewObservedCell(cell: Cell): import("@holochain-playground/core").MiddlewareSubscription[];
    sortTasks(tasks: Array<[string, number]>): [string, number][];
    showTasks(): boolean;
    render(): import("lit-element").TemplateResult;
    static get styles(): import("lit-element").CSSResult[];
    static get scopedElements(): {
        'mwc-card': typeof Card;
        'mwc-list': typeof List;
        'mwc-icon': typeof Icon;
        'mwc-list-item': typeof ListItem;
        'mwc-linear-progress': typeof LinearProgress;
    };
}
