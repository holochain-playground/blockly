import { html, css, LitElement, property, query } from 'lit-element';
import { PlaygroundMixin } from '@holochain-playground/container';
import 'blockly/javascript';
import { sharedStyles } from '../shared-styles';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { HolochainPlaygroundEditZome } from './holochain-playground-edit-zome';
import { SimulatedDna } from '@holochain-playground/core';
import { serializeHash } from '@holochain-open-dev/common';
import { TabBar } from 'scoped-material-components/mwc-tab-bar';
import { Tab } from 'scoped-material-components/mwc-tab';
import { Button } from 'scoped-material-components/mwc-button';

export class HolochainPlaygroundEditDna extends ScopedElementsMixin(
  PlaygroundMixin(LitElement)
) {
  @property({ type: Number })
  _selectedZomeIndex: number = 0;

  _editingDna: SimulatedDna | undefined = undefined;

  @property({ type: Boolean })
  _editing: boolean = false;
  @property({ type: Boolean })
  _invalid: boolean = false;

  getActiveDna(): SimulatedDna | undefined {
    const activeDnaStr = serializeHash(this.activeDna);

    for (const conductor of this.conductors) {
      for (const cell of conductor.cells) {
        if (serializeHash(cell.cell.dnaHash) === activeDnaStr) {
          return cell.cell.getSimulatedDna();
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

  async onZomeEdited() {
    this.editDna();
    
    const editZome: HolochainPlaygroundEditZome = this.shadowRoot?.getElementById(
      'edit-zome'
    ) as HolochainPlaygroundEditZome;
    
    this._invalid = !(await editZome.isValid());
  }

  editDna() {
    if (!this._editing) {
      console.log('editing')
      this._editingDna = this.getActiveDna() || {
        properties: null,
        uuid: '',
        zomes: [
          { name: 'sample', entry_defs: [], zome_functions: {} },
        ],
      };
      this._editing = true;
    }
  }

  isCompileDisabled() {
    return !this._editing || this._invalid;
  }

  async showZome(zomeIndex: number) {
    if (this._editing && this._editingDna) {
      if (this._invalid) {
        this.showMessage('Zome code is invalid');
        return;
      }

      const editZome: HolochainPlaygroundEditZome = this.shadowRoot?.getElementById(
        'edit-zome'
      ) as HolochainPlaygroundEditZome;
      this._editingDna.zomes[
        this._selectedZomeIndex
      ] = await editZome.getZome();
    }

    this._selectedZomeIndex = zomeIndex;
  }

  async compileDna() {
    if (this._editingDna) {
      const hash = await this.conductors[0].registerDna(this._editingDna);

      this.updatePlayground({ activeDna: hash });

      this._editingDna = undefined;
      this._editing = false;
    }
  }

  render() {
    const dna = this.getActiveDna();
    if (!dna)
      return html`<div class="row center-content">
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
                zome =>
                  html`
                    <mwc-tab label=${zome.name} style="width: 124px;">
                    </mwc-tab>
                  `
              )}
            </mwc-tab-bar>
          </div>
          <mwc-button
            label="COMPILE"
            raised
            .disabled=${this.isCompileDisabled()}
            @click=${() => this.compileDna()}
          ></mwc-button>
        </div>

        <holochain-playground-edit-zome
          id="edit-zome"
          .zome=${dna.zomes[this._selectedZomeIndex]}
          style="flex: 1;"
          @zome-edited=${() => this.onZomeEdited()}
        ></holochain-playground-edit-zome>
      </div>
    `;
  }

  static get scopedElements() {
    return {
      'holochain-playground-edit-zome': HolochainPlaygroundEditZome,
      'mwc-tab-bar': TabBar,
      'mwc-tab': Tab,
      'mwc-button': Button,
    };
  }
}
