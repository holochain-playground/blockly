import { JsonViewer } from '@power-elements/json-viewer';
import { PlaygroundElement } from '../base/playground-element';
export declare class DhtShard extends PlaygroundElement {
    cell: {
        dna: string;
        agentId: string;
    };
    static style(): import("lit").CSSResultGroup;
    get activeCell(): import("@holochain-playground/core").Cell;
    render(): import("lit-html").TemplateResult<1>;
    static elementDefinitions: {
        'json-viewer': typeof JsonViewer;
    };
}
