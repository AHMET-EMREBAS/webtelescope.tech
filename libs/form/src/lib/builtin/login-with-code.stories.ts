import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { LoginWithCodeFormComponent } from './login-with-code';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<LoginWithCodeFormComponent> = {
  component: LoginWithCodeFormComponent,
  title: 'LoginWithCodeFormComponent',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  argTypes: {
    focusPassword: {
      description: 'Focus password field',
      type: 'function',
    },
    focusUserName: {
      description: 'Focus username field',
      type: 'function',
    },
    formTitle: {
      description: 'Form title',
      type: 'string',
    },
    submitLabel: {
      description: 'Submit button label',
      type: 'string',
    },
    username: {
      description: 'Username input referance',
    },
    securityCode: {
      description: 'Security code input referance',
    },
    formGroup: {
      description: 'FormGroup',
      type: 'function',
    },
    reset: {
      description: 'Reset form',
    },
    submit: {
      description: 'Submit form',
    },
    submitButtonClick: {
      description: 'On submit button click event',
    },
  },
};

export default meta;

type Story = StoryObj<LoginWithCodeFormComponent>;

export const Primary: Story = {
  argTypes: meta.argTypes,
};

export const Heading: Story = {
  argTypes: meta.argTypes,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const username = canvas.getByTestId('username');
    const securityCode = canvas.getByTestId('securityCode');

    const loginButton = canvas.getByTestId(/Login/);
    const resetButton = canvas.getByTestId(/Reset/);

    expect(username).toBeTruthy();
    expect(securityCode).toBeTruthy();

    await userEvent.clear(username);
    await userEvent.clear(securityCode);

    await userEvent.type(username, 'user@gmail.com', { delay: 100 });
    await userEvent.type(securityCode, 'oauoo-982749-asjdf-aerqw', {
      delay: 100,
    });

    await userEvent.click(loginButton, { delay: 1000 });
    await userEvent.click(resetButton, { delay: 1000 });
  },
};
