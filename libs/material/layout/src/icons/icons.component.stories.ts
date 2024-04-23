import type { Meta, StoryObj } from '@storybook/angular';
import { IconsComponent } from './icons.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<IconsComponent> = {
  component: IconsComponent,
  title: 'IconsComponent',
};
export default meta;
type Story = StoryObj<IconsComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/icons works!/gi)).toBeTruthy();
  },
};
