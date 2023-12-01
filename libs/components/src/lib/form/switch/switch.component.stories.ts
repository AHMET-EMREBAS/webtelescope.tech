import type { Meta, StoryObj } from '@storybook/angular';
import { SwitchComponent } from './switch.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SwitchComponent> = {
  component: SwitchComponent,
  title: 'SwitchComponent',
};
export default meta;
type Story = StoryObj<SwitchComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/switch works!/gi)).toBeTruthy();
  },
};
