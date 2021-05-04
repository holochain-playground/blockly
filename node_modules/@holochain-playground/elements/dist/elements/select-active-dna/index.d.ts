import { PlaygroundElement } from '../../base/playground-element';
import { Select } from 'scoped-material-components/mwc-select';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { Card } from 'scoped-material-components/mwc-card';
export declare class SelectActiveDna extends PlaygroundElement {
    selectDNA(dna: string): void;
    render(): import("lit-html").TemplateResult<1>;
    static get styles(): import("lit").CSSResultGroup[];
    static elementDefinitions: {
        'mwc-list-item': typeof ListItem;
        'mwc-select': typeof Select;
        'mwc-card': typeof Card;
    };
}
