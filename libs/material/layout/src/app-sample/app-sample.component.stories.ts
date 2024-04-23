import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { AppSampleComponent } from './app-sample.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { commonProviders } from '../_story';

const meta: Meta<AppSampleComponent> = {
  component: AppSampleComponent,
  title: 'AppSampleComponent',
  decorators: [
    applicationConfig({
      providers: [...commonProviders],
    }),
  ],
};
export default meta;
type Story = StoryObj<AppSampleComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
