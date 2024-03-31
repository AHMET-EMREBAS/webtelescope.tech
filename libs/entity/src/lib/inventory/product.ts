import { IProduct } from '@webpackages/model';
import {
  UniqueTextColumn,
  Entity,
  TimestampEntity,
  NameColumn,
  TextColumn,
} from '@webpackages/typeorm';

@Entity()
export class Product extends TimestampEntity implements IProduct {
  @NameColumn() productName!: string;
  @TextColumn() productDescription!: string;
  @UniqueTextColumn() barcode!: string;
}
