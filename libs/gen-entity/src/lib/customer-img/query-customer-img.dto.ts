import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryCustomerImgDto } from '@webpackages/gen-model';
@Dto()
export class QueryCustomerImgDto implements IQueryCustomerImgDto {
  /**
   * Image url
   */
  @Property({ description: 'Image url' }) url?: string;
  @Property({}) description?: string;
  @Property({ type: 'string' }) customerUsername?: string;
}
