import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { WebLayoutComponent } from './web-layout.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const meta: Meta<WebLayoutComponent> = {
  component: WebLayoutComponent,
  title: 'WebLayoutComponent',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
};
export default meta;
type Story = StoryObj<WebLayoutComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
