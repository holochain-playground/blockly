import {
  Dictionary,
  EntryDetails,
  NewEntryHeader,
  SignedHeaderHashed,
  Update,
  timestampToMillis,
} from '@holochain-open-dev/core-types';
import {
  Cell,
  GetLinksResponse,
  getAllHeldEntries,
  getEntryDetails,
  getLinksForEntry,
  getEntryTypeString,
  getAppEntryType,
  getLiveLinks,
} from '@holochain-playground/core';
import { shortenStrRec } from '../utils/hash';
export function allEntries(
  cells: Cell[],
  showEntryContents: boolean,
  excludedEntryTypes: string[]
) {
  const details: Dictionary<EntryDetails> = {};
  const links: Dictionary<GetLinksResponse[]> = {};
  const entryTypes: Dictionary<string> = {};

  for (const cell of cells) {
    const state = cell.getState();
    for (const entryHash of getAllHeldEntries(state)) {
      details[entryHash] = getEntryDetails(state, entryHash);
      if (!links[entryHash]) links[entryHash] = [];
      links[entryHash].push(getLinksForEntry(state, entryHash));

      const firstEntryHeader = details[entryHash].headers[0];
      if (
        firstEntryHeader &&
        (firstEntryHeader.header.content as NewEntryHeader).entry_type
      ) {
        entryTypes[entryHash] = getEntryTypeString(
          cell,
          (firstEntryHeader.header.content as NewEntryHeader).entry_type
        );
      }
    }
  }

  //  const agentPubKeys = Object.keys(entries).filter(entryHash => details[entryHash].headers.includes(h=> (h as Agent)));

  const sortedEntries = sortEntries(Object.keys(details), details);

  const linksEdges = [];
  const entryNodes = [];
  const entryTypeCount = {};

  for (const entryHash of sortedEntries) {
    const detail = details[entryHash];
    const entry = detail.entry;

    // Get base nodes and edges
    const newEntryHeader: SignedHeaderHashed<NewEntryHeader> = detail
      .headers[0] as SignedHeaderHashed<NewEntryHeader>;
    const entryType = entryTypes[entryHash];
    if (!entryTypeCount[entryType]) entryTypeCount[entryType] = 0;
    if (!excludedEntryTypes.includes(entryType)) {
      entryNodes.push({
        data: {
          id: entryHash,
          data: entry,
          label: `${entryType}${entryTypeCount[entryType]}`,
        },
        classes: [entryType] as string[],
      });

      if (showEntryContents) {
        const content = shortenStrRec(entry.content);
        if (typeof content === 'object') {
          const properties = Object.keys(entry.content);
          for (const property of properties) {
            const propertyParentId = `${entryHash}:${property}`;
            entryNodes.push({
              data: {
                id: propertyParentId,
                parent: entryHash,
              },
            });
            entryNodes.push({
              data: {
                id: `${propertyParentId}:key`,
                label: property,
                parent: propertyParentId,
              },
            });
            entryNodes.push({
              data: {
                id: `${propertyParentId}:value`,
                label: content[property],
                parent: propertyParentId,
              },
            });
          }
        } else {
          entryNodes.push({
            data: {
              id: `${entryHash}:content`,
              label: content,
              parent: entryHash,
            },
          });
        }
      }

      // Get implicit links from the entry

      if (getAppEntryType(newEntryHeader.header.content.entry_type)) {
        const implicitLinks = getImplicitLinks(
          Object.keys(details),
          entry.content
        );

        for (const implicitLink of implicitLinks) {
          if (!excludedEntryTypes.includes(entryTypes[implicitLink.target])) {
            linksEdges.push({
              data: {
                id: `${entryHash}->${implicitLink.target}`,
                source: entryHash,
                target: implicitLink.target,
                label: implicitLink.label,
              },
              classes: ['implicit'],
            });
          }
        }
      }

      // Get the explicit links from the entry
      const linksResponses = links[entryHash];

      if (linksResponses) {
        const links = getLiveLinks(linksResponses);

        for (const link of links) {
          const tag =
            !link.tag || typeof link.tag === 'string'
              ? link.tag
              : JSON.stringify(link.tag);
          const target = link.target;

          if (!excludedEntryTypes.includes(entryTypes[target])) {
            const edgeData = {
              data: {
                id: `${entryHash}->${target}`,
                source: entryHash,
                target,
              },
              classes: ['explicit'],
            };
            if (tag) {
              edgeData.data['label'] = tag;
            }
            linksEdges.push(edgeData);
          }
        }
      }

      // Get the updates edges for the entry
      const updateHeaders = detail.headers.filter(
        (h) =>
          (h.header.content as Update).original_header_address &&
          (h.header.content as Update).original_entry_address === entryHash
      ) as SignedHeaderHashed<Update>[];
      for (const update of updateHeaders) {
        const strUpdateEntryHash = update.header.content.entry_hash;
        linksEdges.push({
          data: {
            id: `${entryHash}-updated-by-${strUpdateEntryHash}`,
            source: entryHash,
            target: strUpdateEntryHash,
            label: 'updated by',
          },
          classes: ['update-edge'],
        });
      }

      // Add deleted class if is deleted
      const node = entryNodes.find((node) => node.data.id === entryHash);

      if (detail.updates.length > 0) {
        node.classes.push('updated');
      }
      if (detail.deletes.length > 0) {
        node.classes.push('deleted');
      }
    }
    entryTypeCount[entryType] += 1;
  }

  return {
    entries: [...entryNodes, ...linksEdges],
    entryTypes: Object.keys(entryTypeCount),
  };
}

export function getImplicitLinks(
  allEntryIds: string[],
  value: any
): Array<{ label: string; target: string }> {
  if (!value) return [];
  if (typeof value === 'string') {
    return allEntryIds.includes(value)
      ? [{ label: undefined, target: value }]
      : [];
  }
  if (
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === 'string'
  ) {
    return value
      .filter((v) => allEntryIds.includes(v))
      .map((v) => ({ target: v, label: undefined }));
  }
  if (typeof value === 'object') {
    const values = Object.entries(value).map(([key, v]) => {
      const implicitLinks = getImplicitLinks(allEntryIds, v);
      for (const implicitLink of implicitLinks) {
        if (!implicitLink.label) {
          implicitLink.label = key;
        }
      }
      return implicitLinks;
    });
    return [].concat(...values);
  }
  return [];
}

/** Helper functions  */

function sortEntries(
  entryHashes: string[],
  details: Dictionary<EntryDetails>
): string[] {
  return entryHashes.sort((keyA, keyB) => compareEntries(details, keyA, keyB));
}

function compareHeader(
  headerA: SignedHeaderHashed,
  headerB: SignedHeaderHashed
) {
  return (
    timestampToMillis(headerA.header.content.timestamp) -
    timestampToMillis(headerB.header.content.timestamp)
  );
}

function compareEntries(
  details: Dictionary<EntryDetails>,
  hashA: string,
  hashB: string
) {
  const headersA: SignedHeaderHashed[] = Object.values(
    details[hashA].headers
  ).sort(compareHeader) as SignedHeaderHashed[];
  const headersB: SignedHeaderHashed[] = Object.values(
    details[hashB].headers
  ).sort(compareHeader) as SignedHeaderHashed[];
  return headersA.length > 0
    ? timestampToMillis(headersA[0].header.content.timestamp)
    : 0 - headersB.length > 0
    ? timestampToMillis(headersB[0].header.content.timestamp)
    : 0;
}
