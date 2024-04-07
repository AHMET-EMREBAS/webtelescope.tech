import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { SelectFieldComponent } from './select';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup } from '@angular/forms';

const meta: Meta<SelectFieldComponent> = {
  component: SelectFieldComponent,
  title: 'SelectFieldComponent',
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        {
          provide: FormGroup,
          useValue: new FormGroup({
            category: new FormControl('', []),
          }),
        },
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<SelectFieldComponent>;

export const Primary: Story = {
  args: {
    label: 'Select Category',
    inputName: 'category',
    prefixIcon: 'category',
    options: [
      { id: 1, label: 'First' },
      { id: 2, label: 'Second' },
      { id: 3, label: 'Third' },
    ],
  },
};

export const Heading: Story = {
  args: {
    label: 'Select Category',
    inputName: 'category',
    prefixIcon: 'category',
    multiple: true,
    options: [
      { id: 1, label: 'First' },
      { id: 2, label: 'Second' },
      { id: 3, label: 'Third' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Select Category/gi)).toBeTruthy();
  },
};
