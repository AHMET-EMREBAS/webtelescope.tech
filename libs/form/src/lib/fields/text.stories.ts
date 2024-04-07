import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { TextFieldComponent } from './text';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup } from '@angular/forms';

const meta: Meta<TextFieldComponent> = {
  component: TextFieldComponent,
  title: 'TextFieldComponent',
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      providers: [
        {
          provide: FormGroup,
          useValue: new FormGroup({
            name: new FormControl('', []),
          }),
        },
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<TextFieldComponent>;

export const Primary: Story = {
  args: {
    inputName: 'name',
    prefixIcon: 'person',
    label: 'Text Label',
    minLength: 0,
    maxLength: 400,
  },
};

export const Heading: Story = {
  args: {
    inputName: 'name',
    prefixIcon: 'person',
    label: 'Text Label',
    minLength: 0,
    maxLength: 400,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Text Label/gi)).toBeTruthy();
  },
};
