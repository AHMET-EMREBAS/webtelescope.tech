import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { NavigationComponent } from './navigation.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<NavigationComponent> = {
  component: NavigationComponent,
  title: 'NavigationComponent',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
};
export default meta;
type Story = StoryObj<NavigationComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
