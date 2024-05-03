import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { FormComponent } from './form.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { provideAnimations } from '@angular/platform-browser/animations';

const meta: Meta<FormComponent> = {
  component: FormComponent,
  title: 'FormComponent',
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
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
