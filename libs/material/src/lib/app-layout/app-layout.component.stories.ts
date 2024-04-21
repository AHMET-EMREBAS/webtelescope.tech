import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { AppLayoutComponent } from './app-layout.component';

import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { commonProviders } from '../_story';

const meta: Meta<AppLayoutComponent> = {
  component: AppLayoutComponent,
  title: 'AppLayoutComponent',
  decorators: [
    applicationConfig({
      providers: [...commonProviders],
    }),
  ],
};
export default meta;
type Story = StoryObj<AppLayoutComponent>;

export const Primary: Story = {
  args: {
    testing: true,
  },
};

export const Heading: Story = {
  args: Primary.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const logo = canvas.queryByAltText('App Logo');
    expect(logo).toBeTruthy();
    const fullscreen = canvas.queryByLabelText('Toggle Fullscreen');
    expect(fullscreen).toBeTruthy();

    const toggleLeftSidenav = canvas.queryByLabelText('Toggle Left Sidenav');
    expect(toggleLeftSidenav).toBeTruthy();

    const toggleRightSidenav = canvas.queryByLabelText('Toggle Right Sidenav');
    expect(toggleRightSidenav).toBeTruthy();

    const delay = 400;

    await userEvent.click(toggleLeftSidenav!, { delay });
    await userEvent.click(toggleLeftSidenav!, { delay });
    await userEvent.click(toggleLeftSidenav!, { delay });
    await userEvent.click(toggleLeftSidenav!, { delay });

    await userEvent.click(toggleRightSidenav!, { delay });
    await userEvent.click(toggleRightSidenav!, { delay });
    await userEvent.click(toggleRightSidenav!, { delay });
    await userEvent.click(toggleRightSidenav!, { delay });
  },
};
