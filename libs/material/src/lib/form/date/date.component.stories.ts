import type { Meta, StoryObj } from '@storybook/angular';
import { DateComponent } from './date.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<DateComponent> = {
  component: DateComponent,
  title: 'DateComponent',
};
export default meta;
type Story = StoryObj<DateComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/date works!/gi)).toBeTruthy();
  },
};
