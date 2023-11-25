import { BaseEntity, Column, Entity } from '@webpackages/core';

@Entity()
export class Sample extends BaseEntity<Sample> {
  @Column({ type: 'varchar', unique: true }) name!: string;
}


