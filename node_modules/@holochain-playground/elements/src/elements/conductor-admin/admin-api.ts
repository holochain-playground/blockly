import { Conductor } from '@holochain-playground/core';
import { html } from 'lit';
import { PlaygroundElement } from '../../base/playground-element';
import { CallableFn } from '../helpers/call-functions';

export function adminApi(
  element: PlaygroundElement,
  conductor: Conductor
): CallableFn[] {
  const installedAppIds = Object.keys(conductor.installedHapps);
  return [
    {
      name: 'Clone DNA',
      args: [
        {
          name: 'installedAppId',
          field: 'custom',
          required: true,
          render(args, setValue) {
            return html`<mwc-select
              outlined
              label="Select Happ"
              .value=${args['installedAppId']}
              @selected=${(e) => setValue(installedAppIds[e.detail.index])}
            >
              ${installedAppIds.map(
                (installedAppId) =>
                  html`<mwc-list-item .value=${installedAppId}
                    >${installedAppId}</mwc-list-item
                  >`
              )}
            </mwc-select>`;
          },
        },
        {
          name: 'slotNick',
          field: 'custom',
          required: true,
          render(args, setValue) {
            const slotNicks = args.installedAppId
              ? Object.keys(conductor.installedHapps[args.installedAppId].slots)
              : [];
            return html`<mwc-select
              outlined
              label="Select DNA Slot"
              .value=${args['slotNick']}
              @selected=${(e) => setValue(slotNicks[e.detail.index])}
            >
              ${slotNicks.map(
                (nick) =>
                  html`<mwc-list-item .value=${nick}>${nick}</mwc-list-item>`
              )}
            </mwc-select>`;
          },
        },
        { name: 'uid', field: 'textfield', type: 'String' },
        {
          name: 'properties',
          field: 'custom',
          render(args, setValue) {
            const properties = args['properties'] || {};

            const propertyNames = args['slotNick']
              ? Object.keys(
                  conductor.registeredDnas[
                    conductor.installedHapps[args.installedAppId].slots[
                      args.slotNick
                    ].base_cell_id[0]
                  ].properties
                )
              : [];
            return html`<div class="column">
              <span>Properties</span>
              ${args['slotNick']
                ? propertyNames.length === 0
                  ? html`<span style="margin-top: 4px;" class="placeholder"
                      >This DNA has no properties</span
                    >`
                  : html`
                      ${propertyNames.map(
                        (property) => html`<mwc-textfield
                          style="margin-top: 8px"
                          outlined
                          label=${property}
                          .value=${properties[property] || ''}
                          @input=${(e) =>
                            setValue({
                              ...properties,
                              [property]: e.target.value,
                            })}
                        ></mwc-textfield>`
                      )}
                    `
                : html`<span style="margin-top: 4px;" class="placeholder"
                    >Select a slot</span
                  >`}
            </div>`;
          },
        },
        { name: 'membraneProof', field: 'textfield', type: 'String' },
      ],
      call: async (args) => {
        try {
          const cell = await conductor.cloneCell(
            args.installedAppId,
            args.slotNick,
            args.uid,
            args.properties,
            args.membraneProof
          );

          element.updatePlayground({
            activeDna: cell.dnaHash,
            activeAgentPubKey: cell.agentPubKey,
          });
        } catch (e) {
          element.showMessage(`Error: ${e.message}`);
        }
      },
    },
  ];
}
