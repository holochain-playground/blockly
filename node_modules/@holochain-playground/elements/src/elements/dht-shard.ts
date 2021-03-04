import { LitElement, property, PropertyValues, html, query } from 'lit-element';
import { sharedStyles } from './utils/shared-styles';
import { selectAllCells, selectCell } from './utils/selectors';
import { getDhtShard } from '@holochain-playground/core';

import { JsonViewer } from '@power-elements/json-viewer';
import { PlaygroundElement } from '../context/playground-element';

export class DhtShard extends PlaygroundElement {
  @property({ type: Object })
  cell: { dna: string; agentId: string } = undefined;

  static style() {
    return sharedStyles;
  }

  get activeCell() {
    return (
      selectCell(this.activeDna, this.activeAgentPubKey, this.conductors) ||
      selectAllCells(this.activeDna, this.conductors)[0]
    );
  }
  render() {
    return html`
      <div class="column">
        ${this.activeCell
          ? html`
              <span>
                <strong>
                  Entries with associated metadata, and agent ids with all their
                  headers
                </strong>
              </span>
              <json-viewer
                id="dht-shard"
                style="margin-top: 16px;"
                .object=${JSON.stringify(getDhtShard(this.activeCell.getState()))}
              >
              </json-viewer>
            `
          : html`
              <span class="placeholder">
                Select a cell to see its DHT Shard
              </span>
            `}
      </div>
    `;
  }

  static get scopedElements() {
    return {
      'json-viewer': JsonViewer,
    };
  }
}
