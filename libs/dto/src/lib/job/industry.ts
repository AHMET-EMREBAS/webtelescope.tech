import { ICreateIndustryDto } from '@webpackages/model';
import { Dto, NameProperty } from '@webpackages/property';

@Dto()
export class CreateIndustryDto implements ICreateIndustryDto {
  @NameProperty() industryName!: string;
}
