import { Dto, Property } from '@webpackages/core';
import { IUpdateProductDto } from '@webpackages/gen-model';
@Dto()
export class UpdateProductDto implements IUpdateProductDto {
  @Property({ type: 'string', unique: true, minLength: 3, maxLength: 30 })
  name?: string;
  @Property({ type: 'string', maxLength: 600 }) description?: string;
}
