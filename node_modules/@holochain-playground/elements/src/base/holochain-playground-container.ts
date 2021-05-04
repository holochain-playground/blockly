import { Snackbar } from 'scoped-material-components/mwc-snackbar';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { ProviderMixin } from 'lit-element-context';

import { LitElement, html, css, PropertyValues } from 'lit';
import { property, query } from 'lit/decorators.js';
import {
  Conductor,
  createConductors,
  demoHapp,
  SimulatedHappBundle,
} from '@holochain-playground/core';
import { AgentPubKey, Dictionary, Hash } from '@holochain-open-dev/core-types';
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { selectAllCells, selectCells, selectHoldingCells } from './selectors';

export class HolochainPlaygroundContainer extends ScopedRegistryHost(
  ProviderMixin(LitElement) as new () => LitElement
) {
  @property({ type: Number })
  numberOfSimulatedConductors: number = 10;

  @property({ type: Object })
  simulatedHapp: SimulatedHappBundle = demoHapp();

  @query('#snackbar')
  private snackbar: Snackbar;

  @property({ type: String })
  private message: string | undefined;

  /** Context variables */
  @property({ type: String })
  activeDna: Hash | undefined;
  @property({ type: String })
  activeAgentPubKey: AgentPubKey | undefined;
  @property({ type: String })
  activeHash: Hash | undefined;
  @property({ type: Array })
  conductors: Conductor[] = [];

  @property({ type: Array })
  conductorsUrls: string[] | undefined;

  static get provide() {
    return [
      'activeDna',
      'activeAgentPubKey',
      'activeHash',
      'conductors',
      'conductorsUrls',
    ];
  }

  static get styles() {
    return css`
      :host {
        display: contents;
      }
    `;
  }

  update(changedValues: PropertyValues) {
    super.update(changedValues);

    if (changedValues.has('activeDna') && this.activeDna && this.activeHash) {
      this.activeHash = undefined;
    }
  }

  async firstUpdated() {
    if (!this.conductorsUrls) {
      this.conductors = await createConductors(
        this.numberOfSimulatedConductors,
        [],
        this.simulatedHapp
      );

      this.activeDna = this.conductors[0].getAllCells()[0].dnaHash;

      this.dispatchEvent(
        new CustomEvent('ready', {
          bubbles: true,
          composed: true,
          detail: {
            activeDna: this.activeDna,
            activeAgentPubKey: this.activeAgentPubKey,
            activeHash: this.activeHash,
            conductors: this.conductors,
            conductorsUrls: this.conductorsUrls,
          },
        })
      );
    }

    this.addEventListener('update-context', (e: CustomEvent) => {
      const keys = Object.keys(e.detail);
      for (const key of keys) {
        this[key] = e.detail[key];
      }
    });

    this.addEventListener('show-message', (e: CustomEvent) => {
      this.showMessage(e.detail.message);
    });
    /* 
    this.blackboard.select('conductorsUrls').subscribe(async (urls) => {
      if (urls !== undefined) {
        try {
          // await connectToConductors(this.blackboard, urls);
        } catch (e) {
          console.error(e);
          this.showError('Error when connecting with the nodes');
        }
      }
    }); */
  }

  showMessage(message: string) {
    this.message = message;
    this.snackbar.show();
  }

  renderSnackbar() {
    return html`
      <mwc-snackbar id="snackbar" labelText=${this.message}>
        <mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>
      </mwc-snackbar>
    `;
  }

  render() {
    return html`
      ${this.renderSnackbar()}
      ${this.conductors
        ? html` <slot></slot> `
        : html` <mwc-circular-progress></mwc-circular-progress>`}
    `;
  }

  static elementDefinitions = {
    'mwc-circular-progress': CircularProgress,
    'mwc-snackbar': Snackbar,
    'mwc-icon-button': IconButton,
  };
}
