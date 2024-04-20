import { Entity, Column, IDEntity } from '@webpackages/core';
import { ISample } from '@webpackages/common';

@Entity()
export class Sample extends IDEntity implements ISample {
  @Column({ type: 'string', unique: true }) name!: string;
}
