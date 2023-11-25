import { Dto } from "./decorators";
import { Property } from "./property";

@Dto()
export class RelationDto {
  @Property({ type: 'number', required: true, inQuery: true })
  id!: number;

  @Property({ type: 'string', required: true, inQuery: true })
  relationName!: string;

  @Property({ type: 'number', required: true, inQuery: true })
  relationId!: number;
}

@Dto()
export class UnsetRelationDto {
  @Property({ type: 'number', required: true, inQuery: true })
  id!: number;

  @Property({ type: 'string', required: true, inQuery: true })
  relationName!: string;
}
