import type { Meta, StoryObj } from '@storybook/angular';
import { MobileNavigationComponent } from './mobile-navigation.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<MobileNavigationComponent> = {
  component: MobileNavigationComponent,
  title: 'MobileNavigationComponent',
};
export default meta;
type Story = StoryObj<MobileNavigationComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/mobile-navigation works!/gi)).toBeTruthy();
  },
};
