import { LitElement } from 'lit';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
declare const ExpandableLine_base: typeof LitElement;
export declare class ExpandableLine extends ExpandableLine_base {
    _expanded: boolean;
    render(): import("lit-html").TemplateResult<1>;
    static get styles(): import("lit").CSSResultGroup;
    static elementDefinitions: {
        'mwc-icon-button': typeof IconButton;
    };
}
export {};
