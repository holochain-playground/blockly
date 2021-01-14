import { html, css, LitElement, property, query } from 'lit-element';
import Blockly from 'blockly';
import 'blockly/javascript';
import { sharedStyles } from './shared-styles';
import { defineBlocks } from './blocks/define-blocks';
import { toolbox } from './toolbox';
import { buildDna } from './execute/buildDna';
import { execute } from './execute/execute';

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
    const workspace = Blockly.inject(this.blocklyArea, {
      toolbox: toolbox,
      shadowRoot: this.shadowRoot,
    } as any);

    workspace.addChangeListener(() => {
      const code = (Blockly as any).JavaScript.workspaceToCode(workspace);
      console.log(code);
      const dna = buildDna(code);
      execute(dna, 'sample', 'sample', {});
    });
  }

  render() {
    return html`
      <div class="row" style="flex: 1;">
        <div id="blockly-area" style="flex: 1;"></div>
      </div>
    `;
  }
}
