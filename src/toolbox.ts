export const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Entries',
      contents: [{ kind: 'block', type: 'new_entry' }],
    },
    {
      kind: 'category',
      name: 'HDK',
      contents: [
        {
          kind: 'category',
          name: 'Actions',
          contents: [
            {
              kind: 'block',
              type: 'get',
            },
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
          name: 'Callbacks',
          contents: [],
        },
        {
          kind: 'category',
          name: 'Information',
          contents: [],
        },
      ],
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
    {
      kind: 'category',
      name: 'Variables',
      custom: 'VARIABLE',
    },
    {
      kind: 'category',
      name: 'Functions',
      custom: 'PROCEDURE',
    },
  ],
};
