import { ICreateCompanyDto, IID } from '@webpackages/model';
import {
  Dto,
  ObjectIdProperty,
  RequiredTextProperty,
} from '@webpackages/property';

@Dto()
export class CreateCompanyDto implements ICreateCompanyDto {
  @RequiredTextProperty() companyName!: string;
  @RequiredTextProperty() companyDomain!: string;
  @ObjectIdProperty({ isArray: true }) industries!: IID[];
}
