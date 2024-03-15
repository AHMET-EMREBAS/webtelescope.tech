/* eslint-disable @typescript-eslint/no-explicit-any */
import { OmitType } from '@nestjs/swagger';
import { Dto, Property } from '../decorators';
import {
  QueryParamTransformer,
  WhereQueryTransformer,
} from '../decorators/property-transformers';
import { ClassConstructor } from 'class-transformer';
import { BaseEntity } from './base';

export function CreateQueryDto<T extends BaseEntity>(
  columns: (keyof T)[] = []
): ClassConstructor<any> {
  @Dto()
  class QueryDto {
    @Property({
      type: 'number',
      minimum: 1,
      maximum: 400,
    })
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

    @Property({
      type: 'string',
      isArray: true,
      enum: [
        ...columns,
        'id',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'active',
      ] as string[],
    })
    @QueryParamTransformer({ type: 'string', isArray: true, default: [] })
    select?: any[];
  }

  return QueryDto;
}

@Dto()
export class GenericQueryDto extends CreateQueryDto() {}

@Dto()
export class AddRelationDto {
  @Property({ type: 'number', minimum: 1, required: true })
  @QueryParamTransformer({ type: 'number' })
  id!: number;

  @Property({ type: 'number', minimum: 1, required: true })
  @QueryParamTransformer({ type: 'number' })
  rid!: number;

  @Property({ type: 'string', required: true })
  rn!: string;
}

@Dto()
export class RemoveRelationDto extends AddRelationDto {}

@Dto()
export class SetRelationDto extends AddRelationDto {}

@Dto()
export class UnsetRelationDto extends OmitType(AddRelationDto, ['rid']) {}

@Dto()
export class IDDto {
  @Property({ type: 'number', minimum: 1, required: true })
  @QueryParamTransformer({ type: 'number' })
  id!: number;
}
