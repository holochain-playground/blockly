import { ENTRY, colour } from '../types';

export const createEntry = {
  type: 'create_entry',
  message0: 'create_entry %1',
  args0: [
    {
      type: 'input_value',
      name: 'ENTRY',
      check: ENTRY,
    },
  ],
  inputsInline: true,
  nextStatement: null,
  previousStatement: null,
  colour,
  tooltip: 'Returns number of letters in the provided text.',
  helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
};

export function defineCreateEntry(blockly: any) {
  blockly.defineBlocksWithJsonArray([createEntry]);
  blockly.JavaScript.create_entry = function (block: any) {
    const entry = blockly.JavaScript.valueToCode(
      block,
      'ENTRY',
      blockly.JavaScript.ORDER_ADDITION
    );

    if (!entry) throw new Error(`"create_entry": entry is empty`);

    return `(await hdk.create_entry(${entry}));\n`;
  };
}
