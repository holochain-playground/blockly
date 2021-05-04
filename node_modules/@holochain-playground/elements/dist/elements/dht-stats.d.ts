import { Dialog } from 'scoped-material-components/mwc-dialog';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { LinearProgress } from 'scoped-material-components/mwc-linear-progress';
import { PlaygroundElement } from '../base/playground-element';
export declare class DhtStats extends PlaygroundElement {
    private statsHelp;
    private nNodes;
    private rFactor;
    private timeout;
    private processing;
    static get styles(): import("lit").CSSResultGroup;
    get activeCell(): import("@holochain-playground/core").Cell;
    get allCells(): import("@holochain-playground/core").Cell[];
    renderStatsHelp(): import("lit-html").TemplateResult<1>;
    republish(): Promise<void>;
    updateDHTStats(): void;
    render(): import("lit-html").TemplateResult<1>;
    static elementDefinitions: {
        'mwc-linear-progress': typeof LinearProgress;
        'mwc-textfield': typeof TextField;
        'mwc-icon-button': typeof IconButton;
        'mwc-dialog': typeof Dialog;
    };
}
