import { Dictionary } from '@holochain-open-dev/core-types';
import { SimulatedZome, Cell } from '@holochain-playground/core';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { Icon } from 'scoped-material-components/mwc-icon';
import { Tab } from 'scoped-material-components/mwc-tab';
import { TabBar } from 'scoped-material-components/mwc-tab-bar';
import { Card } from 'scoped-material-components/mwc-card';
import { CopyableHash } from '../helpers/copyable-hash';
import { PlaygroundElement } from '../../base/playground-element';
import { CellsController } from '../../base/cells-controller';
import { CellObserver } from '../../base/cell-observer';
import { CallFns } from '../helpers/call-functions';
/**
 * @element call-zome-fns
 */
export declare class CallZomeFns extends PlaygroundElement implements CellObserver {
    hideZomeSelector: boolean;
    hideAgentPubKey: boolean;
    selectedZomeFnName: string | undefined;
    private _selectedZomeIndex;
    _arguments: Dictionary<Dictionary<Dictionary<Dictionary<Dictionary<any>>>>>;
    _cellsController: CellsController;
    get activeCell(): Cell;
    get activeZome(): SimulatedZome;
    observedCells(): Cell[];
    callZomeFunction(fnName: string, args: Dictionary<any>): Promise<void>;
    renderActiveZomeFns(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
    static get styles(): import("lit").CSSResultGroup[];
    static elementDefinitions: {
        'mwc-circular-progress': typeof CircularProgress;
        'mwc-icon': typeof Icon;
        'mwc-tab': typeof Tab;
        'mwc-tab-bar': typeof TabBar;
        'mwc-card': typeof Card;
        'copyable-hash': typeof CopyableHash;
        'call-functions': typeof CallFns;
    };
}
