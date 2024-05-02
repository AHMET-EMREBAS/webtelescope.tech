import { Dto, Property, IDDto } from '@webpackages/core';
import { ICreateProjectDto } from '@webpackages/gen-model';
@Dto()
export class CreateProjectDto implements ICreateProjectDto {
  /**
   * Required unique short text
   */
  @Property({
    type: 'string',
    required: true,
    unique: true,
    description: 'Required unique short text',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
  })
  name!: string;
  @Property({
    type: 'string',
    maxLength: 1000,
    inputType: 'textarea',
    icon: 'description',
  })
  description?: string;
}
