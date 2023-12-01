import { Exclude } from 'class-transformer';
import { Property } from '../validation';
import { PickType } from '@nestjs/swagger';

export const RELATION_PATH = ':id/:relationName';
export const RELATION_AND_ID_PATH = ':id/:relationName/:relationId';

/**
 * Crud Relation DTO
 */
@Exclude()
export class RelationAndIdDto {
  @Property({ type: 'number', required: true, minimum: 1 }) id!: number;
  @Property({ type: 'string', required: true }) relationName!: string;
  @Property({ type: 'number', required: true, minimum: 1 }) relationId!: number;
}

/**
 * Crud Relation Dto without relationId
 */
@Exclude()
export class RelationDto extends PickType(RelationAndIdDto, [
  'id',
  'relationName',
]) {}
