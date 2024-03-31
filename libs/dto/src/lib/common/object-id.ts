import { IID } from '@webpackages/model';
import { PositiveIntegerProperty, Dto } from '@webpackages/property';

@Dto()
export class ObjectIdDto implements IID {
  @PositiveIntegerProperty()
  id!: number;
}
