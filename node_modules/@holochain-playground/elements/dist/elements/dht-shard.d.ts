import { JsonViewer } from '@power-elements/json-viewer';
import { PlaygroundElement } from '../context/playground-element';
export declare class DhtShard extends PlaygroundElement {
    cell: {
        dna: string;
        agentId: string;
    };
    static style(): import("lit-element").CSSResult;
    get activeCell(): import("@holochain-playground/core").Cell;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'json-viewer': typeof JsonViewer;
    };
}
