import { IPermission } from '@webpackages/common';
import { Column, Entity, TimestampEntity } from '@webpackages/core';

@Entity()
export class Permission extends TimestampEntity implements IPermission {
  @Column({ type: 'string', unique: true }) name!: string;
}
