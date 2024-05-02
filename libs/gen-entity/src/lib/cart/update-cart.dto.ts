import { Dto, Property, IDDto } from '@webpackages/core';
import { IUpdateCartDto } from '@webpackages/gen-model';
@Dto()
export class UpdateCartDto implements IUpdateCartDto {
  @Property({
    type: 'string',
    maxLength: 1000,
    inputType: 'textarea',
    icon: 'description',
  })
  description?: string;
  /**
   * Is chart checked out or not?
   */ @Property({
    type: 'boolean',
    description: 'Is chart checked out or not?',
    inputType: 'slide-toggle',
  })
  checked?: boolean;
  @Property({ type: 'object', objectType: IDDto }) customer?: IDDto;
  @Property({ type: 'object', objectType: IDDto }) employee?: IDDto;
  @Property({ type: 'object', objectType: IDDto }) store?: IDDto;
}
