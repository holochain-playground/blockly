import { Hash, Element, NewEntryHeader } from '@holochain-open-dev/core-types';
import { GetStrategy } from '../../../../../types';
import {
  buildDelete,
  buildShh,
} from '../../../../cell/source-chain/builder-headers';
import { putElement } from '../../../../cell/source-chain/put';
import { HostFnWorkspace } from '../../../host-fn';

export async function common_delete(
  worskpace: HostFnWorkspace,
  header_hash: Hash
): Promise<Hash> {
  const elementToDelete = await worskpace.cascade.dht_get(header_hash, {
    strategy: GetStrategy.Contents,
  });

  if (!elementToDelete) throw new Error('Could not find element to be deleted');

  const deletesEntryAddress = (elementToDelete.signed_header.header
    .content as NewEntryHeader).entry_hash;

  const deleteHeader = buildDelete(
    worskpace.state,
    header_hash,
    deletesEntryAddress
  );

  const element: Element = {
    signed_header: buildShh(deleteHeader),
    entry: undefined,
  };
  putElement(element)(worskpace.state);

  return element.signed_header.header.hash;
}
