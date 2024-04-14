import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { PermissionFormComponent } from './permission';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<PermissionFormComponent> = {
  component: PermissionFormComponent,
  title: 'PermissionFormComponent',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
};
export default meta;
type Story = StoryObj<PermissionFormComponent>;

export const Primary: Story = {
  args: {
    formTitle: 'Create New Permission',
    submitLabel: 'Save',
  },
};

export const Heading: Story = {
  args: {
    formTitle: 'Create New Permission',
    submitLabel: 'Save',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Create New Permission/gi)).toBeTruthy();
  },
};
