import { ENTRY, colour } from './types';

export function defineNewEntry(blockly: any, entryDefId: string) {
  const type = `new ${entryDefId}`;
  if (!blockly.JavaScript[type]) {
    const entryBlock = {
      type,
      message0: `new ${entryDefId} %1`,
      args0: [
        {
          type: 'input_value',
          name: 'CONTENT',
          check: 'String',
          align: 'right',
        },
      ],
      output: ENTRY,
      inputsInline: true,
      colour,
      tooltip: 'Creates a new entry with the given entry_def_id and content',
      helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
    };

    blockly.defineBlocksWithJsonArray([entryBlock]);
    blockly.JavaScript[type] = function (block: any) {
      const content = blockly.JavaScript.valueToCode(
        block,
        'CONTENT',
        blockly.JavaScript.ORDER_ADDITION
      );

      return [
        `{content: ${content}, entry_def_id: "${entryDefId}"}`,
        blockly.JavaScript.ORDER_FUNCTION_CALL,
      ];
    };
  }

  return {
    kind: 'block',
    type,
  };
}
