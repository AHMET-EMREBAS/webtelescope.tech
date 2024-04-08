import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { ListSelectGroupComponent } from './list-select-group';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { FormControl, FormGroup } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<ListSelectGroupComponent> = {
  component: ListSelectGroupComponent,
  title: 'ListSelectGroupComponent',
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        {
          provide: FormGroup,
          useValue: new FormGroup({
            roles: new FormControl(false, []),
          }),
        },
      ],
    }),
  ],
};

export default meta;

type Story = StoryObj<ListSelectGroupComponent>;

export const Primary: Story = {
  args: {
    label: 'Roles',
    inputName: 'roles',
    prefixIcon: '',
    suffixIcon: '',
    required: false,
    isUpdateField: false,
    items: [
      {
        id: 1,
        label: 'Sprint',
        subs: [
          { id: 4, label: 'Read' },
          { id: 1, label: 'Create' },
          { id: 2, label: 'Update' },
          { id: 3, label: 'Delete' },
        ],
      },
      {
        id: 2,
        label: 'Role',
        subs: [
          { id: 4, label: 'Read' },
          { id: 1, label: 'Create' },
          { id: 2, label: 'Update' },
          { id: 3, label: 'Delete' },
        ],
      },
      {
        id: 3,
        label: 'Project',
        subs: [
          { id: 4, label: 'Read' },
          { id: 1, label: 'Create' },
          { id: 2, label: 'Update' },
          { id: 3, label: 'Delete' },
        ],
      },
      {
        id: 4,
        label: 'Organization',
        subs: [
          { id: 4, label: 'Read' },
          { id: 1, label: 'Create' },
          { id: 2, label: 'Update' },
          { id: 3, label: 'Delete' },
        ],
      },
    ],
  },
};

export const Heading: Story = {
  args: Primary.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
