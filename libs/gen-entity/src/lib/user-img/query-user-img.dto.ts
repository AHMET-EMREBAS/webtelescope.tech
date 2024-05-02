import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryUserImgDto } from '@webpackages/gen-model';
@Dto()
export class QueryUserImgDto implements IQueryUserImgDto {
  /**
   * Image url
   */
  @Property({ description: 'Image url' }) url?: string;
  @Property({}) description?: string;
  @Property({ type: 'string' }) userUsername?: string;
}
