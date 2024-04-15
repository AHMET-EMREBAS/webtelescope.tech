import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { NavMenuComponent } from './nav-menu.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<NavMenuComponent> = {
  component: NavMenuComponent,
  title: 'NavMenuComponent',
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

type Story = StoryObj<NavMenuComponent>;

export const Primary: Story = {
  args: {
    trigerIcon: 'settings',
    trigerLabel: 'Settings',
    trigerIconColor: 'primary',
    menuItems: [
      {
        label: 'Common',
        icon: 'info',
        subs: [
          { label: 'Sub 1', icon: 'info', iconColor: 'primary' },
          { label: 'Sub 2', icon: 'info', iconColor: 'accent' },
          { label: 'Sub 3', icon: 'info', iconColor: 'warn' },
          { label: 'Sub 4', icon: 'info', iconColor: 'primary' },
          { label: 'Sub 5', icon: 'info', iconColor: 'accent' },
        ],
      },
    ],
  },
};

export const Heading: Story = {
  args: Primary.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
