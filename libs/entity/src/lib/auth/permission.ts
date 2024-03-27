import { Entity } from 'typeorm';
import { IPermission } from '@webpackages/model';
import { IDEntity, NameColumn } from '../common';

@Entity()
export class Permission extends IDEntity implements IPermission {
  @NameColumn() permission!: string;
}
