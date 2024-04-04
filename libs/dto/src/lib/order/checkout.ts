import { CheckoutStatus, ICreateCheckoutDto, IID } from '@webpackages/model';
import {
  BooleanProperty,
  Dto,
  ObjectIdProperty,
  PositiveNumberProperty,
  StringProperty,
} from '@webpackages/property';

@Dto()
export class CreateCheckoutDto implements ICreateCheckoutDto {
  @ObjectIdProperty() employee!: IID;
  @ObjectIdProperty() customer!: IID;
  @ObjectIdProperty() shoppingCart!: IID;
  @StringProperty() federalTaxExemptID!: string;
  @StringProperty() stateTaxExemptID!: string;
  @StringProperty() status!: CheckoutStatus;
  @PositiveNumberProperty() subtotal!: number;
  @PositiveNumberProperty() tax!: number;
  @PositiveNumberProperty() total!: number;
  @BooleanProperty() taxexempt!: boolean;
}
