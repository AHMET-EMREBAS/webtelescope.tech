import type { Meta, StoryObj } from '@storybook/angular';
import { MaterialFileUploadComponent } from './material-file-upload.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<MaterialFileUploadComponent> = {
  component: MaterialFileUploadComponent,
  title: 'MaterialFileUploadComponent',
};
export default meta;
type Story = StoryObj<MaterialFileUploadComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/material-file-upload works!/gi)).toBeTruthy();
  },
};
