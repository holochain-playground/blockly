import { property, query } from 'lit-element';
import { html } from 'lit-html';
import { Button } from 'scoped-material-components/mwc-button';
import { Dialog } from 'scoped-material-components/mwc-dialog';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { PlaygroundElement } from '../../context/playground-element';

export class HelpButton extends PlaygroundElement {
  @property({ type: String })
  heading: string;

  @query('#help-dialog')
  _helpDialog: Dialog;

  renderHelpDialog() {
    return html`
      <mwc-dialog id="help-dialog" .heading=${this.heading}>
        <slot></slot>
        <mwc-button slot="primaryAction" dialogAction="cancel">
          Got it!
        </mwc-button>
      </mwc-dialog>
    `;
  }

  render() {
    return html`
      ${this.renderHelpDialog()}
      <mwc-icon-button
        icon="help_outline"
        @click=${() => this._helpDialog.show()}
      ></mwc-icon-button>
    `;
  }

  static get scopedElements() {
    return {
      'mwc-icon-button': IconButton,
      'mwc-button': Button,
      'mwc-dialog': Dialog,
    };
  }
}
