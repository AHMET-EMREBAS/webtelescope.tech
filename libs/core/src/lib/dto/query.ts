import { Exclude } from 'class-transformer';
import { Property } from '../validation';

/**
 * Search, paginate, and order entities
 */
@Exclude()
export class QueryDto {
  @Property({ type: 'number', minimum: 0, maximum: 100, default: 20 })
  take?: number;

  @Property({ type: 'number', minimum: 0, default: 0 })
  skip?: number;

  @Property({ type: 'boolean', default: false })
  withDeleted?: boolean;

  @Property({ type: 'string' })
  orderBy?: string;

  @Property({ type: 'string', enum: ['ASC', 'DESC'] })
  orderDir?: string;

  @Property({ type: 'string', maxLength: 30 })
  search?: string;
}
