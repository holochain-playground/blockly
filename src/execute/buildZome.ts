import {
  SimulatedZome,
  SimulatedZomeFunction,
} from '@holochain-playground/core';
import { buildZomeFunction } from './buildZomeFunction';
import { Dictionary } from '@holochain-open-dev/core-types';
import { create_entry as CE } from '@holochain-playground/core';

export function buildZome(code: string): SimulatedZome {
  const zome_functions: Dictionary<SimulatedZomeFunction> = {};
  const create_entry = (e: any, t: any) => CE(e, t);

  console.log(eval(`{${code}}`));
  const { name, fn } = buildZomeFunction(code);
  zome_functions[name] = fn;

  return {
    name: 'sample',
    entry_defs: [
      {
        id: 'sample',
        visibility: 'Public',
      },
    ],
    zome_functions,
  };
}
