import type { Meta, StoryObj } from '@storybook/angular';
import { PhoneComponent } from './phone.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<PhoneComponent> = {
  component: PhoneComponent,
  title: 'PhoneComponent',
};
export default meta;
type Story = StoryObj<PhoneComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/phone works!/gi)).toBeTruthy();
  },
};
