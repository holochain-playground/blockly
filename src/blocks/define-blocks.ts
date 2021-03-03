import { defineCreateEntry } from './actions/create-entry';
import { defineCreateLink } from './actions/create-link';
import { defineGet } from './actions/get';
import { defineHashEntry } from './actions/hash-entry';
import { defineEntry } from './entry';
import { defineAgentInfo } from './info/agent-info';

export function defineBlocks(blockly: any) {
  defineCreateEntry(blockly);
  defineEntry(blockly);
  defineCreateLink(blockly);
  defineHashEntry(blockly);
  defineGet(blockly);
  defineAgentInfo(blockly);
}
