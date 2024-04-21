import type { Meta, StoryObj } from '@storybook/angular';
import { ViewportComponent } from './viewport.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ViewportComponent> = {
  component: ViewportComponent,
  title: 'ViewportComponent',
};
export default meta;
type Story = StoryObj<ViewportComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/viewport works!/gi)).toBeTruthy();
  },
};
