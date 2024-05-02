import { Dto, Property, IDDto } from '@webpackages/core';
import { IUpdateProductReturnDto } from '@webpackages/gen-model';
@Dto()
export class UpdateProductReturnDto implements IUpdateProductReturnDto {
  @Property({ type: 'string', maxLength: 1000, inputType: 'textarea' })
  description?: string;
  @Property({ type: 'number', minimum: 0 }) quantity?: number;
  @Property({ type: 'object', objectType: IDDto }) order?: IDDto;
  @Property({ type: 'object', objectType: IDDto }) user?: IDDto;
}
