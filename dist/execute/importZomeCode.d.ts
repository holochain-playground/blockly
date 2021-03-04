import { Dictionary } from '@holochain-open-dev/core-types';
import { SimulatedZomeFunction } from '@holochain-playground/core';
export declare function importZomeFromCode(code: string): Promise<{
    zome_functions: Dictionary<SimulatedZomeFunction>;
    entry_defs: any[];
}>;
