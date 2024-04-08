import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { CheckboxGroupComponent } from './checkbox-group';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { FormControl, FormGroup } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<CheckboxGroupComponent> = {
  component: CheckboxGroupComponent,
  title: 'CheckboxGroupComponent',
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
type Story = StoryObj<CheckboxGroupComponent>;

export const Primary: Story = {
  args: {
    label: 'Checkbox Group',
    inputName: 'roles',
    prefixIcon: '',
    suffixIcon: '',
    required: false,
    isUpdateField: false,
  },
};

export const Heading: Story = {
  args: Primary.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
