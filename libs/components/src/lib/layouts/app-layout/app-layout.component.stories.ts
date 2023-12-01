import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { AppLayoutComponent } from './app-layout.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import {
  LocalStoreService,
  provideAppName,
  provideModuleName,
  provideNavItems,
} from '../../api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<AppLayoutComponent> = {
  component: AppLayoutComponent,
  title: 'AppLayoutComponent',

  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      providers: [
        provideAppName('AppName'),
        provideModuleName('ModuleName'),
        LocalStoreService,
        provideNavItems([
          {
            name: 'Home',
            icon: 'home',
            route: '',
            params: {},
          },
        ]),
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
    expect(canvas.getByText(/app-layout works!/gi)).toBeTruthy();
  },
};
