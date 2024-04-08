/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IQuery,
  IWhere,
  QueryOperator,
  transformStringToWhereObject,
} from '@webpackages/model';
import {
  BooleanProperty,
  Dto,
  NumberProperty,
  ObjectProperty,
  StringProperty,
  URLQueryProperty,
} from '@webpackages/property';
import { Transform } from 'class-transformer';
import { isArray, isString } from 'class-validator';
import { ILike, LessThan, MoreThan } from 'typeorm';

export function transformWhereObjectToFindOperator(where: IWhere) {
  const { operator, value } = where;
  if (operator === QueryOperator.equal) {
    return ILike(value);
  } else if (operator === QueryOperator.contains) {
    return ILike(`%${value}%`);
  } else if (operator === QueryOperator.startWith) {
    return ILike(`${value}%`);
  } else if (operator === QueryOperator.endWith) {
    return ILike(`%${value}`);
  } else if (operator === QueryOperator.lessThan) {
    return LessThan(value);
  } else if (operator === QueryOperator.moreThan) {
    return MoreThan(value);
  }

  return undefined;
}

@Dto()
export class WhereDto implements IWhere {
  @StringProperty() property!: string;
  @StringProperty() operator!: QueryOperator;
  @StringProperty() value!: string;
}

export function WhereTransformer() {
  return Transform(({ value }) => {
    const v = value ? (isArray(value) ? value : [value]) : [];
    return (v as string[])
      ?.map((e) => {
        const whereObj = transformStringToWhereObject(e);
        if (whereObj) {
          const findOperator = transformWhereObjectToFindOperator(whereObj);
          const { property } = whereObj;
          if (findOperator) {
            return { [property]: findOperator };
          }
        }
        return undefined;
      })
      .filter((e) => e);
  });
}

@Dto()
export class QueryDto implements IQuery {
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
  select?: any[];

  @StringProperty({
    isArray: true,
    required: false,
    example: undefined,
    description: 'Include relations.',
  })
  @Transform(({ value }) => {
    if (isArray(value)) return value;
    if (isString(value)) return [value];
    return value;
  })
  relations?: any[];

  @URLQueryProperty({
    required: false,
    isArray: true,
    example: ['id:ASC'],
    description: 'Order entities',
  })
  order?: any;

  @ObjectProperty({ objectType: WhereDto, isArray: true, required: false })
  @WhereTransformer()
  where?: WhereDto[];

  @BooleanProperty({
    required: false,
    description: 'Include deleted items',
    default: false,
  })
  withDeleted?: boolean;

  @BooleanProperty({
    required: false,
    description: 'Load eager relations',
  })
  loadEagerRelations?: boolean;
}
