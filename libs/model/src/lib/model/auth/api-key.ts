import { IID, ITimestamp } from '../../common';

export interface ApiKey<Organization extends IID> extends IID, ITimestamp {
  key: string;
  value: string;
  organization: Organization;
  scope: string;
}
