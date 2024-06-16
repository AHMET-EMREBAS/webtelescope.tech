import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { TableComponent } from './table.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { provideAnimations } from '@angular/platform-browser/animations';
const meta: Meta<TableComponent> = {
  component: TableComponent,
  title: 'TableComponent',
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
};
export default meta;
type Story = StoryObj<TableComponent>;

let i = 1;
const data = ' '
  .repeat(100)
  .split('')
  .map((e) => {
    i = i + 1;
    return {
      id: i,
      name: `Data ${i}`,
    };
  });
export const Primary: Story = {
  args: {
    data,
    displayedColumns: [{ name: 'id' }, { name: 'name' }],
    count: data.length,
  },
};

export const Heading: Story = {
  ...Primary,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
