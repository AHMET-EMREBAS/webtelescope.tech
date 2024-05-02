import { Dto, Property, IDDto } from '@webpackages/core';
import { ICreateCartDto } from '@webpackages/gen-model';
@Dto()
export class CreateCartDto implements ICreateCartDto {
  @Property({
    type: 'string',
    maxLength: 1000,
    inputType: 'textarea',
    icon: 'description',
  })
  description?: string;
  /**
   * Is chart checked out or not?
   */
  @Property({
    type: 'boolean',
    description: 'Is chart checked out or not?',
    inputType: 'slide-toggle',
  })
  checked?: boolean;
  @Property({ type: 'object', objectType: IDDto, required: true })
  customer!: IDDto;
  @Property({ type: 'object', objectType: IDDto, required: true }) user!: IDDto;
  @Property({ type: 'object', objectType: IDDto, required: true })
  store!: IDDto;
}
