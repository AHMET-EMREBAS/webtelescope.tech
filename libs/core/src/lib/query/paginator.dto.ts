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

  @Property({ type: 'string' })
  @Transform(({ value }) => {
    if (value) {
      const [key, dir] = value.split(':');

      if (key && dir) {
        if (['asc', 'desc', 'ASC', 'DESC'].includes(dir)) {
          return { [key]: dir };
        }
      }
    }

    return {};
  })
  order?: Record<string, any>;
}
