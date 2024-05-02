import { PickType } from '@nestjs/swagger';
import { Dto, Property } from '../property';

@Dto()
export class RelationDto {
  @Property({ type: 'integer', minimum: 1 }) entityId!: number;
  @Property({ type: 'string', minimum: 3, maximum: 30 }) relationName!: string;
  @Property({ type: 'integer', minimum: 1 }) relationId!: number;
}

@Dto()
export class UnsetRelationDto extends PickType(RelationDto, [
  'entityId',
  'relationName',
]) {}
