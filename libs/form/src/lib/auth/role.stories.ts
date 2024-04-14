import type { Meta, StoryObj } from '@storybook/angular';
import { RoleFormComponent } from './role';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<RoleFormComponent> = {
  component: RoleFormComponent,
  title: 'RoleFormComponent',
};
export default meta;
type Story = StoryObj<RoleFormComponent>;

export const Primary: Story = {
  args: {
    formTitle: 'Create New Role',
    submitLabel: 'Save',
  },
};

export const Heading: Story = {
  args: {
    formTitle: 'Create New Role',
    submitLabel: 'Save',
    permissionList: [
      {
        id: 1,
        label: 'User',
        subs: [
          { id: 2, label: 'Read' },
          { id: 3, label: 'Create' },
          { id: 4, label: 'Update' },
          { id: 5, label: 'Delete' },
        ],
      },
      {
        id: 6,
        label: 'User',
        subs: [
          { id: 7, label: 'Read' },
          { id: 8, label: 'Create' },
          { id: 9, label: 'Update' },
          { id: 10, label: 'Delete' },
        ],
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Create New Role/gi)).toBeTruthy();
  },
};
