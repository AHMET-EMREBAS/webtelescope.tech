import { Dto, Property } from '@webpackages/core';
import { IUpdateProductReturnDto } from '@webpackages/common';
@Dto()
export class UpdateProductReturnDto implements IUpdateProductReturnDto {
  @Property({ type: 'string', maxLength: 1000, inputType: 'textarea' })
  description?: string;
  @Property({ type: 'number', minimum: 0 }) quantity?: number;
  @Property({ type: 'object', objectType: IDDto }) order?: IDDto;
  @Property({ type: 'object', objectType: IDDto }) employee?: IDDto;
}
