import { Transform } from 'class-transformer';
import { Dto, Property } from '../property/property';

@Dto()
export class PaginatorDto {
  @Property({ type: 'integer', minimum: 0, maximum: 400 })
  @Transform(({ value }) => (value && parseInt(value)) ?? 20)
  take?: number;

  @Property({ type: 'integer', minimum: 0 })
  @Transform(({ value }) => (value && parseInt(value)) ?? 0)
  skip?: number;
}
