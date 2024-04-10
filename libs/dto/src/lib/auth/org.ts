import { ICreateOrgDto } from '@webpackages/model';
import { Dto, NameProperty } from '@webpackages/property';

/**
 * @param organizationName {@link orgname}
 */
@Dto()
export class CreateOrgDto implements ICreateOrgDto {
  @NameProperty() orgname!: string;
}
