import { Dto, Property } from '@webpackages/core';
import { IQueryCustomerImgDto } from '@webpackages/common';
@Dto()
export class QueryCustomerImgDto implements IQueryCustomerImgDto {
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
  @Property({ type: 'string' }) customerUsername?: string;
  @Property({ type: 'string' }) customerPassword?: string;
}
