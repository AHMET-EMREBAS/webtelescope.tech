import type { Meta, StoryObj } from '@storybook/angular';
import { BarcodeComponent } from './barcode.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<BarcodeComponent> = {
  component: BarcodeComponent,
  title: 'BarcodeComponent',
};
export default meta;
type Story = StoryObj<BarcodeComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/barcode works!/gi)).toBeTruthy();
  },
};
