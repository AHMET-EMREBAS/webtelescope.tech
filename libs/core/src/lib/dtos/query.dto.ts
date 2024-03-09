import { Exclude, Transform, plainToInstance } from 'class-transformer';
import {
  BooleanProperty,
  Dto,
  NumberProperty,
  ObjectProperty,
  TextProperty,
} from '../property';

@Dto()
export class QueryDto {
  @NumberProperty({ maximum: 100, minimum: 1, default: 20 })
  take?: number = 20;

  @NumberProperty({ minimum: 0, default: 0 })
  skip?: number = 0;

  @BooleanProperty({ default: false })
  withDeleted?: boolean = false;

  @TextProperty({ default: 'id' })
  orderBy?: string = 'id';

  @TextProperty({ enum: ['DESC', 'ASC'] })
  orderDir?: 'ASC' | 'DESC' = 'ASC';

  @ObjectProperty()
  @Transform(({ obj }) => {
    if (obj.orderDir && obj.orderBy) {
      return { [obj.orderBy]: obj.orderDir };
    }
    return undefined;
  })
  order?: Record<string, 'ASC' | 'DESC'>;
}

@Dto()
export class FindManyOptionsDto extends QueryDto {
  @Exclude()
  override orderBy?: string;

  @Exclude()
  override orderDir?: 'ASC' | 'DESC';
}

export function toFindManyOptions(obj: QueryDto): FindManyOptionsDto {
  return plainToInstance(FindManyOptionsDto, obj);
}
