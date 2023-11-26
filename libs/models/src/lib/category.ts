import { CategoryModel } from '@webpackages/common';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base';

@Entity()
export class Category extends BaseEntity implements CategoryModel {
  @Column({ type: 'varchar', unique: true })
  name!: string;
}
