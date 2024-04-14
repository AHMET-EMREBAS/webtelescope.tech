import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { LoginFormComponent, LoginFormGroup } from './login';
import { within, userEvent } from '@storybook/testing-library';

import { expect } from '@storybook/jest';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { ILoginDto } from '@webpackages/model';

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

const loginDto: ILoginDto = {
  username: 'user@gmail.com',
  password: '!Password1234.',
};

export const Heading: Story = {
  play: async (args) => {
    const { canvasElement } = args;
    console.log(args);
    const canvas = within(canvasElement);

    const username = canvas.getByTestId('username');
    const password = canvas.getByTestId('password');

    const loginButton = canvas.getByTestId(/Login/);
    const resetButton = canvas.getByTestId(/Reset/);

    expect(username).toBeTruthy();
    expect(password).toBeTruthy();

    await userEvent.clear(username);
    await userEvent.clear(password);

    await userEvent.type(username, loginDto.username, { delay: 100 });
    await userEvent.type(password, loginDto.password, { delay: 100 });

    await userEvent.click(loginButton, { delay: 1000 });

    expect(LoginFormGroup.value.username).toBe(loginDto.username);
    expect(LoginFormGroup.value.password).toBe(loginDto.password);

    await userEvent.click(resetButton, { delay: 1000 });
  },
};
