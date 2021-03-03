import { Dictionary } from '@holochain-open-dev/core-types';

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
  const text = code.replace(
    /function (\w*)\(([A-Za-z0-9_,]*)\) \{/,
    'export const $1 = (hdk) => async ($2) => {'
  );
  console.log(text);
  // prettier-ignore
  const module = await import(esm`${text}`);

  const zomeFns: Dictionary<any> = { ...module };

  for (const fnName of Object.keys(zomeFns)) {
    zomeFns[fnName] = {
      arguments: [],
      call: zomeFns[fnName],
    };
  }
  return zomeFns;
}
