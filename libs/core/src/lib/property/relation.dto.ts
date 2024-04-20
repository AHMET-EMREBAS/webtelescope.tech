import { Dto, Property } from './property';

@Dto()
export class RelationDto {
  @Property({ type: 'integer' }) entityId!: number;
  @Property({ type: 'string' }) relationName!: string;
  @Property({ type: 'integer' }) relationId!: number;
}
