import {
  Dictionary,
  Hash,
  Header,
  getSysMetaValHeaderHash,
  LinkMetaVal,
  EntryDhtStatus,
  EntryDetails,
  NewEntryHeader,
  SignedHeaderHashed,
  DHTOpType,
  Update,
  Delete,
  CreateLink,
  DeleteLink,
  HeaderType,
  Create,
} from '@holochain-open-dev/core-types';
import { isEqual, uniq } from 'lodash-es';
import { GetLinksResponse, Link } from '../cascade/types';
import {
  CellState,
  ValidationLimboStatus,
  ValidationLimboValue,
  IntegrationLimboValue,
} from '../state';

export function getValidationLimboDhtOps(
  state: CellState,
  status: ValidationLimboStatus
): Dictionary<ValidationLimboValue> {
  const pendingDhtOps: Dictionary<ValidationLimboValue> = {};

  for (const dhtOpHash of Object.keys(state.validationLimbo)) {
    const limboValue = state.validationLimbo[dhtOpHash];

    if (limboValue.status === status) {
      pendingDhtOps[dhtOpHash] = limboValue;
    }
  }

  return pendingDhtOps;
}

export function pullAllIntegrationLimboDhtOps(
  state: CellState
): Dictionary<IntegrationLimboValue> {
  const dhtOps = state.integrationLimbo;

  state.integrationLimbo = {};

  return dhtOps;
}

export function getHeadersForEntry(
  state: CellState,
  entryHash: Hash
): SignedHeaderHashed[] {
  const entryMetadata = state.metadata.system_meta[entryHash];
  if (!entryMetadata) return [];

  return entryMetadata
    .map(h => {
      const hash = getSysMetaValHeaderHash(h);
      if (hash) {
        return state.CAS[hash];
      }
      return undefined;
    })
    .filter(header => !!header);
}

export function getEntryDhtStatus(
  state: CellState,
  entryHash: Hash
): EntryDhtStatus | undefined {
  const meta = state.metadata.misc_meta[entryHash];

  return meta
    ? (meta as {
        EntryStatus: EntryDhtStatus;
      }).EntryStatus
    : undefined;
}

export function getEntryDetails(
  state: CellState,
  entry_hash: Hash
): EntryDetails {
  const entry = state.CAS[entry_hash];
  const allHeaders = getHeadersForEntry(state, entry_hash);
  const dhtStatus = getEntryDhtStatus(state, entry_hash);

  const live_headers: Dictionary<SignedHeaderHashed<Create>> = {};
  const updates: Dictionary<SignedHeaderHashed<Update>> = {};
  const deletes: Dictionary<SignedHeaderHashed<Delete>> = {};

  for (const header of allHeaders) {
    const headerContent = (header as SignedHeaderHashed).header.content;

    if (
      (headerContent as Update).original_entry_address &&
      (headerContent as Update).original_entry_address === entry_hash
    ) {
      updates[header.header.hash] = header as SignedHeaderHashed<Update>;
    } else if (
      (headerContent as Create).entry_hash &&
      (headerContent as Create).entry_hash === entry_hash
    ) {
      live_headers[header.header.hash] = header as SignedHeaderHashed<Create>;
    } else if ((headerContent as Delete).deletes_entry_address === entry_hash) {
      deletes[header.header.hash] = header as SignedHeaderHashed<Delete>;
    }
  }

  return {
    entry,
    headers: allHeaders,
    entry_dht_status: dhtStatus as EntryDhtStatus,
    updates: Object.values(updates),
    deletes: Object.values(deletes),
    rejected_headers: [], // TODO: after validation is implemented
  };
}

export function getHeaderModifiers(
  state: CellState,
  headerHash: Hash
): {
  updates: SignedHeaderHashed<Update>[];
  deletes: SignedHeaderHashed<Delete>[];
} {
  const allModifiers = state.metadata.system_meta[headerHash];
  if (!allModifiers)
    return {
      updates: [],
      deletes: [],
    };

  const updates = allModifiers
    .filter(m => (m as { Update: Hash }).Update)
    .map(m => state.CAS[(m as { Update: Hash }).Update]);
  const deletes = allModifiers
    .filter(m => (m as { Delete: Hash }).Delete)
    .map(m => state.CAS[(m as { Delete: Hash }).Delete]);

  return {
    updates,
    deletes,
  };
}

export function getAllHeldEntries(state: CellState): Hash[] {
  const newEntryHeaders = Object.values(state.integratedDHTOps)
    .filter(dhtOpValue => dhtOpValue.op.type === DHTOpType.StoreEntry)
    .map(dhtOpValue => dhtOpValue.op.header);

  const allEntryHashes = newEntryHeaders.map(
    h => (h.header.content as NewEntryHeader).entry_hash
  );

  return uniq(allEntryHashes);
}

