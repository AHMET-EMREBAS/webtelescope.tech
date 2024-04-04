import { ICreateOrganizationDto } from '@webpackages/model';
import { Dto, NameProperty } from '@webpackages/property';

/**
 * @param organizationName {@link organizationName}
 */
@Dto()
export class CreateOrganizationDto implements ICreateOrganizationDto {
  @NameProperty() organizationName!: string;
}
