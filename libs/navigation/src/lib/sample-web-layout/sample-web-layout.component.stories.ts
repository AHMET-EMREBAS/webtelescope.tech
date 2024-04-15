import type { Meta, StoryObj } from '@storybook/angular';
import { SampleWebLayoutComponent } from './sample-web-layout.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SampleWebLayoutComponent> = {
  component: SampleWebLayoutComponent,
  title: 'SampleWebLayoutComponent',
};
export default meta;
type Story = StoryObj<SampleWebLayoutComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/sample-web-layout works!/gi)).toBeTruthy();
  },
};
