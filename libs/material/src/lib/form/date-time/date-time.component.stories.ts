import type { Meta, StoryObj } from '@storybook/angular';
import { DateTimeComponent } from './date-time.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<DateTimeComponent> = {
  component: DateTimeComponent,
  title: 'DateTimeComponent',
};
export default meta;
type Story = StoryObj<DateTimeComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/date-time works!/gi)).toBeTruthy();
  },
};
