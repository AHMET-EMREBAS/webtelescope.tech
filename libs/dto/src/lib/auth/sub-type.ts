import { ICreateSubTypeDto } from '@webpackages/model';
import { Dto, NameProperty, StringProperty } from '@webpackages/property';

@Dto()
export class CreateSubTypeDto implements ICreateSubTypeDto {
  @NameProperty() subscriptionName!: string;
  @StringProperty({ required: false }) description!: string;
}
