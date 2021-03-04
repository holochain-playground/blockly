import { Hash, SignedHeaderHashed } from '@holochain-open-dev/core-types';
import { CellState } from '../state';

/**
 * Returns the header hashes which don't have their DHTOps in the authoredDHTOps DB
 */
export function getNewHeaders(state: CellState): Array<Hash> {
  const dhtOps = Object.values(state.authoredDHTOps);
  const headerHashesAlreadyPublished = dhtOps.map(
    dhtOp => dhtOp.op.header.header.hash
  );
  return state.sourceChain.filter(
    headerHash => !headerHashesAlreadyPublished.includes(headerHash)
  );
}

export function getAllAuthoredHeaders(
  state: CellState
): Array<SignedHeaderHashed> {
  return state.sourceChain.map(headerHash => state.CAS[headerHash]);
}
