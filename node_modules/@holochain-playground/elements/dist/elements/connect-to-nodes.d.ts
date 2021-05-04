import { TextField } from 'scoped-material-components/mwc-textfield';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { Button } from 'scoped-material-components/mwc-button';
import { Dialog } from 'scoped-material-components/mwc-dialog';
import { PlaygroundElement } from '../base/playground-element';
export declare class ConnectToNodes extends PlaygroundElement {
    private open;
    private urlsState;
    static get styles(): import("lit").CSSResultGroup;
    getUrlFields(): TextField[];
    setConnectionValidity(element: any): void;
    updateFields(): void;
    renderDialog(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
    static elementDefinitions: {
        'mwc-button': typeof Button;
        'mwc-dialog': typeof Dialog;
        'mwc-textfield': typeof TextField;
        'mwc-icon-button': typeof IconButton;
    };
}
