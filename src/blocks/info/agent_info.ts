import { PUB_KEY, colour } from '../types';

export const agentInfo = {
  type: 'agent_info.agent_latest_pubkey',
  message0: 'agent_info.agent_latest_pubkey',
  args0: [],
  inputsInline: true,
  output: PUB_KEY,
  colour,
  tooltip: 'Returns number of letters in the provided text.',
  helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
};

export function defineAgentInfo(blockly: any) {
  blockly.defineBlocksWithJsonArray([agentInfo]);
  blockly.JavaScript['agent_info.agent_latest_pubkey'] = function () {
    return [
      `(await hdk.agent_info()).agent_latest_pubkey`,
      blockly.JavaScript.ORDER_FUNCTION_CALL,
    ];
  };
}
