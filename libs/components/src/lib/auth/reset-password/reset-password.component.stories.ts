import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ResetPasswordComponent } from './reset-password.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<ResetPasswordComponent> = {
  component: ResetPasswordComponent,
  title: 'ResetPasswordComponent',
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<ResetPasswordComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/reset-password works!/gi)).toBeTruthy();
  },
};
