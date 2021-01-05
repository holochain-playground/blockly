export const createLink = {
  type: 'create_link',
  message0: 'create_link base %1 target %2 tag %3',
  args0: [
    {
      type: 'input_value',
      name: 'BASE',
      check: 'EntryHash',
      align: 'right',
    },
    {
      type: 'input_value',
      name: 'TARGET',
      check: 'EntryHash',
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
