import { html, css, LitElement, property, query } from 'lit-element';
import { PlaygroundMixin } from '@holochain-playground/container';
import Blockly, { Workspace } from 'blockly';
import 'blockly/javascript';
import { sharedStyles } from '../shared-styles';
import { defineBlocks } from '../blocks/define-blocks';
import { toolbox } from '../toolbox';
import { buildZome } from '../execute/buildZome';
import { SimulatedZome } from '@holochain-playground/core';

export class HolochainPlaygroundEditZome extends PlaygroundMixin(LitElement) {
  @property({ type: Object })
  zome!: SimulatedZome;

  @query('#blockly-area')
  blocklyArea!: HTMLElement;

  _workspace!: Workspace;

  static styles = [
    css`
      :host {
        display: flex;
        flex: 1;
      }
    `,
    sharedStyles,
  ];

  firstUpdated() {
    defineBlocks(Blockly);
    this._workspace = Blockly.inject(this.blocklyArea, {
      toolbox: toolbox,
      shadowRoot: this.shadowRoot,
    } as any);

    this._workspace.addChangeListener(() =>
      this.dispatchEvent(new CustomEvent('zome-edited'))
    );
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
    const code = (Blockly as any).JavaScript.workspaceToCode(this._workspace);
    console.log(code);
    return buildZome(code);
  }

  render() {
    return html`
      <div class="row" style="flex: 1;">
        <div id="blockly-area" style="flex: 1;"></div>
      </div>
    `;
  }
}
