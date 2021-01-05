import { html, css, LitElement, property, query } from 'lit-element';
import Blockly from 'blockly';
import { sharedStyles } from './shared-styles';
import { defineBlocks } from './blocks/define-blocks';
import { toolbox } from './toolbox';

export class HolochainPlaygroundBlockly extends LitElement {
  @query('#blockly-area')
  blocklyArea!: HTMLElement;

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
    Blockly.inject(this.blocklyArea, {
      toolbox: toolbox,
      shadowRoot: this.shadowRoot,
    } as any);
  }

  render() {
    return html`
      <div class="row" style="flex: 1;">
        <div id="blockly-area" style="flex: 1;"></div>
      </div>
    `;
  }
}
