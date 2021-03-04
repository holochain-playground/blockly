import { Hash } from '@holochain-open-dev/core-types';
import { HostFn } from '../host-fn';
export declare type HashEntryFn = (args: {
    content: any;
}) => Promise<Hash>;
export declare const hash_entry: HostFn<HashEntryFn>;
