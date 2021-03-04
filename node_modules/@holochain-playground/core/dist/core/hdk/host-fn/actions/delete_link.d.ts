import { Hash } from '@holochain-open-dev/core-types';
import { HostFn } from '../../host-fn';
export declare type DeleteLinkFn = (deletes_address: Hash) => Promise<Hash>;
export declare const delete_link: HostFn<DeleteLinkFn>;
