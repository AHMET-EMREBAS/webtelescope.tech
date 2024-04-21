import type { Meta, StoryObj } from '@storybook/angular';
import { ContainerComponent } from './container.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ContainerComponent> = {
  component: ContainerComponent,
  title: 'ContainerComponent',
};
export default meta;
type Story = StoryObj<ContainerComponent>;

export const Primary: Story = {
  args: {
    containerType: 'row',
  },
};

export const Heading: Story = {
  args: Primary.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/container works!/gi)).toBeTruthy();
  },
};
