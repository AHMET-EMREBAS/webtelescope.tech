import type { Meta, StoryObj } from '@storybook/angular';
import { SearchComponent } from './search.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SearchComponent> = {
  component: SearchComponent,
  title: 'SearchComponent',
};
export default meta;
type Story = StoryObj<SearchComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/search works!/gi)).toBeTruthy();
  },
};
