import { ICreateSubscriptionDto } from '@webpackages/model';
import { Dto, NameProperty, ShortTextProperty } from '@webpackages/property';

@Dto()
export class CreateSubscriptionDto implements ICreateSubscriptionDto {
  @NameProperty() subscriptionName!: string;
  @ShortTextProperty() description!: string;
}
