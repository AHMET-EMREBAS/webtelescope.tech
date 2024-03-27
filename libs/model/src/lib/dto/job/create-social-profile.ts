import { IID } from '../../common';
import { ISocialProfile } from '../../model';

export interface ICreateSocialProfileDto
  extends Pick<ISocialProfile<IID>, 'profileLink' | 'user'> {}
