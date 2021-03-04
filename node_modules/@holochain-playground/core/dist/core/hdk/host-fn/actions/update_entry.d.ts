import { Hash } from '@holochain-open-dev/core-types';
import { HostFn } from '../../host-fn';
export declare type UpdateEntryFn = (original_header_address: Hash, newEntry: {
    content: any;
    entry_def_id: string;
}) => Promise<Hash>;
export declare const update_entry: HostFn<UpdateEntryFn>;
