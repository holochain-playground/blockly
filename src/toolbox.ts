export const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'HDK Actions',
      contents: [
        {
          kind: 'block',
          type: 'create_entry',
        },
        {
          kind: 'block',
          type: 'hash_entry',
        },
        {
          kind: 'block',
          type: 'create_link',
        },
      ],
    },
    {
      kind: 'category',
      name: 'HDK Callbacks',
      contents: [],
    },
    {
      kind: 'category',
      name: 'Control',
      contents: [
        {
          kind: 'block',
          type: 'controls_if',
        },
        {
          kind: 'block',
          type: 'controls_whileUntil',
        },
        {
          kind: 'block',
          type: 'controls_for',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Logic',
      contents: [
        {
          kind: 'block',
          type: 'logic_compare',
        },
        {
          kind: 'block',
          type: 'logic_operation',
        },
        {
          kind: 'block',
          type: 'logic_boolean',
        },
      ],
    },
  ],
};
