import { InputObject, Property } from '../property';

@InputObject()
export class RelationDto {
  @Property({ type: 'integer', minimum: 1 }) entityId!: number;
  @Property({ type: 'string', minimum: 3, maximum: 30 }) relationName!: string;
  @Property({ type: 'integer', minimum: 1 }) relationId!: number;
}
