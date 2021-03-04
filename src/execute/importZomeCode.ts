import { Dictionary } from '@holochain-open-dev/core-types';
import { SimulatedZomeFunction } from '@holochain-playground/core';

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
  const functionsRegex = /function (\w*)\(([A-Za-z0-9_,\ ]*)\) \{/;
  const text = code.replace(
    functionsRegex,
    'export const $1 = (hdk) => async ($2) => {'
  );
  const functionArgs = code.split(functionsRegex);

  // prettier-ignore
  const module = await import(esm`${text}`);

  const zomeFns: Dictionary<any> = { ...module };

  for (const fnName of Object.keys(zomeFns)) {
    const argumentsIndex = functionArgs.findIndex(fn => fn === fnName) + 1;
    const fnArguments = functionArgs[argumentsIndex].split(', ').map(arg => ({
      name: arg,
      type: 'any',
    }));
    zomeFns[fnName] = <SimulatedZomeFunction>{
      arguments: fnArguments,
      call: zomeFns[fnName],
    };
  }
  console.log(zomeFns);
  return zomeFns;
}
