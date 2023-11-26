import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base';
import { ProductModel } from '@webpackages/common';
import { Category } from './category';

@Entity()
export class Product extends BaseEntity implements ProductModel<Category> {
  @Column({ type: 'varchar', unique: true })
  name!: string;
  
  @Column({ type: 'varchar', unique: true })
  upc!: string;
  
  @Column({ type: 'varchar' })
  description!: string;
  

  @ManyToOne(() => Category, (c) => c.id, { eager: true })
  @JoinColumn()
  category!: Category;
}
