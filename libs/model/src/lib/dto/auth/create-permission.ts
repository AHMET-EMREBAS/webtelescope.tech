import { IPermission } from '../../model';

export interface ICreatePermissionDto extends Pick<IPermission, 'permission'> {}
