import { PlaygroundElement } from '../../base/playground-element';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { Card } from 'scoped-material-components/mwc-card';
import { List } from 'scoped-material-components/mwc-list';
import { Button } from 'scoped-material-components/mwc-button';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
export interface Step {
    title: (context: PlaygroundElement) => string;
    run: (context: PlaygroundElement) => Promise<void>;
}
export declare class RunSteps extends PlaygroundElement {
    steps: Array<Step>;
    _runningStepIndex: number | undefined;
    _running: boolean;
    runSteps(): Promise<void>;
    awaitNetworkConsistency(): Promise<unknown>;
    renderContent(): any;
    render(): any;
    static get styles(): import("lit").CSSResultGroup[];
    static elementDefinitions: {
        'mwc-circular-progress': typeof CircularProgress;
        'mwc-list-item': typeof ListItem;
        'mwc-list': typeof List;
        'mwc-button': typeof Button;
        'mwc-card': typeof Card;
    };
}
