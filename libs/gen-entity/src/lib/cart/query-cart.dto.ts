import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryCartDto } from '@webpackages/gen-model';
@Dto()
export class QueryCartDto implements IQueryCartDto {
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
  @Property({ type: 'string' }) customerUsername?: string;
  @Property({ type: 'string' }) customerPassword?: string;
  @Property({ type: 'string' }) userUsername?: string;
  @Property({ type: 'string' }) userPassword?: string;
  @Property({ type: 'string' }) storeName?: string;
}
