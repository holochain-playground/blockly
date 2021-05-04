import { Hash, Details } from '@holochain-open-dev/core-types';
import { GetOptions } from '../../../types';
import { HostFn } from '../host-fn';
export declare type GetDetailsFn = (args: Hash, options?: GetOptions) => Promise<Details | undefined>;
export declare const get_details: HostFn<GetDetailsFn>;
