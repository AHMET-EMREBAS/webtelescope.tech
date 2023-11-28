import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SignupComponent } from './signup.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<SignupComponent> = {
  component: SignupComponent,
  title: 'SignupComponent',
  decorators: [moduleMetadata({ imports: [BrowserAnimationsModule] })],
};
export default meta;
type Story = StoryObj<SignupComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/signup works!/gi)).toBeTruthy();
  },
};
