import type { Meta, StoryObj } from '@storybook/angular';
import { EmailComponent } from './email.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<EmailComponent> = {
  component: EmailComponent,
  title: 'EmailComponent',
};
export default meta;
type Story = StoryObj<EmailComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/email works!/gi)).toBeTruthy();
  },
};
