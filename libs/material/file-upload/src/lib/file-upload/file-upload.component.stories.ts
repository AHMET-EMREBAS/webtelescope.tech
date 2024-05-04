import type { Meta, StoryObj } from '@storybook/angular';
import { FileUploadComponent } from './file-upload.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<FileUploadComponent> = {
  component: FileUploadComponent,
  title: 'FileUploadComponent',
};
export default meta;
type Story = StoryObj<FileUploadComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
