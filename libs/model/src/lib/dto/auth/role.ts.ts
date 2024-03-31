import { IID } from '../../common';
import { IRole } from '../../model';

export interface ICreateRoleDto
  extends Pick<IRole<IID>, 'permissions' | 'role'> {}
