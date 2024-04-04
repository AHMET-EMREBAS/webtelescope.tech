import { ICreateOrderDto, IID } from '@webpackages/model';
import {
  Dto,
  ObjectIdProperty,
  PositiveNumberProperty,
} from '@webpackages/property';

@Dto()
export class CreateOrderDto implements ICreateOrderDto {
  @PositiveNumberProperty() quantity!: number;
  @ObjectIdProperty() sku!: IID;
  @ObjectIdProperty() shoppingCart!: IID;
}
