import { ENTRY_HASH, PUB_KEY, colour } from '../types';

export const getDetails = {
  type: 'get_details',
  message0: 'get_details %1',
  args0: [
    {
      type: 'input_value',
      name: 'HASH',
      check: [ENTRY_HASH, PUB_KEY],
    },
  ],
  inputsInline: true,
  output: 'EntryDetails',
  colour,
  tooltip: 'Returns number of letters in the provided text.',
  helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
};

export function defineGetDetails(blockly: any) {
  blockly.defineBlocksWithJsonArray([getDetails]);
  blockly.JavaScript.get_details = function (block: any) {
    const hash = blockly.JavaScript.valueToCode(
      block,
      'HASH',
      blockly.JavaScript.ORDER_ADDITION
    );
    if (!hash) throw new Error(`"get_details": hash is empty`);

    return [
      `(await hdk.get_details(hash))`,
      blockly.JavaScript.ORDER_FUNCTION_CALL,
    ];
  };
}
