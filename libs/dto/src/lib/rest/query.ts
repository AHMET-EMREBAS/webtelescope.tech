import {
  BooleanProperty,
  Dto,
  NumberProperty,
  StringProperty,
  URLQueryProperty,
} from '@webpackages/property';
import { Transform } from 'class-transformer';
import { isArray, isString } from 'class-validator';

@Dto()
export class QueryDto<T> {
  @NumberProperty({
    default: 20,
    required: false,
    example: 20,
    description: 'Take number of entities',
  })
  take?: number;

  @NumberProperty({
    default: 0,
    required: false,
    example: 0,
    description: 'Skip number of entities',
  })
  skip?: number;

  @StringProperty({
    isArray: true,
    required: false,
    example: undefined,
    description: 'Select entity fields',
  })
  @Transform(({ value }) => {
    if (isArray(value)) return value;
    if (isString(value)) return [value];
    return value;
  })
  select?: (keyof T)[];

  @URLQueryProperty({
    required: false,
    isArray: true,
    example: ['id:ASC'],
    description: 'Order entities',
  })
  order?: Record<keyof T, 'ASC' | 'DESC'>;

  @BooleanProperty({ required: false, description: 'Include deleted items' })
  withDeleted?: boolean;
}
