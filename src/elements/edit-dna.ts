import { html, css, property } from 'lit-element';
import { PlaygroundElement } from '@holochain-playground/elements';
import 'blockly/javascript';
import { SimulatedDna, SimulatedZome } from '@holochain-playground/core';
import { TabBar } from 'scoped-material-components/mwc-tab-bar';
import { Tab } from 'scoped-material-components/mwc-tab';
import { Button } from 'scoped-material-components/mwc-button';
import { EditZome } from './edit-zome';
import { sharedStyles } from '../shared-styles';

export interface EditingZome {
  valid: boolean;
  zome: SimulatedZome;
}

export class EditDna extends PlaygroundElement {
  @property({ type: Number })
  _selectedZomeIndex: number = 0;

  @property({ type: Array })
  _editingZomes: Array<EditingZome> | undefined = undefined;

  @property({ type: Boolean })
  _invalid: boolean = false;

  getActiveDna(): SimulatedDna | undefined {
    for (const conductor of this.conductors) {
      for (const cell of conductor.getAllCells()) {
        if (cell.dnaHash === this.activeDna) {
          return cell.getSimulatedDna();
        }
      }
    }

    return undefined;
  }

  static styles = [
    css`
      :host {
        display: flex;
        flex: 1;
      }
    `,
    sharedStyles,
  ];

  get _editing() {
    return this._editingZomes !== undefined;
  }

  get _editZomeEl(): EditZome {
    return this.shadowRoot?.getElementById('edit-zome') as EditZome;
  }

  isDnaValid() {
    return this._editingZomes && this._editingZomes.every(zome => zome.valid);
  }

  async onZomeEdited(e: CustomEvent) {
    this.editDna();

    const zomeValid = e.detail.valid;

    if (this._editingZomes) {
      this._editingZomes[this._selectedZomeIndex].valid = zomeValid;

      if (zomeValid) {
        this._editingZomes[this._selectedZomeIndex].zome = e.detail.zome;
      }
    }
    this.requestUpdate();
  }

  editDna() {
    if (!this._editing) {
      const activeDna = this.getActiveDna();

      if (activeDna) {
        this._editingZomes = activeDna.zomes.map(zome => ({
          valid: true,
          zome,
        }));
      } else {
        const newZome = {
          name: 'sample',
          entry_defs: [],
          zome_functions: {},
          blocklyCode: '',
        };
        this._editingZomes = [
          {
            valid: true,
            zome: newZome,
          },
        ];
      }

      this._editZomeEl.zome = this._editingZomes[this._selectedZomeIndex].zome;
    }
  }

  isCompileDisabled() {
    return !this._editing || !this.isDnaValid();
  }

  async showZome(zomeIndex: number) {
    if (this._editing) {
      if (this._invalid) {
        this.showMessage('Zome code is invalid');
        return;
      }
    }

    this._selectedZomeIndex = zomeIndex;
    if (this._editingZomes) {
      this._editZomeEl.zome = this._editingZomes[this._selectedZomeIndex].zome;
    } else {
      this._editZomeEl.zome = this.getActiveDna()?.zomes[
        this._selectedZomeIndex
      ] as SimulatedZome;
    }
  }

  async compileDna() {
    if (this._editingZomes) {
      const dna: SimulatedDna = {
        properties: null,
        uuid: '',
        zomes: this._editingZomes.map(e => e.zome),
      };
      const hash = await this.conductors[0].registerDna(dna);
      const cell = await this.conductors[0].installApp(hash, null, null, '');

      this.updatePlayground({
        activeDna: hash,
        activeAgentPubKey: cell.agentPubKey,
      });

      this._editingZomes = undefined;
      setTimeout(() => {
        this._editZomeEl.zome = this.getActiveDna()?.zomes[
          this._selectedZomeIndex
        ] as SimulatedZome;
        console.log(dna);
      });
    }
  }

  render() {
    const dna = this.getActiveDna();
    if (!dna)
      return html`<div class="row center-content" style="flex: 1;">
        <span>There is no selected Dna</span>
      </div>`;

    return html`
      <div class="column" style="flex: 1;">
        <div class="row" style="align-items: center; margin: 0 16px;">
          <div class="row" style="flex: 1;">
            <mwc-tab-bar
              @MDCTabBar:activated=${(e: CustomEvent) =>
                this.showZome(e.detail.index)}
            >
              ${dna.zomes.map(
                zome => html` <mwc-tab label=${zome.name}> </mwc-tab> `
              )}
            </mwc-tab-bar>
          </div>
          ${this._editing
            ? html`
                <mwc-button
                  label="COMPILE"
                  raised
                  .disabled=${this.isCompileDisabled()}
                  @click=${() => this.compileDna()}
                ></mwc-button>
              `
            : html`
                <mwc-button
                  label="EDIT"
                  raised
                  @click=${() => this.editDna()}
                ></mwc-button>
              `}
        </div>

        <edit-zome
          id="edit-zome"
          .editing=${this._editing}
          style="flex: 1;"
          @zome-edited=${(e: CustomEvent) => this.onZomeEdited(e)}
        ></edit-zome>
      </div>
    `;
  }

  static get scopedElements() {
    return {
      'edit-zome': EditZome,
      'mwc-tab-bar': TabBar,
      'mwc-tab': Tab,
      'mwc-button': Button,
    };
  }
}
