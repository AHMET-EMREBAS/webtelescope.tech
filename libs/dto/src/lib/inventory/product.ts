import { ICreateProductDto } from '@webpackages/model';
import {
  BarcodeProperty,
  Dto,
  NameProperty,
  ShortTextProperty,
} from '@webpackages/property';

@Dto()
export class CreateProductDto implements ICreateProductDto {
  @NameProperty() productName!: string;
  @ShortTextProperty() productDescription!: string;
  @BarcodeProperty() barcode!: string;
}
