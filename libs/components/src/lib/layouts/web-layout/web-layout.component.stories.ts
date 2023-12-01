import type { Meta, StoryObj } from '@storybook/angular';
import { WebLayoutComponent } from './web-layout.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<WebLayoutComponent> = {
  component: WebLayoutComponent,
  title: 'WebLayoutComponent',
};
export default meta;
type Story = StoryObj<WebLayoutComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/web-layout works!/gi)).toBeTruthy();
  },
};
