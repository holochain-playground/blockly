import { ENTRY, colour, HEADER_HASH } from '../types';

export const updateEntry = {
  type: 'update_entry',
  message0: 'update_entry original header %1 new entry %2',
  args0: [
    {
      type: 'input_value',
      name: 'ORIGINAL_HEADER',
      check: HEADER_HASH,
    },
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

export function defineUpdateEntry(blockly: any) {
  blockly.defineBlocksWithJsonArray([updateEntry]);
  blockly.JavaScript.update_entry = function (block: any) {
    const originalHeader = blockly.JavaScript.valueToCode(
      block,
      'ORIGINAL_HEADER',
      blockly.JavaScript.ORDER_ADDITION
    );
    const entry = blockly.JavaScript.valueToCode(
      block,
      'ENTRY',
      blockly.JavaScript.ORDER_ADDITION
    );

    if (!originalHeader)
      throw new Error(`"update_entry": original header is empty`);
    if (!entry) throw new Error(`"update_entry": entry is empty`);

    return `(await hdk.create_entry(${originalHeader}, ${entry}));\n`;
  };
}
