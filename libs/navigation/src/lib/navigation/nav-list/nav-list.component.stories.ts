import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { NavListComponent } from './nav-list.component';

import { within } from '@storybook/testing-library';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

const meta: Meta<NavListComponent> = {
  title: 'NavListComponent',
  component: NavListComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideRouter([]),
        importProvidersFrom(BrowserAnimationsModule),
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<NavListComponent>;

export const Primary: Story = {
  args: {
    title: 'Nav List Title',
    listItems: [
      {
        label: 'Home',
        icon: 'home',
        iconColor: 'primary',
        badge: '1',
        badgeColor: 'accent',
      },
      {
        label: 'About',
        icon: 'info',
        iconColor: 'primary',
        badge: '1',
        badgeColor: 'accent',
      },
      {
        label: 'Services',
        icon: 'apps',
        iconColor: 'primary',
        badge: '1',
        badgeColor: 'accent',
      },
    ],
  },
};

export const Heading: Story = {
  args: {
    listItems: [{ label: 'Home', icon: 'home' }],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
