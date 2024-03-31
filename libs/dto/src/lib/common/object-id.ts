import { Exclude } from 'class-transformer';
import { IID } from '@webpackages/model';
import { PositiveIntegerProperty } from '@webpackages/property';
@Exclude()
export class ObjectIdDto implements IID {
  @PositiveIntegerProperty()
  id!: number;
}
