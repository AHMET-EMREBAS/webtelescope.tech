import { IID } from '../../common';
import { IOAuth } from '../../model';

export interface ICreateOAuthDto
  extends Pick<IOAuth<IID, IID>, 'name' | 'organization' | 'scope'> {}
