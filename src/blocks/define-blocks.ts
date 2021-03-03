import { defineCreateEntry } from './entries/create_entry';
import { defineCreateLink } from './links/create_link';
import { defineGet } from './entries/get';
import { defineHashEntry } from './entries/hash_entry';
import { defineEntry } from './entry';
import { defineAgentInfo } from './info/agent_info';
import { defineGetDetails } from './entries/get_details';
import { defineGetLinks } from './links/get_links';

export function defineBlocks(blockly: any) {
  defineCreateEntry(blockly);
  defineEntry(blockly);
  defineCreateLink(blockly);
  defineHashEntry(blockly);
  defineGet(blockly);
  defineAgentInfo(blockly);
  defineGetDetails(blockly);
  defineGetLinks(blockly);
}
