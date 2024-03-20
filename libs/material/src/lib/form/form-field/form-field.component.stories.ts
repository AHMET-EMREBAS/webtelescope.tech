import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormFieldComponent } from './form-field.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';

const meta: Meta<FormFieldComponent> = {
  component: FormFieldComponent,
  title: 'FormFieldComponent',
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      providers: [provideAnimations()],
    }),
  ],
};
export default meta;
type Story = StoryObj<FormFieldComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/form-field works!/gi)).toBeTruthy();
  },
};