export function getAllAuthoredEntries(state: CellState): Hash[] {
  const allHeaders = Object.values(state.authoredDHTOps).map(
    dhtOpValue => dhtOpValue.op.header
  );

  const newEntryHeaders: SignedHeaderHashed<NewEntryHeader>[] = allHeaders.filter(
    h => (h.header.content as NewEntryHeader).entry_hash
  ) as SignedHeaderHashed<NewEntryHeader>[];

  return newEntryHeaders.map(h => h.header.content.entry_hash);
}

export function isHoldingEntry(state: CellState, entryHash: Hash): boolean {
  return state.metadata.system_meta[entryHash] !== undefined;
}

export function isHoldingElement(state: CellState, headerHash: Hash): boolean {
  return state.metadata.misc_meta[headerHash] === 'StoreElement';
}

export interface EntryDHTInfo {
  details: EntryDetails;
  links: LinkMetaVal[];
}

export function getDhtShard(state: CellState): Dictionary<EntryDHTInfo> {
  const heldEntries = getAllHeldEntries(state);

  const dhtShard: Dictionary<EntryDHTInfo> = {};

  for (const entryHash of heldEntries) {
    dhtShard[entryHash] = {
      details: getEntryDetails(state, entryHash),
      links: getCreateLinksForEntry(state, entryHash),
    };
  }

  return dhtShard;
}

export function getLinksForEntry(
  state: CellState,
  entryHash: Hash
): GetLinksResponse {
  const linkMetaVals = getCreateLinksForEntry(state, entryHash);

  const link_adds: SignedHeaderHashed<CreateLink>[] = [];
  const link_removes: SignedHeaderHashed<DeleteLink>[] = [];

  for (const value of linkMetaVals) {
    const header = state.CAS[value.link_add_hash];

    if (header) {
      link_adds.push(header);
    }

    const removes = getRemovesOnLinkAdd(state, value.link_add_hash);

    for (const remove of removes) {
      const removeHeader = state.CAS[remove];
      link_removes.push(removeHeader);
    }
  }

  return {
    link_adds,
    link_removes,
  };
}

export function getCreateLinksForEntry(
  state: CellState,
  entryHash: Hash
): LinkMetaVal[] {
  return state.metadata.link_meta
    .filter(({ key, value }) => isEqual(key.base, entryHash))
    .map(({ key, value }) => value);
}

export function getRemovesOnLinkAdd(
  state: CellState,
  link_add_hash: Hash
): Hash[] {
  const metadata = state.metadata.system_meta[link_add_hash];

  if (!metadata) return [];

  const removes: Hash[] = [];
  for (const val of metadata) {
    if ((val as { DeleteLink: Hash }).DeleteLink) {
      removes.push((val as { DeleteLink: Hash }).DeleteLink);
    }
  }
  return removes;
}

export function getLiveLinks(
  getLinksResponses: Array<GetLinksResponse>
): Array<Link> {
  // Map and flatten adds
  const linkAdds: Dictionary<CreateLink | undefined> = {};
  for (const responses of getLinksResponses) {
    for (const linkAdd of responses.link_adds) {
      linkAdds[linkAdd.header.hash] = linkAdd.header.content;
    }
  }

  for (const responses of getLinksResponses) {
    for (const linkRemove of responses.link_removes) {
      const removedAddress = linkRemove.header.content.link_add_address;
      if (linkAdds[removedAddress]) linkAdds[removedAddress] = undefined;
    }
  }

  const resultingLinks: Link[] = [];

  for (const liveLink of Object.values(linkAdds)) {
    if (liveLink)
      resultingLinks.push({
        base: liveLink.base_address,
        target: liveLink.target_address,
        tag: liveLink.tag,
      });
  }

  return resultingLinks;
}

export function computeDhtStatus(
  allHeadersForEntry: SignedHeaderHashed[]
): {
  entry_dht_status: EntryDhtStatus;
  rejected_headers: SignedHeaderHashed[];
} {
  const aliveHeaders: Dictionary<SignedHeaderHashed | undefined> = {};
  const rejected_headers: SignedHeaderHashed[] = [];

  for (const header of allHeadersForEntry) {
    if (header.header.content.type === HeaderType.Create) {
      aliveHeaders[header.header.hash] = header;
    }
  }

  for (const header of allHeadersForEntry) {
    if (
      header.header.content.type === HeaderType.Update ||
      header.header.content.type === HeaderType.Delete
    ) {
      if (aliveHeaders[header.header.hash])
        rejected_headers.push(
          aliveHeaders[header.header.hash] as SignedHeaderHashed
        );
      aliveHeaders[header.header.hash] = undefined;
    }
  }

  const isSomeHeaderAlive = Object.values(aliveHeaders).some(
    header => header !== undefined
  );

  // TODO: add more cases
  const entry_dht_status = isSomeHeaderAlive
    ? EntryDhtStatus.Live
    : EntryDhtStatus.Dead;

  return {
    entry_dht_status,
    rejected_headers,
  };
}
