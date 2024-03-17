import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@webpackages/core';

@Entity()
export class Todo extends BaseEntity {
  @Column({ type: 'varchar' }) name!: string;
}
