import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { LoginComponent } from './login.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  AuthClientService,
  createAuthInterceptor,
} from '@webpackages/auth-client';
import '@angular/localize/init';

const meta: Meta<LoginComponent> = {
  component: LoginComponent,
  title: 'LoginComponent',
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        AuthClientService,
        provideHttpClient(
          withInterceptors([createAuthInterceptor('http://localhost:3000')])
        ),
      ],
    }),
  ],
};

export default meta;

type Story = StoryObj<LoginComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/login works!/gi)).toBeTruthy();
  },
};
