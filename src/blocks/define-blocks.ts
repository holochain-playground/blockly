import { createEntry } from './actions/create-entry';
import { createLink } from './actions/create-link';
import { hashEntry } from './actions/hash-entry';

export function defineBlocks(blockly: any) {
  blockly.defineBlocksWithJsonArray([createEntry, hashEntry, createLink]);
}
