import { LitElement } from 'lit-element';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
declare const ExpandableLine_base: typeof LitElement & import("@open-wc/dedupe-mixin").Constructor<import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost> & typeof import("@open-wc/scoped-elements/types/src/types").ScopedElementsHost;
export declare class ExpandableLine extends ExpandableLine_base {
    _expanded: boolean;
    render(): import("lit-element").TemplateResult;
    static get styles(): import("lit-element").CSSResult;
    static get scopedElements(): {
        'mwc-icon-button': typeof IconButton;
    };
}
export {};
