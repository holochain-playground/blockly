import { Hash } from '@holochain-open-dev/core-types';
import { HostFn, HostFnWorkspace } from '../../host-fn';
import { common_delete } from './common/delete';

export type DeleteEntryFn = (deletes_address: Hash) => Promise<Hash>;

// Creates a new Create header and its entry in the source chain
export const delete_entry: HostFn<DeleteEntryFn> = (
  worskpace: HostFnWorkspace
): DeleteEntryFn => async (deletes_address: Hash): Promise<Hash> => {
  return common_delete(worskpace, deletes_address);
};
