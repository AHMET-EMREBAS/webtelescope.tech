import type { Meta, StoryObj } from '@storybook/angular';
import { UsernameComponent } from './username.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<UsernameComponent> = {
  component: UsernameComponent,
  title: 'UsernameComponent',
};
export default meta;
type Story = StoryObj<UsernameComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/username works!/gi)).toBeTruthy();
  },
};
