import { Dictionary } from '@holochain-open-dev/core-types';
import { Cell, location } from '@holochain-playground/core';

export function dhtCellsNodes(cells: Cell[]) {
  const sortedCells = cells.sort(
    (a: Cell, b: Cell) => location(a.agentPubKey) - location(b.agentPubKey)
  );
  const cellNodes = sortedCells.map((cell) => ({
    data: {
      id: cell.agentPubKey,
      label: `${cell.agentPubKey.substr(0, 10)}...`,
    },
    classes: ['cell'],
  }));

  return cellNodes;
}

export function neighborsEdges(cells: Cell[]) {
  // Segmented by originAgentPubKey/targetAgentPubKey
  const allNeighbors: Dictionary<Dictionary<boolean>> = {};
  const edges: any[] = [];

  for (const cell of cells) {
    const cellAgentPubKey = cell.agentPubKey;
    const cellNeighbors = cell.p2p.getNeighbors();

    for (const cellNeighbor of cellNeighbors) {
      if (
        !(
          allNeighbors[cellNeighbor] &&
          allNeighbors[cellNeighbor][cellAgentPubKey]
        )
      ) {
        edges.push({
          data: {
            id: `${cellAgentPubKey}->${cellNeighbor}`,
            source: cellAgentPubKey,
            target: cellNeighbor,
          },
          classes: ['neighbor-edge'],
        });
      }

      if (!allNeighbors[cellAgentPubKey]) {
        allNeighbors[cellAgentPubKey] = {};
      }

      allNeighbors[cellAgentPubKey][cellNeighbor] = true;
    }

    for (const farNeighbor of cell.p2p.farKnownPeers) {
      edges.push({
        data: {
          id: `${cellAgentPubKey}->${farNeighbor}`,
          source: cellAgentPubKey,
          target: farNeighbor,
        },
        classes: ['far-neighbor-edge'],
      });
    }
  }

  return edges;
}
