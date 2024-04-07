import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { PasswordFieldComponent } from './password';

import { userEvent, within } from '@storybook/testing-library';
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
    label: 'Password',
  },
};

export const Heading: Story = {
  args: {
    inputName: 'password',
    label: 'Password',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const password = canvas.getByLabelText(/Password/gi);
    const showPassword = canvas.getByText(/visibility/gi);
    const hidePassword = canvas.getByText(/visibility/gi);

    expect(password).toBeTruthy();
    userEvent.clear(password);

    await userEvent.type(password, '!Password123.', { delay: 50 });
    await userEvent.click(showPassword, { delay: 400 });
    await userEvent.click(hidePassword, { delay: 2000 });
  },
};
