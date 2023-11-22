import { Dto, Property } from '../decorators';

@Dto()
export class IDDto {
  @Property({ type: 'int', minimum: 1 })
  id!: number;
}


