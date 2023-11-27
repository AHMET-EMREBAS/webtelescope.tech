import type { Meta, StoryObj } from '@storybook/angular';
import { FormComponent } from './form.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<FormComponent> = {
  component: FormComponent,
  title: 'FormComponent',
};
export default meta;
type Story = StoryObj<FormComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/form works!/gi)).toBeTruthy();
  },
};
