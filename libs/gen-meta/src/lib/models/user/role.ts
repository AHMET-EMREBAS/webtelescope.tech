import {
  DescriptionProperty,
  ManyRelation,
  Model,
  UniqueNameProperty,
} from '../../core';
import { PermissionModel } from './permission';

export const RoleModel: Model = {
  modelName: 'Role',
  properties: {
    name: UniqueNameProperty(),
    description: DescriptionProperty(),
  },
  relations: {
    permissions: ManyRelation(PermissionModel),
  },
};
