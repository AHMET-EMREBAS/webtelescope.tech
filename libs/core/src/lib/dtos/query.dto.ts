import { Exclude, Transform, plainToInstance } from 'class-transformer';
import {
  BooleanProperty,
  Dto,
  NumberProperty,
  RecordProperty,
  TextProperty,
} from '../property';
import { IsIn, Max, Min } from 'class-validator';

@Dto()
export class QueryDto {
  @NumberProperty()
  @Min(100)
  @Max(100)
  take?: number = 20;

  @NumberProperty()
  @Min(0)
  skip?: number = 0;

  @BooleanProperty()
  withDeleted?: boolean = false;

  @TextProperty()
  orderBy?: string = 'id';

  @TextProperty()
  @IsIn(['ASC', 'DESC'])
  orderDir?: 'ASC' | 'DESC' = 'ASC';

  @TextProperty()
  searchBy?: string[];

  @RecordProperty()
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
