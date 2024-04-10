import { IOrg } from '../../model';

export interface ICreateOrgDto extends Pick<IOrg, 'orgname'> {}
