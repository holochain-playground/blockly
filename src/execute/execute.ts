import {
  createConductors,
  SimulatedDnaTemplate,
} from '@holochain-playground/core';

export async function execute(
  dna: SimulatedDnaTemplate,
  zomeName: string,
  fnName: string,
  payload: any
) {
  const conductors = await createConductors(1, [], dna);

  const cellId = conductors[0].cells[0].id;

  const result = await conductors[0].callZomeFn({
    cellId,
    cap: null as any,
    fnName,
    zome: zomeName,
    payload,
  });
  console.log(result);
}
