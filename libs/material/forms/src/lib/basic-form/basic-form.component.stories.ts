import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { BasicFormComponent } from './basic-form.component';

import { within } from '@storybook/testing-library';
import { FormModule } from '../form';
import { provideAnimations } from '@angular/platform-browser/animations';

const meta: Meta<BasicFormComponent> = {
  component: BasicFormComponent,
  title: 'BasicFormComponent',
  decorators: [
    applicationConfig({
      providers: [FormModule, provideAnimations()],
    }),
  ],
};
export default meta;
type Story = StoryObj<BasicFormComponent>;

export const Primary: Story = {
  args: {
    inputs: [
      {
        type: 'text',
        name: 'firstName',
        required: true,
        minLength: 3,
        maxLength: 30,
      },
      {
        type: 'text',
        required: true,
        name: 'lastName',
        minLength: 3,
        maxLength: 30,
      },
      {
        type: 'text',
        required: true,
        name: 'email',
        minLength: 3,
        maxLength: 30,
      },
    ],
  },
};

export const Heading: Story = {
  args: Primary.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
