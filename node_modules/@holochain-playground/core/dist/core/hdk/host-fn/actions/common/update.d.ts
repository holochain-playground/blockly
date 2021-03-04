import { Hash, Entry, EntryType } from '@holochain-open-dev/core-types';
import { HostFnWorkspace } from '../../../host-fn';
export declare function common_update(worskpace: HostFnWorkspace, original_header_hash: Hash, entry: Entry, entry_type: EntryType): Promise<Hash>;
