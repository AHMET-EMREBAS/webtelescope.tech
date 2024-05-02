import { Dto, Property, IDDto } from '@webpackages/core';
import { IUpdateProductImgDto } from '@webpackages/gen-model';
@Dto()
export class UpdateProductImgDto implements IUpdateProductImgDto {
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
  @Property({ type: 'object', objectType: IDDto }) product?: IDDto;
}