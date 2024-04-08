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
        label: 'User',
        subs: [
          { id: 1, label: 'Create' },
          { id: 2, label: 'Read' },
          { id: 3, label: 'Update' },
          { id: 4, label: 'Delete' },
        ],
      },
      {
        id: 10,
        label: 'Organization',
        subs: [
          { id: 5, label: 'Create' },
          { id: 6, label: 'Read' },
          { id: 7, label: 'Update' },
          { id: 8, label: 'Delete' },
        ],
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
    const CreateOrganization = canvas.getByTestId('CreateOrganization');
    const UpdateOrganization = canvas.getByTestId('UpdateOrganization');
    const DeleteOrganization = canvas.getByTestId('DeleteOrganization');
    const ReadOrganization = canvas.getByTestId('ReadOrganization');
    const CreateUser = canvas.getByTestId('CreateUser');
    const UpdateUser = canvas.getByTestId('UpdateUser');
    const DeleteUser = canvas.getByTestId('DeleteUser');
    const ReadUser = canvas.getByTestId('ReadUser');

    expect(CreateOrganization).toBeTruthy();
    expect(UpdateOrganization).toBeTruthy();
    expect(DeleteOrganization).toBeTruthy();
    expect(ReadOrganization).toBeTruthy();
    expect(CreateUser).toBeTruthy();
    expect(UpdateUser).toBeTruthy();
    expect(DeleteUser).toBeTruthy();
    expect(ReadUser).toBeTruthy();

    expect(username).toBeTruthy();
    expect(roles).toBeTruthy();

    await userEvent.clear(username);

    await userEvent.type(username, 'user@domain.com', { delay: 50 });

    const signupButton = await canvas.findByTestId('Save User');
    const resetButton = await canvas.findByTestId('Reset');

    await userEvent.click(CreateOrganization, { delay: 200 });
    await userEvent.click(UpdateOrganization, { delay: 200 });
    await userEvent.click(CreateUser, { delay: 200 });
    await userEvent.click(UpdateUser, { delay: 200 });

    await userEvent.click(signupButton, { delay: 400 });
    await userEvent.click(resetButton, { delay: 1000 });
  },
};
