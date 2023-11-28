import type { Meta, StoryObj } from '@storybook/angular';
import { SampleFormComponent } from './sample-form.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SampleFormComponent> = {
  component: SampleFormComponent,
  title: 'SampleFormComponent',
};
export default meta;
type Story = StoryObj<SampleFormComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/sample-form works!/gi)).toBeTruthy();
  },
};
