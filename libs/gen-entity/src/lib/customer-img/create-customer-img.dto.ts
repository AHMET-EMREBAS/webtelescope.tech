import { Dto, Property } from '@webpackages/core';
import { ICreateCustomerImgDto } from '@webpackages/common';
@Dto()
export class CreateCustomerImgDto implements ICreateCustomerImgDto {
  /**
   * Image url
   */ @Property({
    type: 'string',
    required: true,
    description: 'Image url',
    maxLength: 1000,
    inputType: 'url',
    format: 'url',
    icon: 'url',
  })
  url!: string;
  @Property({
    type: 'string',
    maxLength: 1000,
    inputType: 'textarea',
    icon: 'description',
  })
  description?: string;
  @Property({ type: 'object', objectType: IDDto, required: true })
  owner!: IDDto;
}
