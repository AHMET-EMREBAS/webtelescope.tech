import { ICreateStoreDto, IID } from '@webpackages/model';
import { Dto, NameProperty, ObjectIdProperty } from '@webpackages/property';

@Dto()
export class CreateStoreDto implements ICreateStoreDto {
  @NameProperty() storeName!: string;
  @ObjectIdProperty() priceLevel!: IID;
}
