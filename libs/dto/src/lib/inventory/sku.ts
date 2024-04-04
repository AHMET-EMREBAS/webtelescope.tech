import { ICreateSkuDto } from '@webpackages/model';
import { EanProperty, Dto, ObjectIdProperty } from '@webpackages/property';

@Dto()
export class CreateSkuDto implements ICreateSkuDto {
  @EanProperty() barcode!: string;
  @ObjectIdProperty() sku!: string;
}
