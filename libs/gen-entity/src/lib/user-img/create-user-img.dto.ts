import { Dto, Property, IDDto } from '@webpackages/core';
import { ICreateUserImgDto } from '@webpackages/gen-model';
@Dto()
export class CreateUserImgDto implements ICreateUserImgDto {
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
