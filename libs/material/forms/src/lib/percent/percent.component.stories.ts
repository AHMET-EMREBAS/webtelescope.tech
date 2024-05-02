import type { Meta, StoryObj } from '@storybook/angular';
import { PercentComponent } from './percent.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<PercentComponent> = {
  component: PercentComponent,
  title: 'PercentComponent',
};
export default meta;
type Story = StoryObj<PercentComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/percent works!/gi)).toBeTruthy();
  },
};
