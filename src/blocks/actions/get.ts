import { ENTRY_HASH, HEADER_HASH, PUB_KEY } from '../types';

export const get = {
  type: 'get',
  message0: 'get %1',
  args0: [
    {
      type: 'input_value',
      name: 'VALUE',
      check: [ENTRY_HASH, HEADER_HASH, PUB_KEY],
    },
  ],
  inputsInline: true,
  output: 'Element',
  colour: 160,
  tooltip: 'Returns number of letters in the provided text.',
  helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
};
