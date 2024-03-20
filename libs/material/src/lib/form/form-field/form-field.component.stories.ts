import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormFieldComponent } from './form-field.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { provideFormGroup } from '../../api';
import { FormBuilder, Validators } from '@angular/forms';
import { provideSubmittedErrorStateMatcher } from '../error-state-matcher';

const meta: Meta<FormFieldComponent> = {
  component: FormFieldComponent,
  title: 'FormFieldComponent',
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      providers: [
        provideAnimations(),
        provideSubmittedErrorStateMatcher(),
        provideFormGroup(
          new FormBuilder().group({
            age: ['', [Validators.required]],
            name: [
              '',
              [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(10),
              ],
            ],
          })
        ),
      ],
    }),
  ],
};
export default meta;

type Story = StoryObj<FormFieldComponent>;

export const Primary: Story = {
  args: {
    type: 'text',
    name: 'name',
    hints: 'Type your first name',
    prefixIcon: 'info',
    suffixIcon: 'input',
    label: 'First Name',
    minLength: 3,
    maxLength: 10,
    required: true,
  },
};
export const NumberInput: Story = {
  args: {
    type: 'number',
    name: 'age',
    hints: 'You age',
    prefixIcon: 'numbers',
    suffixIcon: 'input',
    label: 'Age',
    min: 18,
    max: 200,
    required: true,
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/form-field works!/gi)).toBeTruthy();
  },
};
