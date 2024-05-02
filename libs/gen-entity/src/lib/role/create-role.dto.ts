import { Dto, Property, IDDto } from '@webpackages/core';
import { ICreateRoleDto } from '@webpackages/gen-model';
@Dto()
export class CreateRoleDto implements ICreateRoleDto {
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
  @Property({ type: 'object', objectType: IDDto, isArray: true })
  permissions?: IDDto[];
}
