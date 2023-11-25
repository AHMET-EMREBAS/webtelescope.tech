import { Dto } from "./decorators";
import { Property } from "./property";

@Dto()
export class FindOptionsDto {
  @Property({ type: 'number', default: 20, maximum: 100, minimum: 1 })
  take = 20;

  @Property({ type: 'number', default: 0, minimum: 0 })
  skip = 0;

  @Property({ type: 'boolean' })
  withDeleted?: boolean = false;

  @Property({ type: 'string', maxLength: 50 })
  search?: string;

  @Property({ type: 'string', maxLength: 50 })
  orderBy?: string;

  @Property({ type: 'string', enum: ['asc', 'desc'] })
  orderDir?: string;
}
