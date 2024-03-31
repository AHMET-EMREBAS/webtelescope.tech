import { CheckoutStatus, ICreateCheckoutDto, IID } from '@webpackages/model';
import {
  BooleanProperty,
  Dto,
  ObjectIdProperty,
  PositiveNumberProperty,
  RequiredTextProperty,
  ShortTextProperty,
} from '@webpackages/property';

@Dto()
export class CreateCheckoutDto implements ICreateCheckoutDto {
  @ObjectIdProperty() employee!: IID;
  @ObjectIdProperty() customer!: IID;
  @ObjectIdProperty() shoppingCart!: IID;
  @ShortTextProperty() federalTaxExemptID!: string;
  @ShortTextProperty() stateTaxExemptID!: string;
  @RequiredTextProperty() status!: CheckoutStatus;
  @PositiveNumberProperty() subtotal!: number;
  @PositiveNumberProperty() tax!: number;
  @PositiveNumberProperty() total!: number;
  @BooleanProperty() taxexempt!: boolean;
}
