import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryPermissionDto } from '@webpackages/gen-model';
import { Transform } from 'class-transformer';
import { ILike } from 'typeorm';
@Dto()
export class QueryPermissionDto implements IQueryPermissionDto {
  /**
   * Required unique short text
   */
  @Property({
    type: 'string',
    description: 'Query permission by name.',
    inputType: 'text',
  })
  @Transform(({ value }) => (value && ILike(`%${value}%`)) ?? undefined)
  name?: string;
}
