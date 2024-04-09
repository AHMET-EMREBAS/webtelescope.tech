import { IID, ITimestamp } from '../../common';

export interface IOAuth<Organization extends IID, Scope extends IID>
  extends IID,
    ITimestamp {
  name: string;
  apiKey: string;
  organization: Organization;
  scope: Scope;
}
