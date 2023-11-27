import type { Meta, StoryObj } from '@storybook/angular';
import { NavigationComponent } from './navigation.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<NavigationComponent> = {
  component: NavigationComponent,
  title: 'NavigationComponent',
};
export default meta;
type Story = StoryObj<NavigationComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/navigation works!/gi)).toBeTruthy();
  },
};
