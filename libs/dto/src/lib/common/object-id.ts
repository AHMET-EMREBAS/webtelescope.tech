import { Exclude } from 'class-transformer';
import { IID } from '@webpackages/model';
import { PositiveIntegerProperty } from '../properties/number';

@Exclude()
export class ObjectIdDto implements IID {
  @PositiveIntegerProperty()
  id!: number;
}
