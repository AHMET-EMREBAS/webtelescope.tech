import { IProduct } from '@webpackages/model';
import {
  Entity,
  TimestampEntity,
  StringColumn,
  UniqueNameColumn,
} from '@webpackages/typeorm';

@Entity()
export class Product extends TimestampEntity implements IProduct {
  @UniqueNameColumn() productName!: string;
  @StringColumn({}) productDescription!: string;
  @UniqueNameColumn() barcode!: string;
}
