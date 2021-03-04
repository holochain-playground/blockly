import { Constructor, property } from 'lit-element';
import { PlaygroundContext } from './context';
import { ConsumerMixin } from 'lit-element-context';
import { Hash, AgentPubKey } from '@holochain-open-dev/core-types';
import { Conductor } from '@holochain-playground/core';

export interface IPlaygroundElement extends PlaygroundContext {
  updatePlayground(context: Partial<PlaygroundContext>): void;
  showMessage(message: string): void;
}

export const PlaygroundMixin = <T extends Constructor<HTMLElement>>(
  baseClass: T
): T & Constructor<IPlaygroundElement> => {
  class PE
    extends (ConsumerMixin(baseClass) as T)
    implements IPlaygroundElement {
    /** Context variables */
    @property({ type: String })
    activeDna: Hash | undefined;
    @property({ type: String })
    activeAgentPubKey: AgentPubKey | undefined;
    @property({ type: String })
    activeHash: Hash | undefined;
    @property({ type: Array })
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
  return PE;
};
