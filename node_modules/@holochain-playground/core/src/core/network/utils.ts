import { Hash } from '@holochain-open-dev/core-types';
import { uniq } from 'lodash-es';
import { distance, location, wrap } from '../../processors/hash';

export function getClosestNeighbors(
  peers: Hash[],
  targetHash: Hash,
  numNeighbors: number
): Hash[] {
  const sortedPeers = peers.sort((agentA: Hash, agentB: Hash) => {
    const distanceA = distance(agentA, targetHash);
    const distanceB = distance(agentB, targetHash);
    return distanceA - distanceB;
  });

  return sortedPeers.slice(0, numNeighbors);
}

export function getFarthestNeighbors(peers: Hash[], targetHash: Hash): Hash[] {
  const sortedPeers = peers.sort((agentA: Hash, agentB: Hash) => {
    return (
      wrap(location(agentA) - location(targetHash)) -
      wrap(location(agentB) - location(targetHash))
    );
  });

  const index35 = Math.floor(sortedPeers.length * 0.35);
  const index50 = Math.floor(sortedPeers.length / 2);
  const index65 = Math.floor(sortedPeers.length * 0.65);

  const neighbors = [
    sortedPeers[index35],
    sortedPeers[index50],
    sortedPeers[index65],
  ].filter(n => !!n);

  return uniq(neighbors);
}
