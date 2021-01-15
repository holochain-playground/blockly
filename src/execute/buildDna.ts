import { SimulatedDnaTemplate } from '@holochain-playground/core';
import { buildZome } from './buildZome';

export async function buildDna(code: string): Promise<SimulatedDnaTemplate> {
  const zome = await buildZome(code);
  return {
    zomes: [zome],
  };
}
