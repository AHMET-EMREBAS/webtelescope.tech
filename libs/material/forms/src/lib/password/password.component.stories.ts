import type { Meta, StoryObj } from '@storybook/angular';
import { PasswordComponent } from './password.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<PasswordComponent> = {
  component: PasswordComponent,
  title: 'PasswordComponent',
};
export default meta;
type Story = StoryObj<PasswordComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/password works!/gi)).toBeTruthy();
  },
};
