import { BaseEntity } from '@webpackages/core';
import { Column, Entity } from 'typeorm';

@Entity()
export class Sample extends BaseEntity {
  @Column({ type: 'varchar', unique: true }) name!: string;
}
