import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryUserImgDto } from '@webpackages/gen-model';
@Dto()
export class QueryUserImgDto implements IQueryUserImgDto {
  /**
   * Image url
   */
  @Property({
    type: 'string',
    description: 'Image url',
    maxLength: 1000,
    inputType: 'url',
    format: 'url',
    icon: 'url',
  })
  url?: string;
  @Property({
    type: 'string',
    maxLength: 1000,
    inputType: 'textarea',
    icon: 'description',
  })
  description?: string;
  @Property({ type: 'string' }) userUsername?: string;
  @Property({ type: 'string' }) userPassword?: string;
}
