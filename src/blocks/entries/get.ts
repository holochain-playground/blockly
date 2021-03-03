import { ELEMENT, ENTRY_HASH, HEADER_HASH, PUB_KEY } from '../types';

export const get = {
  type: 'get',
  message0: 'get %1',
  args0: [
    {
      type: 'input_value',
      name: 'HASH',
      check: [ENTRY_HASH, HEADER_HASH, PUB_KEY],
    },
  ],
  inputsInline: true,
  output: ELEMENT,
  colour: 160,
  tooltip: 'Returns number of letters in the provided text.',
  helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
};

export function defineGet(blockly: any) {
  blockly.defineBlocksWithJsonArray([get]);
  blockly.JavaScript.get = function (block: any) {
    const hash = blockly.JavaScript.valueToCode(
      block,
      'HASH',
      blockly.JavaScript.ORDER_ADDITION
    );
    if (!hash) throw new Error(`"get": hash is empty`);

    return [`(await hdk.get(hash))`, blockly.JavaScript.ORDER_FUNCTION_CALL];
  };
}
