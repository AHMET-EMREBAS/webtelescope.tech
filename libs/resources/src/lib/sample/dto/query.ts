/* eslint-disable @typescript-eslint/no-explicit-any */

import { Property, BaseQueryDto } from '@webpackages/core';
import { Exclude } from 'class-transformer';

@Exclude()
export class QuerySampleDto extends BaseQueryDto {
  @Property({ type: 'string', maxLength: 50, inQuery: true })
  search?: string;

  @Property({ type: 'string', maxLength: 50, inQuery: true })
  orderBy?: 'name';

  @Property({ type: 'string', enum: ['ASC', 'DESC'], inQuery: true })
  orderDir?: 'ASC' | 'DESC';
}
