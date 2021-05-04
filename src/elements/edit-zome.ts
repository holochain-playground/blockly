import { html, css, PropertyValues } from 'lit';
import { property, query } from 'lit/decorators.js';

import { PlaygroundElement } from '@holochain-playground/elements';
import { SimulatedZome } from '@holochain-playground/core';
import Blockly, { Workspace } from 'blockly';
import 'blockly/javascript';
import { styleMap } from 'lit/directives/style-map.js';

import { sharedStyles } from '../shared-styles';
import { defineBlocks } from '../blocks/define-blocks';
import { toolbox } from '../toolbox';
import { buildZome } from '../execute/buildZome';
import { defineNewEntry } from '../blocks/entries';

const CHECK_DEBOUNCE = 500;

export class EditZome extends PlaygroundElement {
  @property({ type: Object })
  zome!: SimulatedZome;

  @property({ type: Boolean })
  editing!: boolean;

  @query('#blockly-area')
  blocklyArea!: HTMLElement;

  _workspace!: Workspace;

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex: 1;
        }
        .blocklyFlyoutButton > .blocklyText {
          fill: white;
        }
      `,
      sharedStyles,
    ];
  }

  updated(changedValues: PropertyValues) {
    super.updated(changedValues);

    if (
      (changedValues.has('zome') || changedValues.has('editing')) &&
      this.zome
    ) {
      setTimeout(() => this.setupBlockly());
    }
  }

  firstUpdated() {
    defineBlocks(Blockly);
  }

  _checkTimeout: any = undefined;

  setupBlockly() {
    if (this._workspace) this._workspace.dispose();

    if (this.zome) {
      this.zome.entry_defs.forEach(entryDef =>
        defineNewEntry(Blockly, entryDef.id)
      );
    }
    this._workspace = Blockly.inject(this.blocklyArea, {
      toolbox: this.editing ? toolbox : null,
      shadowRoot: this.shadowRoot,
    } as any);

    if (this.zome.blocklyCode) {
      const xml = Blockly.Xml.textToDom(this.zome.blocklyCode);
      Blockly.Xml.domToWorkspace(xml, this._workspace);
    }

    if (this.editing) {
      this._workspace.addChangeListener(async () => {
        if (this._checkTimeout) clearTimeout(this._checkTimeout);

        this._checkTimeout = setTimeout(async () => {
          if (this.editing) {
            try {
              const zome = await this.getZome();
              const category = (this._workspace as any).toolbox_
                .getToolboxItems()[0]
                .getChildToolboxItems()[0];

              const blocks = zome.entry_defs.map(entryDef =>
                defineNewEntry(Blockly, entryDef.id)
              );

              category.updateFlyoutContents({
                kind: 'category',
                name: 'Entries',
                contents: blocks,
              });

              this.dispatchEvent(
                new CustomEvent('zome-edited', {
                  detail: {
                    valid: true,
                    zome,
                  },
                })
              );
            } catch (e) {
              console.error(e);
              this.dispatchEvent(
                new CustomEvent('zome-edited', {
                  detail: {
                    valid: false,
                  },
                })
              );
            }
          }

          clearTimeout(this._checkTimeout);
        }, CHECK_DEBOUNCE);
      });
    }
  }

  async isValid() {
    try {
      await this.getZome();
      return true;
    } catch (e) {
      return false;
    }
  }

  async getZome(): Promise<SimulatedZome> {
    return buildZome(Blockly, this._workspace, this.zome.name);
  }

  render() {
    return html`
      <div
        class="row"
        style=${styleMap({
          flex: '1',
          'pointer-events': this.editing ? 'all' : 'none',
        })}
      >
        <div id="blockly-area" style="flex: 1;"></div>
      </div>
    `;
  }
}
