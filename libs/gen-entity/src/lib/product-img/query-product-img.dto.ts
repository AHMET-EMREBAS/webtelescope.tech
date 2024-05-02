import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryProductImgDto } from '@webpackages/gen-model';
@Dto()
export class QueryProductImgDto implements IQueryProductImgDto {
  /**
   * Image url
   */
  @Property({ description: 'Image url' }) url?: string;
  @Property({}) description?: string;
  @Property({ type: 'string' }) productBarcode?: string;
  @Property({ type: 'string' }) productName?: string;
  @Property({ type: 'string' }) productDescription?: string;
}
