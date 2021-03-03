import { ENTRY } from './types';

const entry = {
  type: 'new_entry',
  message0: 'new entry %1',
  args0: [
    {
      type: 'field_input',
      name: 'CONTENT',
      check: 'String',
    },
  ],
  output: ENTRY,
  inputsInline: true,
  colour: 160,
  tooltip: 'Returns number of letters in the provided text.',
  helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
};

export function defineEntry(blockly: any) {
  blockly.defineBlocksWithJsonArray([entry]);
  blockly.JavaScript.new_entry = function (block: any) {
    const content = block.getFieldValue('CONTENT');

    return [`"${content}"`, blockly.JavaScript.ORDER_FUNCTION_CALL];
  };
}
