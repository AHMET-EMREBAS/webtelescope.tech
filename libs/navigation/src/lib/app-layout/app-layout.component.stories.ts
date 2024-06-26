import {
  applicationConfig,
  componentWrapperDecorator,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { AppLayoutComponent } from './app-layout.component';

import { within } from '@storybook/testing-library';

import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationModule } from '../navigation/navigation.module';

const meta: Meta<AppLayoutComponent> = {
  component: AppLayoutComponent,
  title: 'AppLayoutComponent',

  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule, NavigationModule),
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<AppLayoutComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
