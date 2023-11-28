import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ResetPasswordWithCodeComponent } from './reset-password-with-code.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<ResetPasswordWithCodeComponent> = {
  component: ResetPasswordWithCodeComponent,
  title: 'ResetPasswordWithCodeComponent',

  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<ResetPasswordWithCodeComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/reset-password-with-code works!/gi)).toBeTruthy();
  },
};
