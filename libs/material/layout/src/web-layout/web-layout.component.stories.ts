import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { WebLayoutComponent } from './web-layout.component';

import { within } from '@storybook/testing-library';

import { commonProviders } from '../_story';

const meta: Meta<WebLayoutComponent> = {
  component: WebLayoutComponent,
  title: 'WebLayoutComponent',
  decorators: [
    applicationConfig({
      providers: [...commonProviders],
    }),
  ],
};
export default meta;
type Story = StoryObj<WebLayoutComponent>;

export const Primary: Story = {
  args: {
    testing: true,
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
