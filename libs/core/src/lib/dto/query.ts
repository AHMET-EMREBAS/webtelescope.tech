/* eslint-disable @typescript-eslint/no-explicit-any */
import { Exclude, Expose, Transform } from 'class-transformer';
import { Property } from '../validation';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Search, paginate, and order entities
 */
@Exclude()
export class QueryDto {
  @Property({
    type: 'number',
    minimum: 0,
    maximum: 100,
    default: 20,
    inQuery: true,
  })
  take: number = 20;

  @Property({ type: 'number', minimum: 0, default: 0, inQuery: true })
  skip: number = 0;

  @Property({ type: 'boolean', default: false, inQuery: true })
  withDeleted = false;

  @Property({ type: 'string', default: 'id' })
  orderBy = 'id';

  @Property({ type: 'string', enum: ['ASC', 'DESC'], default: 'ASC' })
  orderDir = 'ASC';

  @Property({ type: 'string', maxLength: 30 })
  search = '';

  @Property({ type: 'array' })
  @Transform(({ value }) => value && (value as string).split(',').map((e) => e.trim()))
  select?: any[];
}
