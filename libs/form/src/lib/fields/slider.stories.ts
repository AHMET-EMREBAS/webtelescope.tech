import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SliderComponent } from './slider';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup } from '@angular/forms';

const meta: Meta<SliderComponent> = {
  component: SliderComponent,
  title: 'SliderComponent',
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      providers: [
        {
          provide: FormGroup,
          useValue: new FormGroup({
            percent: new FormControl(0, []),
          }),
        },
      ],
    }),
  ],
};
export default meta;

type Story = StoryObj<SliderComponent>;

export const Primary: Story = {
  args: {
    label: 'Slider Label',
    inputName: 'percent',
    prefixIcon: 'numbers',
    suffixIcon: '',
    min: 0,
    max: 100,
  },
};

export const Heading: Story = {
  args: Primary.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Slider Label/gi)).toBeTruthy();
  },
};
