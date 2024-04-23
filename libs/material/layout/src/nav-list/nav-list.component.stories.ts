import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { NavListComponent } from './nav-list.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { commonProviders } from '../_story';

const meta: Meta<NavListComponent> = {
  component: NavListComponent,
  title: 'NavListComponent',
  decorators: [
    applicationConfig({
      providers: [...commonProviders],
    }),
  ],
};
export default meta;
type Story = StoryObj<NavListComponent>;

export const Primary: Story = {
  args: {
    items: [
      {
        id: 1,
        title: 'First title',
        subtitle: 'First subtitle',
        icon: 'info',
        iconColor: 'accent',
        badge: '100',
        badgeColor: 'accent',
        meta: 'First meta',
        route: '',
      },
      {
        id: 2,
        title: 'First title',
        subtitle: 'First subtitle',
        icon: 'info',
        iconColor: 'accent',
        badge: '100',
        badgeColor: 'accent',
        meta: 'First meta',
        route: 'some',
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
