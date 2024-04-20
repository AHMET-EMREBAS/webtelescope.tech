import { Dto, Property } from './property';

@Dto()
export class PaginatorDto {
  @Property({ type: 'integer', description: 'Limit the number of items' })
  take?: number;

  @Property({ type: 'integer', description: 'Skip the number of items' })
  skip?: number;
}
