import { ICreateSkuDto } from '@webpackages/model';
import { BarcodeProperty, Dto, ObjectIdProperty } from '@webpackages/property';

@Dto()
export class CreateSkuDto implements ICreateSkuDto {
  @BarcodeProperty() barcode!: string;
  @ObjectIdProperty() sku!: string;
}
