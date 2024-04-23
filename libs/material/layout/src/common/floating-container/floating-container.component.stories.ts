import type { Meta, StoryObj } from '@storybook/angular';
import { FloatingContainerComponent } from './floating-container.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<FloatingContainerComponent> = {
  component: FloatingContainerComponent,
  title: 'FloatingContainerComponent',
};
export default meta;
type Story = StoryObj<FloatingContainerComponent>;

export const Primary: Story = {
  args: {
    testing: false,
  },
};

export const Heading: Story = {
  args: {
    testing: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/floating-container works!/gi)).toBeTruthy();
  },
};
