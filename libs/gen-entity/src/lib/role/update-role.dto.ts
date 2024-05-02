import { Dto, Property, IDDto } from '@webpackages/core';
import { IUpdateRoleDto } from '@webpackages/gen-model';
@Dto()
export class UpdateRoleDto implements IUpdateRoleDto {
  /**
   * Required unique short text
   */ @Property({
    type: 'string',
    unique: true,
    description: 'Required unique short text',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
  })
  name?: string;
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
