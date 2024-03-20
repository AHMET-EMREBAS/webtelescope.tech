import type { Meta, StoryObj } from '@storybook/angular';
import { LoginWithCodeComponent } from './login-with-code.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<LoginWithCodeComponent> = {
  component: LoginWithCodeComponent,
  title: 'LoginWithCodeComponent',
};
export default meta;
type Story = StoryObj<LoginWithCodeComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/login-with-code works!/gi)).toBeTruthy();
  },
};
