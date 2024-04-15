import {
  applicationConfig,
  componentWrapperDecorator,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { SampleAppLayoutComponent } from './sample-app-layout.component';

import { within } from '@storybook/testing-library';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

const meta: Meta<SampleAppLayoutComponent> = {
  component: SampleAppLayoutComponent,
  title: 'SampleAppLayoutComponent',

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

type Story = StoryObj<SampleAppLayoutComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
