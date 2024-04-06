import { IPermission } from '@webpackages/model';
import { IDEntity, Entity, UniqueNameColumn } from '@webpackages/typeorm';

@Entity()
export class Permission extends IDEntity implements IPermission {
  @UniqueNameColumn() permission!: string;
}
