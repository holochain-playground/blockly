import { SimulatedZome } from '@holochain-playground/core';
import { importZomeFromCode } from './importZomeCode';

export async function buildZome(
  blockly: any,
  blocklyWorkspace: any,
  zomeName: string
): Promise<SimulatedZome> {
  const code = blockly.JavaScript.workspaceToCode(blocklyWorkspace);
  const zome_functions = await importZomeFromCode(code);

  const blocklyCode = blockly.Xml.domToText(
    blockly.Xml.workspaceToDom(blocklyWorkspace)
  );
  return {
    name: zomeName,
    entry_defs: [
      {
        id: 'sample',
        visibility: 'Public',
      },
    ],
    zome_functions,
    blocklyCode,
  };
}
