export const createEntry = {
  type: 'create_entry',
  message0: 'create_entry %1',
  args0: [
    {
      type: 'input_value',
      name: 'VALUE',
      check: 'Entry',
    },
  ],
  inputsInline: true,
  nextStatement: null,
  previousStatement: null,
  colour: 160,
  tooltip: 'Returns number of letters in the provided text.',
  helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
};
