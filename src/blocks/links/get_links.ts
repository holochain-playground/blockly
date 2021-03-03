import { ENTRY_HASH, PUB_KEY } from '../types';

export const getLinks = {
  type: 'get_links',
  message0: 'get_links base: %1 tag: %2',
  args0: [
    {
      type: 'input_value',
      name: 'BASE',
      check: [ENTRY_HASH, PUB_KEY],
    },
    {
      type: 'input_value',
      name: 'TAG',
    },
  ],
  inputsInline: true,
  output: 'Array',
  colour: 160,
  tooltip: 'Returns number of letters in the provided text.',
  helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
};

export function defineGetLinks(blockly: any) {
  blockly.defineBlocksWithJsonArray([getLinks]);
  blockly.JavaScript.get = function (block: any) {
    const hash = blockly.JavaScript.valueToCode(
      block,
      'BASE',
      blockly.JavaScript.ORDER_ADDITION
    );
    const tag =
      blockly.JavaScript.valueToCode(
        block,
        'TAG',
        blockly.JavaScript.ORDER_ADDITION
      ) || 'null';
    if (!hash) throw new Error(`"get_links": base hash is empty`);

    return [
      `(await hdk.get_links(${hash}, ${tag}))`,
      blockly.JavaScript.ORDER_FUNCTION_CALL,
    ];
  };
}
