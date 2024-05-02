import type { Meta, StoryObj } from '@storybook/angular';
import { ListSelectComponent } from './list-select.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ListSelectComponent> = {
  component: ListSelectComponent,
  title: 'ListSelectComponent',
};
export default meta;
type Story = StoryObj<ListSelectComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/list-select works!/gi)).toBeTruthy();
  },
};
