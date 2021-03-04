import { html, css } from 'lit-element';
import { JsonViewer } from '@power-elements/json-viewer';

import { sharedStyles } from '../utils/shared-styles';
import { selectAllCells, selectFromCAS } from '../utils/selectors';
import { PlaygroundElement } from '../../context/playground-element';
import { Card } from 'scoped-material-components/mwc-card';
import { shortenStrRec } from '../utils/hash';

/**
 * @element entry-contents
 */
export class EntryContents extends PlaygroundElement {
  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          display: flex;
        }
      `,
    ];
  }

  get activeHashedContent() {
    const allCells = selectAllCells(this.activeDna, this.conductors);
    return selectFromCAS(this.activeHash, allCells);
  }

  render() {
    return html`
      <mwc-card style="width: auto; min-height: 200px;" class="fill">
        <div class="column fill" style="padding: 16px;">
          <span class="title">
            ${this.activeHashedContent && this.activeHashedContent.header
              ? 'Header'
              : 'Entry'}
            Contents</span
          >
          ${this.activeHashedContent
            ? html`
                <div class="column fill">
                  <span style="margin-bottom: 16px;">
                    ${this.activeHashedContent.header ? 'Header' : 'Entry'}
                    Hash: ${this.activeHash}
                  </span>
                  <div class="fill flex-scrollable-parent">
                    <div class="flex-scrollable-container">
                      <div class="flex-scrollable-y" style="height: 100%;">
                        <json-viewer
                          .object=${shortenStrRec(this.activeHashedContent)}
                          class="fill"
                        ></json-viewer>
                      </div>
                    </div>
                  </div>
                </div>
              `
            : html`
                <div class="column fill center-content">
                  <span class="placeholder">Select entry to inspect</span>
                </div>
              `}
        </div>
      </mwc-card>
    `;
  }

  static get scopedElements() {
    return {
      'json-viewer': JsonViewer,
      'mwc-card': Card,
    };
  }
}
