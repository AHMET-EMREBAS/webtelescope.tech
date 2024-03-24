import { IDomain, IID } from '../../common';

export interface ISocialProfile extends IID, IDomain {
  profileLink: string;
}
