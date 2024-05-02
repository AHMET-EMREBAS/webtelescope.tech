import type { Meta, StoryObj } from '@storybook/angular';
import { MaterialFormsComponent } from './material-forms.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<MaterialFormsComponent> = {
  component: MaterialFormsComponent,
  title: 'MaterialFormsComponent',
};
export default meta;
type Story = StoryObj<MaterialFormsComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/material-forms works!/gi)).toBeTruthy();
  },
};
