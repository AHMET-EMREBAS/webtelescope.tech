import type { Meta, StoryObj } from '@storybook/angular';
import { MobileLayoutComponent } from './mobile-layout.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<MobileLayoutComponent> = {
  component: MobileLayoutComponent,
  title: 'MobileLayoutComponent',
};
export default meta;
type Story = StoryObj<MobileLayoutComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/mobile-layout works!/gi)).toBeTruthy();
  },
};
