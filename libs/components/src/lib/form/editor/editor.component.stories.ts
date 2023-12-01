import type { Meta, StoryObj } from '@storybook/angular';
import { EditorComponent } from './editor.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<EditorComponent> = {
  component: EditorComponent,
  title: 'EditorComponent',
};
export default meta;
type Story = StoryObj<EditorComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/editor works!/gi)).toBeTruthy();
  },
};
