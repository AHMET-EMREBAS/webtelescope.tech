import type { Meta, StoryObj } from '@storybook/angular';
import { CurrencyComponent } from './currency.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<CurrencyComponent> = {
  component: CurrencyComponent,
  title: 'CurrencyComponent',
};
export default meta;
type Story = StoryObj<CurrencyComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/currency works!/gi)).toBeTruthy();
  },
};
