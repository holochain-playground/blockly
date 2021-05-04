import { SimulatedDna, SimulatedHappBundle } from '@holochain-playground/core';

export { EditZome } from './elements/edit-zome';
export { DnaCode } from './elements/dna-code';

export const demoHapp: SimulatedHappBundle = {
  name: 'hi',
  description: '',
  slots: {
    default: {
      deferred: false,
      dna: {
        properties: {},
        uid: '',
        zomes: [
          {
            name: 'demo_entries',
            entry_defs: [{ id: 'sample_entry', visibility: 'Public' }],
            blocklyCode:
              '<xml xmlns="https://developers.google.com/blockly/xml"><variables><variable id="_?2#8+sn=^`fqd%E/Ffz">hash</variable><variable id="}+4NT8PIh-H~3?/]i:pq">contents</variable></variables><block type="entry_defs" id="Jjc~6G6Ezu-d^-@em_yh" x="115" y="28"><mutation xmlns="http://www.w3.org/1999/xhtml" items="1"></mutation><value name="ADD0"><block type="entry_def" id=":we9$r=tpV.ce6FC0$a@"><field name="ENTRY_DEF_ID">sample_entry</field><field name="PUBLIC">TRUE</field></block></value></block><block type="procedures_defreturn" id="M}4W;Z$EW[%Js=y4-XWx" x="208" y="111"><mutation><arg name="hash" varid="_?2#8+sn=^`fqd%E/Ffz"></arg></mutation><field name="NAME">get</field><comment pinned="false" h="80" w="160">Describe this function...</comment><value name="RETURN"><block type="get" id=";rtPS/KcSZp8;VN{1uKM"><value name="HASH"><block type="variables_get" id=")BCBF(.]MvZh6-XA]Y1*"><field name="VAR" id="_?2#8+sn=^`fqd%E/Ffz">hash</field></block></value></block></value></block><block type="procedures_defreturn" id="l-jj!v]JU[3gtFFrKl{)" x="118" y="256"><mutation><arg name="contents" varid="}+4NT8PIh-H~3?/]i:pq"></arg></mutation><field name="NAME">create_entry</field><comment pinned="false" h="80" w="160">Describe this function...</comment><statement name="STACK"><block type="create_entry" id=":Sgxw5iCag?!f,R$yHK5"><value name="ENTRY"><block type="new sample_entry" id="Vxav^_6z|in9trwJmorD"><value name="CONTENT"><block type="variables_get" id="a3-sS1)%cGR`5q4VuB:E"><field name="VAR" id="}+4NT8PIh-H~3?/]i:pq">contents</field></block></value></block></value></block></statement><value name="RETURN"><block type="hash_entry" id="@yEoC$H__6#Ql:m6%FBg"><value name="ENTRY"><block type="new sample_entry" id="IF[Lz57}#@!b3z/~-A6O"><value name="CONTENT"><block type="variables_get" id="wc1vbieNkjxWJ21[E;?z"><field name="VAR" id="}+4NT8PIh-H~3?/]i:pq">contents</field></block></value></block></value></block></value></block></xml>',

            validation_functions: {},
            zome_functions: {
              create_entry: {
                call: ({ hash_entry, create_entry }) => async ({ content }) => {
                  await create_entry({ content, entry_def_id: 'sample_entry' });
                  return hash_entry({ content });
                },
                arguments: [{ name: 'content', type: 'any' }],
              },
              get: {
                call: ({ get }) => ({ hash }) => get(hash),
                arguments: [{ name: 'hash', type: 'any' }],
              },
            },
          },
        ],
      },
    },
  },
};
