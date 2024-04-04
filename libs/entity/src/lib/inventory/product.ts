import { IProduct } from '@webpackages/model';
import { Entity, TimestampEntity, StringColumn } from '@webpackages/typeorm';

@Entity()
export class Product extends TimestampEntity implements IProduct {
  @StringColumn({ unique: true }) productName!: string;
  @StringColumn({}) productDescription!: string;
  @StringColumn({ unique: true }) barcode!: string;
}
