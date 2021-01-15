import { SimulatedZome } from '@holochain-playground/core';
import { importZomeFromCode } from './importZomeCode';

export async function buildZome(code: string): Promise<SimulatedZome> {
  const zome_functions = await importZomeFromCode(code);

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
