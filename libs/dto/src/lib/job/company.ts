import { ICreateCompanyDto, IID } from '@webpackages/model';
import {
  Dto,
  ObjectIdProperty,
  StringProperty,
  URLProperty,
} from '@webpackages/property';

@Dto()
export class CreateCompanyDto implements ICreateCompanyDto {
  @StringProperty() companyName!: string;
  @URLProperty() companyDomain!: string;
  @ObjectIdProperty({ isArray: true }) industries!: IID[];
}
