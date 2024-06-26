import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { TextareaFieldComponent } from './textarea';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup } from '@angular/forms';

const meta: Meta<TextareaFieldComponent> = {
  component: TextareaFieldComponent,
  title: 'TextareaFieldComponent',
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

type Story = StoryObj<TextareaFieldComponent>;

export const Primary: Story = {
  args: {
    inputName: 'name',
    minLength: 0,
    maxLength: 400,
    inputType: 'text',
    label: 'Text Label',
    hint: 'Hint',
    prefixIcon: '',
    suffixIcon: '',
    isUpdateField: false,
  },
};

export const Heading: Story = {
  args: Primary.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/textarea works!/gi)).toBeTruthy();
  },
};
