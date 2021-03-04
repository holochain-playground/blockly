/* eslint-disable */
import { colour, ENTRY_DEF } from '../types';

const entryDef = {
  type: 'entry_def',
  message0: 'entry_def id %1 public %2',
  args0: [
    {
      type: 'field_input',
      name: 'ENTRY_DEF_ID',
      check: 'String',
    },
    {
      type: 'field_checkbox',
      name: 'PUBLIC',
      checked: true,
    },
  ],
  colour,
  output: ENTRY_DEF,
  tooltip: 'Creates a new entry with the given entry_def_id and content',
  helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
};

export function defineEntryDefs(blockly: any) {
  blockly.Blocks.entry_defs = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init() {
      this.setHelpUrl(blockly.Msg.LISTS_CREATE_WITH_HELPURL);
      this.setColour(colour);
      this.itemCount_ = 1;
      this.updateShape_();
      this.setMutator(new blockly.Mutator(['lists_create_with_item']));
      this.setTooltip('Entry definitions for this zome');
    },
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom() {
      const container = document.createElement('mutation');
      container.setAttribute('items', this.itemCount_);
      return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation(xmlElement: any) {
      this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
      this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose(workspace: any) {
      const containerBlock = workspace.newBlock('lists_create_with_container');
      containerBlock.initSvg();
      let connection = containerBlock.getInput('STACK').connection;
      for (let i = 0; i < this.itemCount_; i++) {
        const itemBlock = workspace.newBlock('lists_create_with_item');
        itemBlock.initSvg();
        connection.connect(itemBlock.previousConnection);
        connection = itemBlock.nextConnection;
      }
      return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose(containerBlock: any) {
      let itemBlock = containerBlock.getInputTargetBlock('STACK');
      // Count number of inputs.
      const connections = [];
      while (itemBlock) {
        connections.push(itemBlock.valueConnection_);
        itemBlock =
          itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
      }
      // Disconnect any children that don't belong.
      for (var i = 0; i < this.itemCount_; i++) {
        const connection = this.getInput(`ADD${i}`).connection.targetConnection;
        if (connection && connections.indexOf(connection) == -1) {
          connection.disconnect();
        }
      }
      this.itemCount_ = connections.length;
      this.updateShape_();
      // Reconnect any child blocks.
      for (var i = 0; i < this.itemCount_; i++) {
        blockly.Mutator.reconnect(connections[i], this, `ADD${i}`);
      }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections(containerBlock: any) {
      let itemBlock = containerBlock.getInputTargetBlock('STACK');
      let i = 0;
      while (itemBlock) {
        const input = this.getInput(`ADD${i}`);
        itemBlock.valueConnection_ = input && input.connection.targetConnection;
        i++;
        itemBlock =
          itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
      }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_() {
      if (this.itemCount_ && this.getInput('EMPTY')) {
        this.removeInput('EMPTY');
      } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
        this.appendDummyInput('EMPTY').appendField(
          blockly.Msg.LISTS_CREATE_EMPTY_TITLE
        );
      }
      // Add new inputs.
      for (var i = 0; i < this.itemCount_; i++) {
        if (!this.getInput(`ADD${i}`)) {
          const input = this.appendValueInput(`ADD${i}`).setCheck(ENTRY_DEF);
          if (i == 0) {
            input.appendField('entry_defs');
          }
        }
      }
      // Remove deleted inputs.
      while (this.getInput(`ADD${i}`)) {
        this.removeInput(`ADD${i}`);
        i++;
      }
    },
  };
  blockly.defineBlocksWithJsonArray([entryDef]);

  blockly.JavaScript.entry_def = function (block: any) {
    const entry_def_id = block.getFieldValue('ENTRY_DEF_ID');
    const entryDefPublic = block.getFieldValue('PUBLIC');
    console.log('hey');

    return [
      `{id: "${entry_def_id}", visibility: "${
        entryDefPublic ? 'Public' : 'Private'
      }"}`,
      blockly.JavaScript.ORDER_FUNCTION_CALL,
    ];
  };
  blockly.JavaScript.entry_defs = function (block: any) {
    // Create a list with any number of elements of any type.
    const elements = new Array(block.itemCount_);
    for (let i = 0; i < block.itemCount_; i++) {
      elements[i] =
        blockly.JavaScript.valueToCode(
          block,
          `ADD${i}`,
          blockly.JavaScript.ORDER_NONE
        ) || 'null';
    }
    const code = `export const entry_defs = [${elements.join(', ')}]`;
    return code;
  };
}
