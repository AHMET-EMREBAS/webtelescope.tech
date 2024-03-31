import { ICreateQuantityDto, IID } from '@webpackages/model';
import {
  Dto,
  ObjectIdProperty,
  PositiveNumberProperty,
} from '@webpackages/property';

@Dto()
export class CreateQuantityDto implements ICreateQuantityDto {
  @PositiveNumberProperty() quantity!: number;
  @ObjectIdProperty() sku!: IID;
  @ObjectIdProperty() store!: IID;
}
