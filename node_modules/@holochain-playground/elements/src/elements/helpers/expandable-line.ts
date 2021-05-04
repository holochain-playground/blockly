import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { html, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { property } from 'lit/decorators.js';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { sharedStyles } from '../utils/shared-styles';

export class ExpandableLine extends ScopedRegistryHost(LitElement) {
  @property({ type: Boolean })
  _expanded = false;

  render() {
    return html`
      <div class="row">
        <mwc-icon-button
          style="--mdc-icon-button-size: 30px; margin-right: 4px;"
          .icon=${this._expanded ? 'arrow_drop_up' : 'arrow_drop_down'}
          @click=${() => (this._expanded = !this._expanded)}
        ></mwc-icon-button>

        <div
          style=${styleMap({
            position: this._expanded ? 'unset' : 'relative',
            flex: '1',
            display: 'flex',
          })}
        >
          <div
            style=${styleMap({
              display: this._expanded ? 'none' : 'block',
              'z-index': '3',
              position: this._expanded ? 'unset' : 'absolute',
              width: '100%',
              height: '100%',
              'box-shadow': this._expanded
                ? ''
                : 'inset 0 -10px 10px -10px #000000',
            })}
          ></div>
          <div
            style=${styleMap({
              height: this._expanded ? 'auto' : '30px',
              width: this._expanded ? 'auto' : '100%',
              overflow: this._expanded ? 'auto' : 'hidden',
              position: this._expanded ? 'unset' : 'absolute',
              flex: '1',
            })}
          >
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }

  static get styles() {
    return sharedStyles;
  }

  static elementDefinitions = {
    'mwc-icon-button': IconButton,
  };
}
