import { ICreateSubscriptionDto } from '@webpackages/model';
import { Dto, NameProperty, StringProperty } from '@webpackages/property';

@Dto()
export class CreateSubscriptionDto implements ICreateSubscriptionDto {
  @NameProperty() subscriptionName!: string;
  @StringProperty({ required: false }) description!: string;
}
