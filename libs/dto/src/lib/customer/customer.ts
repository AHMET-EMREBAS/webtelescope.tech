import { ICreateCustomerDto, IID } from '@webpackages/model';
import {
  Dto,
  EmailProperty,
  ObjectIdProperty,
  PasswordProperty,
} from '@webpackages/property';

@Dto()
export class CreateCustomerDto implements ICreateCustomerDto {
  @EmailProperty() username!: string;
  @PasswordProperty() password!: string;
  @ObjectIdProperty() organization!: IID;
  @ObjectIdProperty() priceLevel!: IID;
}
