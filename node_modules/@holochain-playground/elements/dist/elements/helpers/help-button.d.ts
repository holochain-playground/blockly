import { Button } from 'scoped-material-components/mwc-button';
import { Dialog } from 'scoped-material-components/mwc-dialog';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { PlaygroundElement } from '../../context/playground-element';
export declare class HelpButton extends PlaygroundElement {
    heading: string;
    _helpDialog: Dialog;
    renderHelpDialog(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'mwc-icon-button': typeof IconButton;
        'mwc-button': typeof Button;
        'mwc-dialog': typeof Dialog;
    };
}
