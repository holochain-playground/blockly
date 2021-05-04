import { Conductor } from '@holochain-playground/core';
import { Dictionary, Hash } from '@holochain-open-dev/core-types';
import { ZomeFunctionResult } from '../elements/zome-fns-results/types';

export interface PlaygroundContext {
  activeDna: Hash;
  activeAgentPubKey: Hash | undefined;
  activeHash: Hash | undefined;
  conductors: Conductor[];
  conductorsUrls: string[] | undefined;
}
