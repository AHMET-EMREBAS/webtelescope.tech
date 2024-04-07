import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { DateFieldComponent } from './date';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { FormControl, FormGroup } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<DateFieldComponent> = {
  component: DateFieldComponent,
  title: 'DateFieldComponent',
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        {
          provide: FormGroup,
          useValue: new FormGroup({
            date: new FormControl('', []),
          }),
        },
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<DateFieldComponent>;

export const Primary: Story = {
  args: {
    label: 'Pick Date',
    inputName: 'date',
    prefixIcon: 'info',
    suffixIcon: '',
    required: false,
    isUpdateField: false,
  },
};

export const Heading: Story = {
  args: Primary.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Checkbox Label/gi)).toBeTruthy();
  },
};
