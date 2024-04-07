import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CheckboxFieldComponent } from './checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { FormControl, FormGroup } from '@angular/forms';

const meta: Meta<CheckboxFieldComponent> = {
  component: CheckboxFieldComponent,
  title: 'CheckboxFieldComponent',
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
type Story = StoryObj<CheckboxFieldComponent>;

export const Primary: Story = {
  args: {
    label: 'Checkbox Label',
    inputName: 'active',
    prefixIcon: 'person',
  },
};

export const Heading: Story = {
  args: {
    label: 'Checkbox Label',
    inputName: 'active',
    prefixIcon: 'person',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Checkbox Label/gi)).toBeTruthy();
  },
};
