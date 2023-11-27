import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DateComponent } from './date.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<DateComponent> = {
  component: DateComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
  ],
  title: 'DateComponent',
};
export default meta;
type Story = StoryObj<DateComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/date works!/gi)).toBeTruthy();
  },
};
