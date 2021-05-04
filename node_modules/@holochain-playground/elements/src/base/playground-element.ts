import { PlaygroundContext } from './context';
import { ConsumerMixin } from 'lit-element-context';
import { Hash, AgentPubKey } from '@holochain-open-dev/core-types';
import { Conductor } from '@holochain-playground/core';
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

export class PlaygroundElement extends ScopedRegistryHost(
  ConsumerMixin(LitElement) as new () => LitElement
) {
  /** Context variables */
  @property({ type: String })
  activeDna: Hash | undefined;
  @property({ type: String })
  activeAgentPubKey: AgentPubKey | undefined;
  @property({ type: String })
  activeHash: Hash | undefined;
  @state()
  conductors: Conductor[] = [];

  @property({ type: Array })
  conductorsUrls: string[] | undefined;

  static get inject() {
    return [
      'activeDna',
      'activeAgentPubKey',
      'activeHash',
      'conductors',
      'conductorsUrls',
    ];
  }

  updatePlayground(context: Partial<PlaygroundContext>) {
    this.dispatchEvent(
      new CustomEvent('update-context', {
        bubbles: true,
        composed: true,
        detail: context,
      })
    );
  }

  showMessage(message: string) {
    this.dispatchEvent(
      new CustomEvent('show-message', {
        bubbles: true,
        composed: true,
        detail: { message },
      })
    );
  }
}
