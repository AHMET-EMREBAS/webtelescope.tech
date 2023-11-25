import { Exclude } from 'class-transformer';
import { Property } from '../decorators/property';

@Exclude()
export class RelationDto {
  @Property({ type: 'number', required: true, inQuery: true })
  id!: number;

  @Property({ type: 'string', required: true, inQuery: true })
  relationName!: string;

  @Property({ type: 'number', required: true, inQuery: true })
  relationId!: number;
}

@Exclude()
export class UnsetRelationDto {
  @Property({ type: 'number', required: true, inQuery: true })
  id!: number;

  @Property({ type: 'string', required: true, inQuery: true })
  relationName!: string;
}
