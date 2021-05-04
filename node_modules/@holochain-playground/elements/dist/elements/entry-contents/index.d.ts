import { JsonViewer } from '@power-elements/json-viewer';
import { Card } from 'scoped-material-components/mwc-card';
import { CopyableHash } from '../helpers/copyable-hash';
import { PlaygroundElement } from '../../base/playground-element';
/**
 * @element entry-contents
 */
export declare class EntryContents extends PlaygroundElement {
    static get styles(): import("lit").CSSResultGroup[];
    get activeHashedContent(): any;
    render(): import("lit-html").TemplateResult<1>;
    static elementDefinitions: {
        'json-viewer': typeof JsonViewer;
        'mwc-card': typeof Card;
        'copyable-hash': typeof CopyableHash;
    };
}
