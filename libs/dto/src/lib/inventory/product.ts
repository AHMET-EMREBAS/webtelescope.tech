import { ICreateProductDto } from '@webpackages/model';
import {
  Dto,
  EanProperty,
  NameProperty,
  StringProperty,
} from '@webpackages/property';

@Dto()
export class CreateProductDto implements ICreateProductDto {
  @NameProperty() productName!: string;
  @StringProperty() productDescription!: string;
  @EanProperty() barcode!: string;
}
