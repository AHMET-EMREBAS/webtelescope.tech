import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SlideToggleComponent } from './slide-toggle';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup } from '@angular/forms';

const meta: Meta<SlideToggleComponent> = {
  component: SlideToggleComponent,
  title: 'SlideToggleComponent',
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      providers: [
        {
          provide: FormGroup,
          useValue: new FormGroup({
            active: new FormControl(false, []),
          }),
        },
      ],
    }),
  ],
};

export default meta;

type Story = StoryObj<SlideToggleComponent>;

export const Primary: Story = {
  args: {
    inputName: 'active',
    label: 'Slide Toggle',
  },
};

export const Heading: Story = {
  args: {
    inputName: 'active',
    label: 'Slide Toggle',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Slide Toggle/gi)).toBeTruthy();
  },
};
