import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryProductImgDto } from '@webpackages/gen-model';
@Dto()
export class QueryProductImgDto implements IQueryProductImgDto {
  /**
   * Image url
   */ @Property({
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
  @Property({ type: 'string' }) productBarcode?: string;
  @Property({ type: 'string' }) productName?: string;
  @Property({ type: 'string' }) productDescription?: string;
}
