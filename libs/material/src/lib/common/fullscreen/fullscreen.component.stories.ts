import type { Meta, StoryObj } from '@storybook/angular';
import { FullscreenComponent } from './fullscreen.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<FullscreenComponent> = {
  component: FullscreenComponent,
  title: 'FullscreenComponent',
};
export default meta;
type Story = StoryObj<FullscreenComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/fullscreen works!/gi)).toBeTruthy();
  },
};
