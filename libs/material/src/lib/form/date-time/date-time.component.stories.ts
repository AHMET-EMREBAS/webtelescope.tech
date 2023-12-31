import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DateTimeComponent } from './date-time.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<DateTimeComponent> = {
  component: DateTimeComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
  ],
  title: 'DateTimeComponent',
};
export default meta;
type Story = StoryObj<DateTimeComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/date-time works!/gi)).toBeTruthy();
  },
};
