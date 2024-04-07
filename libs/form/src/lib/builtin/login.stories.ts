import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { LoginFormComponent } from './login';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<LoginFormComponent> = {
  component: LoginFormComponent,
  title: 'LoginFormComponent',

  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<LoginFormComponent>;

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
