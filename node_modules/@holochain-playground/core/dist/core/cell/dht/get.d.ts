import { Dictionary, Hash, LinkMetaVal, EntryDhtStatus, EntryDetails, SignedHeaderHashed, Update, Delete, ValidationReceipt } from '@holochain-open-dev/core-types';
import { GetLinksResponse, Link } from '../cascade/types';
import { CellState, ValidationLimboStatus, ValidationLimboValue, IntegrationLimboValue, IntegratedDhtOpsValue } from '../state';
export declare function getValidationLimboDhtOps(state: CellState, statuses: ValidationLimboStatus[]): Dictionary<ValidationLimboValue>;
export declare const getValidationReceipts: (dhtOpHash: Hash) => (state: CellState) => ValidationReceipt[];
export declare function pullAllIntegrationLimboDhtOps(state: CellState): Dictionary<IntegrationLimboValue>;
export declare function getHeadersForEntry(state: CellState, entryHash: Hash): SignedHeaderHashed[];
export declare function getEntryDhtStatus(state: CellState, entryHash: Hash): EntryDhtStatus | undefined;
export declare function getEntryDetails(state: CellState, entry_hash: Hash): EntryDetails;
export declare function getHeaderModifiers(state: CellState, headerHash: Hash): {
    updates: SignedHeaderHashed<Update>[];
    deletes: SignedHeaderHashed<Delete>[];
};
export declare function getAllHeldEntries(state: CellState): Hash[];
export declare function getAllHeldHeaders(state: CellState): Hash[];
export declare function getAllAuthoredEntries(state: CellState): Hash[];
export declare function isHoldingEntry(state: CellState, entryHash: Hash): boolean;
export declare function isHoldingElement(state: CellState, headerHash: Hash): boolean;
export declare function isHoldingDhtOp(state: CellState, dhtOpHash: Hash): boolean;
export interface EntryDHTInfo {
    details: EntryDetails;
    links: LinkMetaVal[];
}
export declare function getDhtShard(state: CellState): Dictionary<EntryDHTInfo>;
export declare function getLinksForEntry(state: CellState, entryHash: Hash): GetLinksResponse;
export declare function getCreateLinksForEntry(state: CellState, entryHash: Hash): LinkMetaVal[];
export declare function getRemovesOnLinkAdd(state: CellState, link_add_hash: Hash): Hash[];
export declare function getLiveLinks(getLinksResponses: Array<GetLinksResponse>): Array<Link>;
export declare function computeDhtStatus(allHeadersForEntry: SignedHeaderHashed[]): {
    entry_dht_status: EntryDhtStatus;
    rejected_headers: SignedHeaderHashed[];
};
export declare function hasDhtOpBeenProcessed(state: CellState, dhtOpHash: Hash): boolean;
export declare function getIntegratedDhtOpsWithoutReceipt(state: CellState): Dictionary<IntegratedDhtOpsValue>;
