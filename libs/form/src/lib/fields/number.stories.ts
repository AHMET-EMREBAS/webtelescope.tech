import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { NumberFieldComponent } from './number';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<NumberFieldComponent> = {
  component: NumberFieldComponent,
  title: 'NumberFieldComponent',
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        {
          provide: FormGroup,
          useValue: new FormGroup({
            age: new FormControl(0, []),
          }),
        },
      ],
    }),
  ],
};

export default meta;

type Story = StoryObj<NumberFieldComponent>;

export const Primary: Story = {
  args: {
    inputName: 'age',
    label: 'Number Label',
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
  },
};

export const Heading: Story = {
  args: {
    inputName: 'age',
    label: 'Number Label',
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Number Label/gi)).toBeTruthy();
  },
};
