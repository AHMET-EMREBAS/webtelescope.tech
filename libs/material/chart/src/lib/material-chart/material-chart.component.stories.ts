import type { Meta, StoryObj } from '@storybook/angular';
import { MaterialChartComponent } from './material-chart.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<MaterialChartComponent> = {
  component: MaterialChartComponent,
  title: 'MaterialChartComponent',
};
export default meta;
type Story = StoryObj<MaterialChartComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/material-chart works!/gi)).toBeTruthy();
  },
};
