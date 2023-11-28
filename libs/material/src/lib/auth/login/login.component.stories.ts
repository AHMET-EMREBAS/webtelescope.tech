import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { LoginComponent } from './login.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<LoginComponent> = {
  component: LoginComponent,
  title: 'LoginComponent',
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<LoginComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/login works!/gi)).toBeTruthy();
  },
};
