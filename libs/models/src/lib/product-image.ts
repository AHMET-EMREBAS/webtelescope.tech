import { ProductImageModel } from '@webpackages/common';
import { BaseEntity } from './base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './product';

@Entity()
export class ProductImage
  extends BaseEntity
  implements ProductImageModel<Product>
{
  @Column({ type: 'varchar', unique: true })
  name!: string;

  @Column({ type: 'varchar' })
  url!: string;

  @ManyToOne(() => Product, (p) => p.id, { eager: true })
  @JoinColumn()
  product!: Product;
}
