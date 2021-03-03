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
          name: 'Entries',
          contents: [
            {
              kind: 'block',
              type: 'get',
            },
            {
              kind: 'block',
              type: 'get_details',
            },
            {
              kind: 'block',
              type: 'create_entry',
            },
            {
              kind: 'block',
              type: 'hash_entry',
            },
          ],
        },
        {
          kind: 'category',
          name: 'Links',
          contents: [
            {
              kind: 'block',
              type: 'get_links',
            },
            {
              kind: 'block',
              type: 'create_link',
            },
          ],
        },
        {
          kind: 'category',
          name: 'Information',
          contents: [
            {
              kind: 'block',
              type: 'agent_info.agent_latest_pubkey',
            },
          ],
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
        {
          kind: 'block',
          type: 'controls_forEach',
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
      name: 'List',
      contents: [
        {
          kind: 'block',
          type: 'lists_length',
        },
        {
          kind: 'block',
          type: 'lists_isEmpty',
        },
        {
          kind: 'block',
          type: 'lists_getIndex',
        },
        {
          kind: 'block',
          type: 'lists_setIndex',
        },
        {
          kind: 'block',
          type: 'lists_sort',
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
