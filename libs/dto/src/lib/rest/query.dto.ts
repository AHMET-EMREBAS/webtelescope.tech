import {
  Dto,
  NameProperty,
  PositiveIntegerProperty,
} from '@webpackages/property';
import { Expose, Transform } from 'class-transformer';

@Dto()
export class QueryDto {
  @PositiveIntegerProperty({ defaultValue: 0 })
  skip?: number;

  @PositiveIntegerProperty({ defaultValue: 20 })
  take?: number;

  @NameProperty({ isArray: true, required: false })
  select?: string[];

  @NameProperty({ isArray: true, required: false })
  orderBy?: string;

  @Property({ name: 'orderDir', type: 'string' })
  orderDir?: 'ASC' | 'DESC' | '-1' | '1';

  @Transform(({ obj }) => {
    if (obj.orderBy && obj.orderDir) {
      return { [obj.orderBy]: obj.orderDir };
    } else {
      return undefined;
    }
  })
  @Expose()
  order?: Record<string, string>;

  @Property({ name: 'withDeleted', type: 'boolean' })
  withDeleted?: boolean;

  @Property({ name: 'search', type: 'string' })
  search?: string;

  @Property({ name: 'before', type: 'string' })
  before?: string;

  @Property({ name: 'after', type: 'string' })
  after?: string;
}
