import { html, TemplateResult } from 'lit-html';
import '../holochain-playground-blockly.js';

export default {
  title: 'HolochainPlaygroundBlockly',
  component: 'holochain-playground-blockly',
  argTypes: {
    title: { control: 'text' },
    counter: { control: 'number' },
    textColor: { control: 'color' },
  },
};

const Template = ({
  title = 'Hello world',
  counter = 5,
  textColor,
  slot,
}) => html` <holochain-playground-blockly> </holochain-playground-blockly> `;

export const Regular = Template.bind({});

export const CustomTitle = Template.bind({});
CustomTitle.args = {
  title: 'My title',
};

export const CustomCounter = Template.bind({});
CustomCounter.args = {
  counter: 123456,
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
  slot: html`<p>Slotted content</p>`,
};
SlottedContent.argTypes = {
  slot: { table: { disable: true } },
};
