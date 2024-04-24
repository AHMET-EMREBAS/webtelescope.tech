import { IScope } from '@webpackages/common';
import { Column, Entity, TimestampEntity } from '@webpackages/core';

@Entity()
export class Scope extends TimestampEntity implements IScope {
  @Column({ type: 'string', unique: true }) name!: string;
}
