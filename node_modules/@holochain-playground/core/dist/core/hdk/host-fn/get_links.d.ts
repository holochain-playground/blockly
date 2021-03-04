import { Hash } from '@holochain-open-dev/core-types';
import { GetLinksOptions } from '../../../types';
import { Link } from '../../cell/cascade/types';
import { HostFn } from '../host-fn';
export declare type GetLinksFn = (base_address: Hash, options?: GetLinksOptions) => Promise<Link[] | undefined>;
export declare const get_links: HostFn<GetLinksFn>;
