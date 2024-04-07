import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormComponent } from './form';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup } from '@angular/forms';

const meta: Meta<FormComponent> = {
  component: FormComponent,
  title: 'FormComponent',
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      providers: [
        {
          provide: FormGroup,
          useValue: new FormGroup({
            name: new FormControl('', []),
          }),
        },
      ],
    }),
  ],
};
export default meta;

type Story = StoryObj<FormComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/form works!/gi)).toBeTruthy();
  },
};
