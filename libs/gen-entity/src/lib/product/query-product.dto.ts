import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryProductDto } from '@webpackages/gen-model';
@Dto()
export class QueryProductDto implements IQueryProductDto {
  @Property({}) barcode?: string;
  /**
   * Required unique short text
   */
  @Property({ description: 'Required unique short text' }) name?: string;
  @Property({}) description?: string;
  @Property({ type: 'string' }) categoryName?: string;
  @Property({ type: 'string' }) departmentName?: string;
}
