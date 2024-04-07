import type { Meta, StoryObj } from '@storybook/angular';
import { SubFormComponent } from './sub';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SubFormComponent> = {
  component: SubFormComponent,
  title: 'SubFormComponent',
};
export default meta;
type Story = StoryObj<SubFormComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/sub works!/gi)).toBeTruthy();
  },
};
