import { PlaygroundElement } from '../../context/playground-element';
import { Select } from 'scoped-material-components/mwc-select';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { Card } from 'scoped-material-components/mwc-card';
export declare class SelectActiveDna extends PlaygroundElement {
    selectDNA(dna: string): void;
    render(): import("lit-element").TemplateResult;
    static get styles(): import("lit-element").CSSResult[];
    static get scopedElements(): {
        'mwc-list-item': typeof ListItem;
        'mwc-select': typeof Select;
        'mwc-card': typeof Card;
    };
}
