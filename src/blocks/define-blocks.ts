import { createEntry } from './actions/create-entry';
import { createLink } from './actions/create-link';
import { get } from './actions/get';
import { hashEntry } from './actions/hash-entry';
import { entry } from './entry';

export function defineBlocks(blockly: any) {
  blockly.defineBlocksWithJsonArray([entry,createEntry, hashEntry, createLink, get]);
}
