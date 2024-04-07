import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { PasswordFieldComponent } from './password';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup } from '@angular/forms';

const meta: Meta<PasswordFieldComponent> = {
  component: PasswordFieldComponent,
  title: 'PasswordFieldComponent',
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      providers: [
        {
          provide: FormGroup,
          useValue: new FormGroup({
            password: new FormControl('', []),
          }),
        },
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<PasswordFieldComponent>;

export const Primary: Story = {
  args: {
    inputName: 'password',
  },
};

export const Heading: Story = {
  args: {
    inputName: 'password',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/password works!/gi)).toBeTruthy();
  },
};
