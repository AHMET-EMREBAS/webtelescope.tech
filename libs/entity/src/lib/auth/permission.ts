import { IPermission } from '@webpackages/model';
import { IDEntity, StringColumn, Entity } from '@webpackages/typeorm';

@Entity()
export class Permission extends IDEntity implements IPermission {
  @StringColumn() permission!: string;
}
