import { Dictionary } from '@holochain-open-dev/core-types';
import {
  SimulatedZomeFunction,
  SimulatedZomeFunctionArgument,
} from '@holochain-playground/core';

function esm(templateStrings: any, ...substitutions: any) {
  let js = templateStrings.raw[0];
  for (let i = 0; i < substitutions.length; i++) {
    js += substitutions[i] + templateStrings.raw[i + 1];
  }
  return `data:text/javascript;base64,${btoa(
    unescape(encodeURIComponent(js))
  )}`;
}

export async function importZomeFromCode(code: string) {
  // eslint-ignore-line
  const functionsRegex = /function (\w*)\(([A-Za-z0-9_,\ ]*)\) \{/g;
  const text = code.replace(
    functionsRegex,
    'export const $1 = (hdk) => async ({ $2 }) => {'
  );
  const functionArgs = code.split(functionsRegex);

  // prettier-ignore
  const module = await import(esm`${text}`);
  console.log(text);
  const entry_defs: Array<any> = module.entry_defs;

  if (!entry_defs)
    throw new Error('There are no entry_defs defined in this zome');
  if (entry_defs.some(def => def === null))
    throw new Error('There are null entry defs');

  const zome_functions: Dictionary<SimulatedZomeFunction> = {};

  for (const fnName of Object.keys(module).filter(
    key => key !== 'entry_defs'
  )) {
    const argumentsIndex = functionArgs.findIndex(fn => fn === fnName) + 1;
    let fnArguments: SimulatedZomeFunctionArgument[] = [];
    if (functionArgs[argumentsIndex] !== '') {
      fnArguments = functionArgs[argumentsIndex].split(', ').map(arg => ({
        name: arg,
        type: 'any',
      }));
    }
    zome_functions[fnName] = {
      arguments: fnArguments,
      call: module[fnName],
    };
  }
  return { zome_functions, entry_defs };
}
