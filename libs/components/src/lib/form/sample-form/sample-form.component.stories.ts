import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SampleFormComponent } from './sample-form.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import "@angular/localize/init"

const meta: Meta<SampleFormComponent> = {
  component: SampleFormComponent,
  title: 'SampleFormComponent',
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<SampleFormComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/sample-form works!/gi)).toBeTruthy();
  },
};
