import { AgentPubKey } from '@holochain-open-dev/core-types';
import { Cell } from '../cell';
import { NetworkRequest } from './network-request';

export class Connection {
  private _closed = false;

  get closed() {
    return this._closed;
  }

  close() {
    this._closed = false;
  }

  constructor(public opener: Cell, public receiver: Cell) {
    if (
      opener.p2p.badAgents.includes(receiver.agentPubKey) ||
      receiver.p2p.badAgents.includes(opener.agentPubKey)
    ) {
      throw new Error('Connection closed!');
    }
  }

  sendRequest<T>(
    fromAgent: AgentPubKey,
    networkRequest: NetworkRequest<T>
  ): Promise<T> {
    if (this.closed) throw new Error('Connection closed!');

    if (this.opener.agentPubKey === fromAgent) {
      return networkRequest(this.receiver);
    } else if (this.receiver.agentPubKey === fromAgent) {
      return networkRequest(this.opener);
    }
    throw new Error('Bad request');
  }

  getPeer(myAgentPubKey: AgentPubKey): Cell {
    if (this.opener.agentPubKey === myAgentPubKey) return this.receiver;
    return this.opener;
  }
}
