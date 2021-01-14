import { SimulatedDnaTemplate } from '@holochain-playground/core';
import { buildZome } from './buildZome';

export function buildDna(code: string): SimulatedDnaTemplate {
  const zome = buildZome(code);
  return {
    zomes: [zome],
  };
}
