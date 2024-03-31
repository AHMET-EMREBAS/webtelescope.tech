import { ICreateOrderDto, IID } from '@webpackages/model';
import {
  Dto,
  ObjectIdProperty,
  PositiveIntegerProperty,
} from '@webpackages/property';

@Dto()
export class CreateOrderDto implements ICreateOrderDto {
  @PositiveIntegerProperty() quantity!: number;
  @ObjectIdProperty() sku!: IID;
  @ObjectIdProperty() shoppingCart!: IID;
}
