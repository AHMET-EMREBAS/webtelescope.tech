import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@webpackages/core';

@Entity()
export class Sample extends BaseEntity {
  @Column({ type: 'varchar' }) name!: string;
}
