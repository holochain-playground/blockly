import { ENTRY } from './types';

export const entry = {
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
