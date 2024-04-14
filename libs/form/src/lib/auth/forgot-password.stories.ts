import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { ForgotPasswordFormComponent } from './forgot-password';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<ForgotPasswordFormComponent> = {
  component: ForgotPasswordFormComponent,
  title: 'ForgotPasswrodComponent',
  tags: ['Auth'],
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
};

export default meta;

type Story = StoryObj<ForgotPasswordFormComponent>;

export const Primary: Story = {};

export const Heading: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const username = canvas.getByTestId('username');
    const forgotPasswordButton = canvas.getByTestId(/Forgot Password/);
    const resetButton = canvas.getByTestId(/Reset/);

    expect(username).toBeTruthy();

    await userEvent.clear(username);

    await userEvent.type(username, 'user@gmail.com', { delay: 100 });

    await userEvent.click(forgotPasswordButton, { delay: 1000 });
    await userEvent.click(resetButton, { delay: 1000 });
  },
};
