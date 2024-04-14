import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { SubFormComponent } from './sub';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<SubFormComponent> = {
  component: SubFormComponent,
  title: 'SubFormComponent',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
};

export default meta;

type Story = StoryObj<SubFormComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {
    subTypes: [
      { id: 1, label: 'Premium' },
      { id: 2, label: 'Gold' },
      { id: 3, label: 'Economy' },
      { id: 4, label: 'Basic' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const username = canvas.getByTestId('username');
    const password = canvas.getByTestId('password');
    const organizationName = canvas.getByTestId('organizationName');
    const subType = canvas.getByTestId('subType');

    expect(username).toBeTruthy();
    expect(password).toBeTruthy();
    expect(organizationName).toBeTruthy();
    expect(subType).toBeTruthy();

    await userEvent.clear(username);
    await userEvent.clear(password);
    await userEvent.clear(organizationName);

    await userEvent.type(username, 'user@domain.com', { delay: 50 });
    await userEvent.type(password, '!Password1234.', { delay: 50 });
    await userEvent.type(organizationName, 'Web Telescope', { delay: 50 });
    await userEvent.type(subType, 'Gold', { delay: 50 });

    const option = document.querySelector('[data-testid="Gold"]');
    await userEvent.click(option!);

    const signupButton = await canvas.findByTestId('Sign Up');
    const resetButton = await canvas.findByTestId('Reset');

    await userEvent.click(signupButton, { delay: 400 });
    await userEvent.click(resetButton, { delay: 1000 });
  },
};
