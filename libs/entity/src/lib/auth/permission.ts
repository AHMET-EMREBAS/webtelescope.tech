import { IPermission } from '@webpackages/model';
import { IDEntity, NameColumn, Entity } from '@webpackages/typeorm';

@Entity()
export class Permission extends IDEntity implements IPermission {
  @NameColumn() permission!: string;
}
