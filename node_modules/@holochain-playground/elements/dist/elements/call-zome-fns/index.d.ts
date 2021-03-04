import { CellId, Dictionary } from '@holochain-open-dev/core-types';
import { SimulatedZome, SimulatedZomeFunction, Cell } from '@holochain-playground/core';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { PlaygroundElement } from '../../context/playground-element';
import { Button } from 'scoped-material-components/mwc-button';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { Icon } from 'scoped-material-components/mwc-icon';
import { Tab } from 'scoped-material-components/mwc-tab';
import { TabBar } from 'scoped-material-components/mwc-tab-bar';
import { Card } from 'scoped-material-components/mwc-card';
import { JsonViewer } from '@power-elements/json-viewer';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { List } from 'scoped-material-components/mwc-list';
import { Drawer } from 'scoped-material-components/mwc-drawer';
import { ExpandableLine } from '../helpers/expandable-line';
export interface ZomeFunctionResult {
    cellId: CellId;
    zome: SimulatedZome;
    fnName: string;
    result: undefined | {
        success: boolean;
        payload: any;
    };
}
/**
 * @element call-zome-fns
 */
export declare class CallZomeFns extends PlaygroundElement {
    hideResults: boolean;
    hideZomeSelector: boolean;
    hideAgentPubKey: boolean;
    selectedZomeFnName: string | undefined;
    _selectedZomeIndex: number;
    _results: Dictionary<Dictionary<Dictionary<ZomeFunctionResult>>>;
    _arguments: Dictionary<Dictionary<Dictionary<Dictionary<Dictionary<any>>>>>;
    get activeCell(): Cell;
    get activeZome(): SimulatedZome;
    get activeZomeFn(): {
        name: string;
        fn: SimulatedZomeFunction;
    };
    observedCells(): Cell[];
    setResultValue(timestamp: number, value: ZomeFunctionResult): void;
    getResultValue(timestamp: number): ZomeFunctionResult | undefined;
    getActiveResults(): Dictionary<ZomeFunctionResult>;
    setFunctionArgument(fnName: string, argName: string, argValue: any): void;
    getFunctionArguments(fnName: string): Dictionary<any>;
    getFunctionArgument(fnName: string, argName: string): any;
    callZomeFunction(fnName: string): Promise<void>;
    renderCallableFunction(fnName: string, zomeFunction: SimulatedZomeFunction): import("lit-element").TemplateResult;
    renderActiveZomeFns(): import("lit-element").TemplateResult;
    renderResult(result: ZomeFunctionResult): import("lit-element").TemplateResult;
    renderResults(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    static get styles(): import("lit-element").CSSResult[];
    static get scopedElements(): {
        'mwc-button': typeof Button;
        'mwc-textfield': typeof TextField;
        'mwc-circular-progress': typeof CircularProgress;
        'mwc-icon': typeof Icon;
        'mwc-tab': typeof Tab;
        'mwc-list': typeof List;
        'mwc-drawer': typeof Drawer;
        'mwc-list-item': typeof ListItem;
        'mwc-tab-bar': typeof TabBar;
        'mwc-card': typeof Card;
        'json-viewer': typeof JsonViewer;
        'expandable-line': typeof ExpandableLine;
    };
}
