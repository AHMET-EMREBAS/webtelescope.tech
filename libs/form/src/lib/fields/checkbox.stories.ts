import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { CheckboxFieldComponent } from './checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { FormControl, FormGroup } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<CheckboxFieldComponent> = {
  component: CheckboxFieldComponent,
  title: 'CheckboxFieldComponent',
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        {
          provide: FormGroup,
          useValue: new FormGroup({
            active: new FormControl(false, []),
          }),
        },
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<CheckboxFieldComponent>;

export const Primary: Story = {
  args: {
    label: 'Checkbox Label',
    inputName: 'active',
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
