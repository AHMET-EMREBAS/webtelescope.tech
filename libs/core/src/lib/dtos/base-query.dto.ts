import { Exclude } from 'class-transformer';
import { Property } from '../decorators';

@Exclude()
export class BaseQueryDto {
  @Property({
    type: 'number',
    default: 20,
    maximum: 100,
    minimum: 1,
    inQuery: true,
  })
  take = 20;

  @Property({ type: 'number', default: 0, minimum: 0, inQuery: true })
  skip = 0;

  @Property({ type: 'boolean', inQuery: true })
  withDeleted?: boolean = false;
}
