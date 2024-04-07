import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { LoginFormComponent } from './login';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

const meta: Meta<LoginFormComponent> = {
  component: LoginFormComponent,
  title: 'LoginFormComponent',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
};

export default meta;

type Story = StoryObj<LoginFormComponent>;

export const Primary: Story = {};

export const Heading: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const username = canvas.getByLabelText(/Username/gi);
    const password = canvas.getByLabelText(/Password/gi);

    expect(username).toBeTruthy();
    expect(password).toBeTruthy();

    await userEvent.clear(username);
    await userEvent.clear(password);

    await userEvent.type(username, 'user@gmail.com', { delay: 1000 });
    await userEvent.type(password, '!Password1234.', { delay: 1000 });
  },
};
