import { Dto, Property } from '@webpackages/core';
import { IUpdateUserImgDto } from '@webpackages/common';
@Dto()
export class UpdateUserImgDto implements IUpdateUserImgDto {
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
  @Property({ type: 'object', objectType: IDDto }) owner?: IDDto;
}
