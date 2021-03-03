import { ENTRY_HASH, PUB_KEY } from '../types';

export const createLink = {
  type: 'create_link',
  message0: 'create_link base %1 target %2 tag %3',
  args0: [
    {
      type: 'input_value',
      name: 'BASE',
      check: [ENTRY_HASH, PUB_KEY],
      align: 'right',
    },
    {
      type: 'input_value',
      name: 'TARGET',
      check: [ENTRY_HASH, PUB_KEY],
      align: 'right',
    },
    {
      type: 'input_value',
      name: 'TAG',
      align: 'right',
    },
  ],
  nextStatement: null,
  previousStatement: null,
  colour: 160,
  tooltip: 'Returns number of letters in the provided text.',
  helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
};

export function defineCreateLink(blockly: any) {
  blockly.defineBlocksWithJsonArray([createLink]);
  blockly.JavaScript.create_link = function (block: any) {
    const base = blockly.JavaScript.valueToCode(
      block,
      'BASE',
      blockly.JavaScript.ORDER_ADDITION
    );
    const target = blockly.JavaScript.valueToCode(
      block,
      'TARGET',
      blockly.JavaScript.ORDER_ADDITION
    );
    const tag =
      blockly.JavaScript.valueToCode(
        block,
        'TAG',
        blockly.JavaScript.ORDER_ADDITION
      ) || 'null';

    if (!base) throw new Error(`"create_link": base is empty`);
    if (!target) throw new Error(`"create_link": target is empty`);

    return `(await hdk.create_link({base: ${base}, target: ${target}, tag: ${tag}}));\n`;
  };
}
