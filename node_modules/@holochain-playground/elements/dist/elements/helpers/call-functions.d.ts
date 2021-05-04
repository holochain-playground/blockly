import { Dictionary } from '@holochain-open-dev/core-types';
import { LitElement, PropertyValues, TemplateResult } from 'lit-element';
import { Button } from 'scoped-material-components/mwc-button';
import { Drawer } from 'scoped-material-components/mwc-drawer';
import { List } from 'scoped-material-components/mwc-list';
import { ListItem } from 'scoped-material-components/mwc-list-item';
import { Select } from 'scoped-material-components/mwc-select';
import { TextField } from 'scoped-material-components/mwc-textfield';
export declare type CallableFnArgument = {
    name: string;
    required?: boolean;
} & ({
    field: 'textfield';
    type: string;
} | {
    field: 'custom';
    render: (value: any, setArgValue: (value: any) => void) => TemplateResult;
});
export interface CallableFn {
    name: string;
    args: CallableFnArgument[];
    call: (args: Dictionary<any>) => void;
}
declare const CallFns_base: typeof LitElement;
export declare class CallFns extends CallFns_base {
    callableFns: CallableFn[];
    selectedFnName: string | undefined;
    get activeFn(): CallableFn;
    _arguments: Dictionary<Dictionary<any>>;
    update(changedValues: PropertyValues): void;
    setArgument(fnName: string, argName: string, value: any): void;
    renderField(callableFn: CallableFn, arg: CallableFnArgument): TemplateResult<1>;
    isExecuteDisabled(callableFunction: CallableFn): boolean;
    callFunction(callableFunction: CallableFn): void;
    renderCallableFunction(callableFunction: CallableFn): TemplateResult<1>;
    render(): TemplateResult<1>;
    static styles: import("lit").CSSResultGroup[];
    static elementDefinitions: {
        'mwc-drawer': typeof Drawer;
        'mwc-list': typeof List;
        'mwc-list-item': typeof ListItem;
        'mwc-button': typeof Button;
        'mwc-textfield': typeof TextField;
        'mwc-select': typeof Select;
    };
}
export {};
