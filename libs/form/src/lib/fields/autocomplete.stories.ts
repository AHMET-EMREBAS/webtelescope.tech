import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { AutocompleteFieldComponent } from './autocomplete';

const meta: Meta<AutocompleteFieldComponent> = {
  component: AutocompleteFieldComponent,
  title: 'AutocompleteFieldComponent',
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        {
          provide: FormGroup,
          useValue: new FormGroup({
            category: new FormControl('', []),
          }),
        },
      ],
    }),
  ],
};

export default meta;

type Story = StoryObj<AutocompleteFieldComponent>;

export const Primary: Story = {
  args: {
    label: 'Autocomplete Category',
    inputName: 'category',
    prefixIcon: 'category',
    options: [
      { id: 1, label: '1' },
      { id: 2, label: '2' },
      { id: 3, label: '3' },
      { id: 4, label: '4' },
      { id: 5, label: '5' },
      { id: 6, label: '6' },
      { id: 7, label: '7' },
      { id: 8, label: '8' },
    ],
  },
};

export const Heading: Story = {
  args: {
    label: 'Autocomplete Category',
    inputName: 'category',
    prefixIcon: 'category',
    multiple: true,
    options: [
      { id: 1, label: '1' },
      { id: 2, label: '2' },
      { id: 3, label: '3' },
      { id: 4, label: '4' },
      { id: 5, label: '5' },
      { id: 6, label: '6' },
      { id: 7, label: '7' },
      { id: 8, label: '8' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Autocomplete Category/gi)).toBeTruthy();
  },
};
