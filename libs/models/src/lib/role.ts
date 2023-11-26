import { BaseModel } from '@webpackages/common';
import { BaseEntity } from './base';
import { Permission } from './permission';
import { Column, Entity, JoinColumn, ManyToMany } from 'typeorm';

@Entity()
export class Role extends BaseEntity implements BaseModel {
  @Column({ type: 'varchar', unique: true })
  name!: string;

  @ManyToMany(() => Permission, (p) => p.id, { eager: true })
  @JoinColumn()
  permissions!: Permission[];
}
