import type { Meta, StoryObj } from '@storybook/angular';
import { FormInputComponent } from './form-input.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<FormInputComponent> = {
  component: FormInputComponent,
  title: 'FormInputComponent',
};
export default meta;
type Story = StoryObj<FormInputComponent>;

export const Primary: Story = {
  args: {
    componentType: 'text-input',
  },
};

export const Heading: Story = {
  args: {
    componentType: 'text-input',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/form-input works!/gi)).toBeTruthy();
  },
};
