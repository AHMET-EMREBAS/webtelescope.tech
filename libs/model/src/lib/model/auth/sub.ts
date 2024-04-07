import { ICredentials, IID } from '../../common';

export interface ISub<SubType extends IID> extends IID, ICredentials {
  subType: SubType;
  organizationName: string;
}
