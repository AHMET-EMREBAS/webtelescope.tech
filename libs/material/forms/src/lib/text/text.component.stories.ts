import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { TextComponent } from './text.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<TextComponent> = {
  component: TextComponent,
  title: 'TextComponent',
  decorators: [
    applicationConfig({
      providers: [provideNoopAnimations()],
    }),
  ],
};
export default meta;
type Story = StoryObj<TextComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // expect(canvas.getByText(/text works!/gi)).toBeTruthy();
  },
};
