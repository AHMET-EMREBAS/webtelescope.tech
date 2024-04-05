import { IRootUser } from '../../model';

export interface ICreateRootUserDto
  extends Pick<IRootUser, 'username' | 'password'> {}
