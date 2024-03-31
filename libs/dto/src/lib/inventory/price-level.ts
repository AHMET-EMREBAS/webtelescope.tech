import { ICreatePriceLevelDto } from '@webpackages/model';
import { Dto, NameProperty } from '@webpackages/property';

@Dto()
export class CreatePriceLevelDto implements ICreatePriceLevelDto {
  @NameProperty() priceLevelName!: string;
}
