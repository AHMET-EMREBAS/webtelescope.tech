import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { AutocompleteComponent } from './autocomplete.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<AutocompleteComponent> = {
  component: AutocompleteComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
  ],
  title: 'AutocompleteComponent',
};
export default meta;
type Story = StoryObj<AutocompleteComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/autocomplete works!/gi)).toBeTruthy();
  },
};
