import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { ListSelectComponent } from './list-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { FormControl, FormGroup } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<ListSelectComponent> = {
  component: ListSelectComponent,
  title: 'ListSelectComponent',
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        {
          provide: FormGroup,
          useValue: new FormGroup({
            permissions: new FormControl([], []),
          }),
        },
      ],
    }),
  ],
};

export default meta;

type Story = StoryObj<ListSelectComponent>;

export const Primary: Story = {
  args: {
    label: 'Select Permissions',
    inputName: 'permissions',
    prefixIcon: '',
    suffixIcon: '',
    required: false,
    isUpdateField: false,

    selectedItems: [{ id: 3 }],
    items: [
      {
        id: 1,
        label: 'User',
        subs: [
          { id: 3, label: 'Read' },
          { id: 4, label: 'Create' },
          { id: 5, label: 'Update' },
          { id: 6, label: 'Delete' },
        ],
      },
      {
        id: 2,
        label: 'Organization',
        subs: [
          { id: 7, label: 'Read' },
          { id: 8, label: 'Create' },
          { id: 9, label: 'Update' },
          { id: 10, label: 'Delete' },
        ],
      },
    ],
  },
};

export const Heading: Story = {
  args: Primary.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const title = await canvas.findByText(/Select Permissions/gi);

    expect(title).toBeTruthy();
  },
};
