import { defineCreateEntry } from './crud/create_entry';
import { defineCreateLink } from './links/create_link';
import { defineGet } from './crud/get';
import { defineHashEntry } from './crud/hash_entry';
import { defineAgentInfo } from './info/agent_info';
import { defineGetDetails } from './crud/get_details';
import { defineGetLinks } from './links/get_links';
import { defineEntryDefs } from './callbacks/entry_defs';
import { defineUpdateEntry } from './crud/update_entry';
import { defineDeleteEntry } from './crud/delete_entry';

export function defineBlocks(blockly: any) {
  defineCreateEntry(blockly);
  defineCreateLink(blockly);
  defineHashEntry(blockly);
  defineGet(blockly);
  defineAgentInfo(blockly);
  defineGetDetails(blockly);
  defineGetLinks(blockly);
  defineEntryDefs(blockly);
  defineUpdateEntry(blockly);
  defineDeleteEntry(blockly);
}
