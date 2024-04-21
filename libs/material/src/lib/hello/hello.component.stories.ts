import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { HelloComponent } from './hello.component';
import { userEvent, within } from '@storybook/testing-library';
import { commonProviders } from './../_story';

const meta: Meta<HelloComponent> = {
  component: HelloComponent,
  title: 'HelloComponent',
  tags: ['Just a sample'],
  decorators: [
    applicationConfig({
      providers: [...commonProviders],
    }),
  ],
};
export default meta;

type Story = StoryObj<HelloComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helloButton = canvas.queryByTestId('hello-button');

    if (!helloButton) fail('Hello button is not found!');

    await userEvent.click(helloButton, { delay: 1000 });
    await userEvent.click(helloButton, { delay: 1000 });
    await userEvent.click(helloButton, { delay: 1000 });
    await userEvent.click(helloButton, { delay: 1000 });
  },
};
