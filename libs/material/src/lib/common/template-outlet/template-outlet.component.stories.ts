import type { Meta, StoryObj } from '@storybook/angular';
import { TemplateOutletComponent } from './template-outlet.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<TemplateOutletComponent> = {
  component: TemplateOutletComponent,
  title: 'TemplateOutletComponent',
};
export default meta;
type Story = StoryObj<TemplateOutletComponent>;

export const Primary: Story = {
  args: {
    testing: false,
    testName: '',
  },
};

export const Heading: Story = {
  args: {
    testing: false,
    testName: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/template-outlet works!/gi)).toBeTruthy();
  },
};
