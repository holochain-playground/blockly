import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import {
  PlaygroundElement,
  CopyableHash,
} from '@holochain-playground/elements';
import 'blockly/javascript';
import { SimulatedDna, SimulatedZome } from '@holochain-playground/core';
import { TabBar } from 'scoped-material-components/mwc-tab-bar';
import { Tab } from 'scoped-material-components/mwc-tab';
import { Button } from 'scoped-material-components/mwc-button';
import { Card } from 'scoped-material-components/mwc-card';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { EditZome } from './edit-zome';
import { sharedStyles } from '../shared-styles';

export interface EditingZome {
  valid: boolean;
  zome: SimulatedZome;
}

export class DnaCode extends PlaygroundElement {
  @property({ type: Number })
  _selectedZomeIndex: number = 0;

  @property({ type: Array })
  _editingZomes: Array<EditingZome> | undefined = undefined;

  @property({ type: Boolean })
  _invalid: boolean = false;

  _newZomeCount = 0;

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

  newEditingZome() {
    this._newZomeCount++;
    return {
      valid: true,
      zome: {
        name: `sample${this._newZomeCount}`,
        entry_defs: [],
        zome_functions: {},
        validation_functions: {},
        blocklyCode:
          '<xml xmlns="https://developers.google.com/blockly/xml"><block type="entry_defs" id="a{AP^:MzvuAQf6=jI~[2" x="123" y="58"><mutation xmlns="http://www.w3.org/1999/xhtml" items="1"></mutation><value name="ADD0"><block type="entry_def" id="$SQ6P6OQ#1/hfOd4TA=@"><field name="ENTRY_DEF_ID">sample_entry</field><field name="PUBLIC">TRUE</field></block></value></block><block type="procedures_defnoreturn" id="D}syd|^_`$9k%uwyIdSn" x="164" y="126"><field name="NAME">sample function</field><comment pinned="false" h="80" w="160">Describe this function...</comment><statement name="STACK"><block type="create_entry" id="YbSju3KGV0}rR_PP}]b2"><value name="ENTRY"><block type="new sample_entry" id="tQuMSJo,+,v1tN,aAx9z"><field name="CONTENT">Hello world!</field></block></value></block></statement></block></xml>',
      },
    };
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
        this._editingZomes = [this.newEditingZome()];
      }

      this._editZomeEl.zome = this._editingZomes[this._selectedZomeIndex].zome;
      this._newZomeCount = 0;
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

  addZome() {
    if (this._editingZomes) {
      this._editingZomes = [...this._editingZomes, this.newEditingZome()];
    }
  }

  getEditingDna(): SimulatedDna | undefined {
    if (!this._editingZomes) return undefined;
    return {
      properties: {},
      uid: '',
      zomes: this._editingZomes.map(e => e.zome),
    };
  }

  removeEditingZome(index: number) {
    if (this._editingZomes) {
      this._editingZomes.splice(index, 1);
      if (index === this._selectedZomeIndex) {
        this._selectedZomeIndex = 0;
      }

      this.requestUpdate();
    }
  }

  async compileDna() {
    if (this._editingZomes) {
      this.dispatchEvent(
        new CustomEvent('dna-compiled', {
          detail: {
            dna: this.getEditingDna(),
          },
          bubbles: true,
          composed: true,
        })
      );

      this._editingZomes = undefined;
      setTimeout(() => {
        this._editZomeEl.zome = this.getActiveDna()?.zomes[
          this._selectedZomeIndex
        ] as SimulatedZome;
      });
    }
  }

  async cancelEdit() {
    this._editingZomes = undefined;
  }

  renderContent() {
    const dna = this.getEditingDna() || this.getActiveDna();
    if (!dna)
      return html`<div class="row center-content" style="flex: 1;">
        <span>There is no active Dna</span>
      </div>`;

    return html`
      <div class="column" style="flex: 1;">
        <div
          class="row"
          style="align-items: center; margin: 0 16px; margin-left: 0;"
        >
          <mwc-tab-bar
            @MDCTabBar:activated=${(e: CustomEvent) =>
              this.showZome(e.detail.index)}
          >
            ${dna.zomes.map(
              (zome, index) => html`
                <mwc-tab label=${zome.name}> </mwc-tab>

                ${this._editing
                  ? html`<mwc-icon-button
                        icon="delete"
                        style="opacity: 0.5; --mdc-icon-button-size: 36px; align-self: center; margin-right: 16px;"
                        @click=${() => this.removeEditingZome(index)}
                      ></mwc-icon-button>
                      <span
                        class="vertical-divider"
                        style="align-self: center;"
                      ></span> `
                  : html``}
              `
            )}
          </mwc-tab-bar>
          ${this._editing
            ? html`
                <mwc-button
                  label="Add zome"
                  icon="add"
                  @click=${() => this.addZome()}
                ></mwc-button>
              `
            : html``}
          <span style="flex: 1;"></span>
          ${this._editing
            ? html`
                <mwc-button
                  label="CANCEL"
                  style="margin-right: 16px;"
                  @click=${() => this.cancelEdit()}
                ></mwc-button>
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

  render() {
    return html`
      <mwc-card style="width: auto; flex: 1">
        <div class="column" style="flex: 1;">
          <span style="font-size: 20px; margin: 16px;" class="row"
            >Dna
            Code${this.activeDna
              ? html`
                  <span class="placeholder row">
                    , for Dna
                    <copyable-hash
                      .hash=${this.activeDna}
                      style="margin-left: 8px;"
                    ></copyable-hash>
                  </span>
                `
              : html``}</span
          >
          ${this.renderContent()}
        </div>
      </mwc-card>
    `;
  }

  static elementDefinitions = {
    'edit-zome': EditZome,
    'copyable-hash': CopyableHash,
    'mwc-tab-bar': TabBar,
    'mwc-tab': Tab,
    'mwc-button': Button,
    'mwc-icon-button': IconButton,
    'mwc-card': Card,
  };
}
