import { BaseModel } from './base';

export interface RoleModel<Permission> extends BaseModel {
  name: string;
  permissions: Permission[];
}
