import type { Meta, StoryObj } from '@storybook/angular';
import { RadioComponent } from './radio.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<RadioComponent> = {
  component: RadioComponent,
  title: 'RadioComponent',
};
export default meta;
type Story = StoryObj<RadioComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/radio works!/gi)).toBeTruthy();
  },
};
