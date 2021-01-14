import { createEntry, defineCreateEntry } from './actions/create-entry';
import { createLink } from './actions/create-link';
import { get } from './actions/get';
import { hashEntry } from './actions/hash-entry';
import { defineEntry } from './entry';

export function defineBlocks(blockly: any) {
  blockly.defineBlocksWithJsonArray([hashEntry, createLink, get]);

  defineCreateEntry(blockly);
  defineEntry(blockly);
}
