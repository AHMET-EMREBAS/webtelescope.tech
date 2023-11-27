import type { Meta, StoryObj } from '@storybook/angular';
import { WebsiteComponent } from './website.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<WebsiteComponent> = {
  component: WebsiteComponent,
  title: 'WebsiteComponent',
};
export default meta;
type Story = StoryObj<WebsiteComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/website works!/gi)).toBeTruthy();
  },
};
