import { Element, Hash } from '@holochain-open-dev/core-types';
import { Cell } from '../../../cell';
import {
  buildCreateLink,
  buildShh,
} from '../../../cell/source-chain/builder-headers';
import { putElement } from '../../../cell/source-chain/put';
import { HostFn, HostFnWorkspace } from '../../host-fn';

export type CreateLinkFn = (args: {
  base: Hash;
  target: Hash;
  tag: any;
}) => Promise<Hash>;

// Creates a new CreateLink header in the source chain
export const create_link: HostFn<CreateLinkFn> = (
  worskpace: HostFnWorkspace,
  zome_id: number
): CreateLinkFn => async (args): Promise<Hash> => {
  const createLink = buildCreateLink(
    worskpace.state,
    zome_id,
    args.base,
    args.target,
    args.tag
  );

  const element: Element = {
    signed_header: buildShh(createLink),
    entry: undefined,
  };
  putElement(element)(worskpace.state);

  return element.signed_header.header.hash;
};
