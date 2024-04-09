import { IID } from '../../common';
import { IOAuth } from '../../model';

export interface ICreateOAuthDto
  extends Pick<IOAuth<IID>, 'name' | 'organization' | 'scope'> {}
