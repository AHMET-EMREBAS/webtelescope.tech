import { ICreateShoppingCart, IID } from '@webpackages/model';
import { Dto, ObjectIdProperty } from '@webpackages/property';

@Dto()
export class CreateShoppingCartDto implements ICreateShoppingCart {
  @ObjectIdProperty() customer!: IID;
}
