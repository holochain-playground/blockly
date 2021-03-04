import { ENTRY, ENTRY_HASH, colour } from '../types';

export const hashEntry = {
  type: 'hash_entry',
  message0: 'hash_entry %1',
  args0: [
    {
      type: 'input_value',
      name: 'ENTRY',
      check: ENTRY,
    },
  ],
  inputsInline: true,
  output: ENTRY_HASH,
  colour,
  tooltip: 'Returns number of letters in the provided text.',
  helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
};

export function defineHashEntry(blockly: any) {
  blockly.defineBlocksWithJsonArray([hashEntry]);
  blockly.JavaScript.hash_entry = function (block: any) {
    const entry = blockly.JavaScript.valueToCode(
      block,
      'ENTRY',
      blockly.JavaScript.ORDER_ADDITION
    );

    if (!entry) throw new Error(`"hash_entry": entry is empty`);
    console.log(`(await hdk.hash_entry(${entry}))`);
    return [
      `(await hdk.hash_entry(${entry}))`,
      blockly.JavaScript.ORDER_FUNCTION_CALL,
    ];
  };
}
