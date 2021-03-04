import { GetStrategy } from '../types';
import { SimulatedDnaTemplate, SimulatedZome } from './simulated-dna';

export const demoEntriesZome: SimulatedZome = {
  name: 'demo_entries',
  entry_defs: [
    {
      id: 'demo_entry',
      visibility: 'Public',
    },
    {
      id: 'path',
      visibility: 'Public',
    },
  ],
  zome_functions: {
    create_entry: {
      call: ({ hash_entry, create_entry }) => async ({ content }) => {
        await create_entry({ content, entry_def_id: 'demo_entry' });
        return hash_entry({ content });
      },
      arguments: [{ name: 'content', type: 'any' }],
    },
    get: {
      call: ({ get }) => ({ hash }) => {
        return get(hash, { strategy: GetStrategy.Latest });
      },
      arguments: [{ name: 'hash', type: 'AnyDhtHash' }],
    },
    get_details: {
      call: ({ get_details }) => ({ hash }) => {
        return get_details(hash, { strategy: GetStrategy.Latest });
      },
      arguments: [{ name: 'hash', type: 'AnyDhtHash' }],
    },
    update_entry: {
      call: ({ update_entry }) => ({
        original_header_address,
        new_content,
      }) => {
        return update_entry(original_header_address, {
          content: new_content,
          entry_def_id: 'demo_entry',
        });
      },
      arguments: [
        { name: 'original_header_address', type: 'HeaderHash' },
        { name: 'new_content', type: 'String' },
      ],
    },
    delete_entry: {
      call: ({ delete_entry }) => ({ deletes_address }) => {
        return delete_entry(deletes_address);
      },
      arguments: [{ name: 'deletes_address', type: 'HeaderHash' }],
    },
  },
};

export const demoLinksZome: SimulatedZome = {
  name: 'demo_links',
  entry_defs: [],
  zome_functions: {
    create_link: {
      call: ({ create_link }) => ({ base, target, tag }) => {
        return create_link({ base, target, tag });
      },
      arguments: [
        { name: 'base', type: 'EntryHash' },
        { name: 'target', type: 'EntryHash' },
        { name: 'tag', type: 'any' },
      ],
    },
    get_links: {
      call: ({ get_links }) => ({ base }) => {
        return get_links(base);
      },
      arguments: [{ name: 'base', type: 'EntryHash' }],
    },
    delete_link: {
      call: ({ delete_link }) => ({ add_link_header }) => {
        return delete_link(add_link_header);
      },
      arguments: [{ name: 'add_link_header', type: 'HeaderHash' }],
    },
  },
};

export function demoDnaTemplate(): SimulatedDnaTemplate {
  const zomes = [demoEntriesZome, demoLinksZome];
  return {
    zomes,
  };
}
