import { PlaygroundElement } from '../context/playground-element';
import { DhtShard } from './dht-shard';
import { EntryContents } from './entry-contents';
import { Card } from 'scoped-material-components/mwc-card';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { Dialog } from 'scoped-material-components/mwc-dialog';
import { Tab } from 'scoped-material-components/mwc-tab';
import { TabBar } from 'scoped-material-components/mwc-tab-bar';
export declare class ConductorDetail extends PlaygroundElement {
    selectedTabIndex: number;
    private conductorHelp;
    firstUpdated(): void;
    static get styles(): import("lit-element").CSSResult[];
    renderAgentHelp(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'holochain-playground-dht-shard': typeof DhtShard;
        'holochain-playground-entry-detail': typeof EntryContents;
        'mwc-tab': typeof Tab;
        'mwc-tab-bar': typeof TabBar;
        'mwc-card': typeof Card;
        'mwc-icon-button': typeof IconButton;
        'mwc-dialog': typeof Dialog;
    };
}
