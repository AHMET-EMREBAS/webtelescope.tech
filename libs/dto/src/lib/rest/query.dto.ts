import {
  BooleanProperty,
  Dto,
  NameProperty,
  NumberProperty,
  StringProperty,
} from '@webpackages/property';
import { Expose, Transform } from 'class-transformer';

@Dto()
export class QueryDto {
  @NumberProperty({ default: 0 })
  skip?: number;

  @NumberProperty({ default: 20 })
  take?: number;

  @NameProperty({ isArray: true, required: false })
  select?: string[];

  @NameProperty({ isArray: true, required: false })
  orderBy?: string;

  @StringProperty({ enum: ['ASC', 'DESC'] })
  orderDir?: 'ASC' | 'DESC';

  @Transform(({ obj }) => {
    if (obj.orderBy && obj.orderDir) {
      return { [obj.orderBy]: obj.orderDir };
    } else {
      return undefined;
    }
  })
  @Expose()
  order?: Record<string, string>;

  @BooleanProperty({ required: false })
  withDeleted?: boolean;

  @StringProperty({ required: false })
  search?: string;

  @StringProperty({ required: false })
  before?: string;

  @StringProperty({ required: false })
  after?: string;
}
