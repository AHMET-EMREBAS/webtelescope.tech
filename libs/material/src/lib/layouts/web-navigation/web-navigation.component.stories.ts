import type { Meta, StoryObj } from '@storybook/angular';
import { WebNavigationComponent } from './web-navigation.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<WebNavigationComponent> = {
  component: WebNavigationComponent,
  title: 'WebNavigationComponent',
};
export default meta;
type Story = StoryObj<WebNavigationComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/web-navigation works!/gi)).toBeTruthy();
  },
};
