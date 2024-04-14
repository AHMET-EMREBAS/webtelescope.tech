import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { UserFormComponent } from './user';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<UserFormComponent> = {
  component: UserFormComponent,
  title: 'UserFormComponent',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
};

export default meta;

type Story = StoryObj<UserFormComponent>;

export const Primary: Story = {
  args: {
    formTitle: 'Create User Form',
    submitLabel: 'Save User',
    isUpdateForm: false,
    userRoles: [
      {
        id: 1,
        label: 'Admin',
      },
      {
        id: 2,
        label: 'Editor',
      },
      {
        id: 3,
        label: 'Reader',
      },
    ],
  },
};

export const Heading: Story = {
  args: Primary.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const username = canvas.getByTestId('username');
    const roles = canvas.getByTestId('roles');
    const Admin = canvas.getByTestId('Admin');
    const Editor = canvas.getByTestId('Editor');
    const Reader = canvas.getByTestId('Reader');

    expect(Admin).toBeTruthy();
    expect(Editor).toBeTruthy();
    expect(Reader).toBeTruthy();

    expect(username).toBeTruthy();
    expect(roles).toBeTruthy();

    await userEvent.clear(username);

    await userEvent.type(username, 'user@domain.com', { delay: 50 });
    await userEvent.click(Admin);
    await userEvent.click(Editor);
    await userEvent.click(Reader);

    const signupButton = await canvas.findByTestId('Save User');
    const resetButton = await canvas.findByTestId('Reset');

    await userEvent.click(signupButton, { delay: 400 });
    await userEvent.click(resetButton, { delay: 1000 });
  },
};
