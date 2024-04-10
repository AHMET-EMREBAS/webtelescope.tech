import { IOAuth } from '../../model';

export interface ICreateOAuthDto
  extends Pick<IOAuth, 'name' | 'app' | 'scopes'> {}
