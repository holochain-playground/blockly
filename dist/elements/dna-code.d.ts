import { PlaygroundElement } from '@holochain-playground/elements';
import 'blockly/javascript';
import { SimulatedDna, SimulatedZome } from '@holochain-playground/core';
import { TabBar } from 'scoped-material-components/mwc-tab-bar';
import { Tab } from 'scoped-material-components/mwc-tab';
import { Button } from 'scoped-material-components/mwc-button';
import { Card } from 'scoped-material-components/mwc-card';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { EditZome } from './edit-zome';
export interface EditingZome {
    valid: boolean;
    zome: SimulatedZome;
}
export declare class DnaCode extends PlaygroundElement {
    _selectedZomeIndex: number;
    _editingZomes: Array<EditingZome> | undefined;
    _invalid: boolean;
    _newZomeCount: number;
    getActiveDna(): SimulatedDna | undefined;
    static styles: import("lit-element").CSSResult[];
    get _editing(): boolean;
    get _editZomeEl(): EditZome;
    isDnaValid(): boolean | undefined;
    onZomeEdited(e: CustomEvent): Promise<void>;
    newEditingZome(): {
        valid: boolean;
        zome: {
            name: string;
            entry_defs: never[];
            zome_functions: {};
            blocklyCode: string;
        };
    };
    editDna(): void;
    isCompileDisabled(): boolean;
    showZome(zomeIndex: number): Promise<void>;
    addZome(): void;
    getEditingDna(): SimulatedDna | undefined;
    removeEditingZome(index: number): void;
    compileDna(): Promise<void>;
    cancelEdit(): Promise<void>;
    renderContent(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'edit-zome': typeof EditZome;
        'mwc-tab-bar': typeof TabBar;
        'mwc-tab': typeof Tab;
        'mwc-button': typeof Button;
        'mwc-icon-button': typeof IconButton;
        'mwc-card': typeof Card;
    };
}
