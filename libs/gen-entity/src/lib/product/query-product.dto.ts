import { Dto, Property } from '@webpackages/core';
import { IQueryProductDto } from '@webpackages/gen-model';
@Dto()
export class QueryProductDto implements IQueryProductDto {
  @Property({ type: 'string', minLength: 3, maxLength: 30 }) name?: string;
  @Property({ type: 'string', maxLength: 600 }) description?: string;
}
