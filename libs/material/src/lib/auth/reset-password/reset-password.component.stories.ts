import type { Meta, StoryObj } from '@storybook/angular';
import { ResetPasswordComponent } from './reset-password.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ResetPasswordComponent> = {
  component: ResetPasswordComponent,
  title: 'ResetPasswordComponent',
};
export default meta;
type Story = StoryObj<ResetPasswordComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/reset-password works!/gi)).toBeTruthy();
  },
};
