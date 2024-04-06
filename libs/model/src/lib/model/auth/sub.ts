import { ICredentials } from '../../common';

export interface ISub<SubType> extends ICredentials {
  subType: SubType;
  organizationName: string;
}
