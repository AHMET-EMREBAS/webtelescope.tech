import type { Meta, StoryObj } from '@storybook/angular';
import { ChartComponent } from './chart.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ChartComponent> = {
  component: ChartComponent,
  title: 'ChartComponent',
};
export default meta;
type Story = StoryObj<ChartComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/chart works!/gi)).toBeTruthy();
  },
};
