import { ICreateOrganizationDto } from '@webpackages/model';
import { Dto, NameProperty } from '@webpackages/property';

@Dto()
export class CreateOrganizationDto implements ICreateOrganizationDto {
  @NameProperty() organizationName!: string;
}
