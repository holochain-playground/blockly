import { LitElement } from 'lit';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { Snackbar } from 'scoped-material-components/mwc-snackbar';
declare const CopyableHash_base: typeof LitElement;
export declare class CopyableHash extends CopyableHash_base {
    hash: string;
    sliceLength: number;
    _copyNotification: Snackbar;
    copyHash(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
    static get styles(): import("lit").CSSResultGroup;
    static elementDefinitions: {
        'mwc-icon-button': typeof IconButton;
        'mwc-snackbar': typeof Snackbar;
    };
}
export {};
