import { IOrganization } from '../../model';

export interface ICreateOrganizationDto
  extends Pick<IOrganization, 'organizationName'> {}
