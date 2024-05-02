import type { Meta, StoryObj } from '@storybook/angular';
import { NumberComponent } from './number.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<NumberComponent> = {
  component: NumberComponent,
  title: 'NumberComponent',
};
export default meta;
type Story = StoryObj<NumberComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/number works!/gi)).toBeTruthy();
  },
};
