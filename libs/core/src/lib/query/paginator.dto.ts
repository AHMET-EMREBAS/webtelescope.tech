import { Dto, Property } from '../property/property';

@Dto()
export class PaginatorDto {
  @Property({ type: 'integer', minimum: 0, maximum: 400 })
  take?: number;

  @Property({ type: 'integer', minimum: 0 })
  skip?: number;
}
