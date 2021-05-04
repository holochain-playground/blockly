import { colour, HEADER_HASH } from '../types';

export const deleteEntry = {
  type: 'delete_entry',
  message0: 'delete_entry header_hash%1',
  args0: [
    {
      type: 'input_value',
      name: 'HEADER',
      check: HEADER_HASH,
    },
  ],
  inputsInline: true,
  nextStatement: null,
  previousStatement: null,
  colour,
  tooltip: 'Returns number of letters in the provided text.',
  helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
};

export function defineDeleteEntry(blockly: any) {
  blockly.defineBlocksWithJsonArray([deleteEntry]);
  blockly.JavaScript.delete_entry = function (block: any) {
    const headerHash = blockly.JavaScript.valueToCode(
      block,
      'HEADER',
      blockly.JavaScript.ORDER_ADDITION
    );

    if (!headerHash) throw new Error(`"delete_entry": header_hash is empty`);

    return `(await hdk.delete_entry(${headerHash}));\n`;
  };
}
