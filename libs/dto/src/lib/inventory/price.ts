import { ICreatePriceDto, IID } from '@webpackages/model';
import {
  Dto,
  ObjectIdProperty,
  PositiveNumberProperty,
} from '@webpackages/property';

@Dto()
export class CreatePriceDto implements ICreatePriceDto {
  @PositiveNumberProperty() price!: number;
  @PositiveNumberProperty() cost!: number;
  @ObjectIdProperty() priceLevel!: IID;
  @ObjectIdProperty() sku!: IID;
}
