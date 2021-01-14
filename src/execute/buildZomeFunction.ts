import { SimulatedZomeFunction } from '@holochain-playground/core';
import { create_entry as CE } from '@holochain-playground/core';

//({ content }) => [create_entry(content, 'sample_entry')],

export function buildZomeFunction(
  code: string
): { name: string; fn: SimulatedZomeFunction } {
  const create_entry = (e: any, t: any) => CE(e, t);

  return {
    name: 'sample',
    fn: () => [eval(code)],
  };
}
