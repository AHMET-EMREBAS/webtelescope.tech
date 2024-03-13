/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dto, Property } from '../decorators';
import {
  QueryParamTransformer,
  WhereQueryTransformer,
} from '../decorators/property-transformers';

@Dto()
export class QueryDto {
  @Property({ type: 'number', minimum: 1, maximum: 400 })
  @QueryParamTransformer({ type: 'number', default: 20 })
  take?: number;

  @Property({ type: 'number', minimum: 0 })
  @QueryParamTransformer({ type: 'number', default: 0 })
  skip?: number;

  @Property({ type: 'object' })
  @QueryParamTransformer({ type: 'object', default: { id: 'ASC' } })
  order?: Record<string, 'ASC' | 'DESC'>;

  @Property({ type: 'object', isArray: true })
  @WhereQueryTransformer({ type: 'object', default: [] })
  where?: any[];

  @Property({ type: 'boolean' })
  @QueryParamTransformer({ type: 'boolean', default: false })
  withDeleted?: boolean;

  @Property({ type: 'string', isArray: true })
  @QueryParamTransformer({ type: 'string', isArray: true, default: [] })
  select?: string[];
}
