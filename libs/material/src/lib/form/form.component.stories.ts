import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormComponent } from './form.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideFormGroup } from '../api';
import { FormControl, FormGroup } from '@angular/forms';
import { InputValidator } from './validators';

const meta: Meta<FormComponent> = {
  component: FormComponent,
  title: 'FormComponent',
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      providers: [
        provideFormGroup(
          new FormGroup({
            name: new FormControl(
              '',
              new InputValidator('name')
                .required()
                .minlength(3)
                .maxlength(10)
                .build()
            ),
            description: new FormControl(
              '',
              new InputValidator('description')
                .required()
                .minlength(10)
                .maxlength(400)
                .build()
            ),
            age: new FormControl(
              0,
              new InputValidator('age').min(3).max(10).build()
            ),
          })
        ),
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
