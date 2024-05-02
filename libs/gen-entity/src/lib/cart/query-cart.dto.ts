import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryCartDto } from '@webpackages/gen-model';
@Dto()
export class QueryCartDto implements IQueryCartDto {
  @Property({}) description?: string;
  /**
   * Is chart checked out or not?
   */
  @Property({ description: 'Is chart checked out or not?' }) checked?: boolean;
  @Property({ type: 'string' }) customerUsername?: string;
  @Property({ type: 'string' }) userUsername?: string;
  @Property({ type: 'string' }) storeName?: string;
}
