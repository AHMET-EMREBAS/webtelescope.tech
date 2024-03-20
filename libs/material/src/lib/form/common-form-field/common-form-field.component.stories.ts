import type { Meta, StoryObj } from '@storybook/angular';
import { CommonFormFieldComponent } from './common-form-field.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<CommonFormFieldComponent> = {
  component: CommonFormFieldComponent,
  title: 'CommonFormFieldComponent',
};
export default meta;
type Story = StoryObj<CommonFormFieldComponent>;

export const Primary: Story = {
  args: {
    name: 'name',
    type: 'text',
    label: '',
    defaultValue: '',
    required: false,
    placeholder: '',
    hints: '',
    minLength: 0,
    maxLength: Number.MAX_SAFE_INTEGER,
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
  },
};

export const Heading: Story = {
  args: {
    name: 'name',
    type: 'text',
    label: '',
    defaultValue: '',
    required: false,
    placeholder: '',
    hints: '',
    minLength: 0,
    maxLength: Number.MAX_SAFE_INTEGER,
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/common-form-field works!/gi)).toBeTruthy();
  },
};
