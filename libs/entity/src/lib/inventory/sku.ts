import { ISku } from '@webpackages/model';
import {
  NameColumn,
  TextColumn,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';

@Entity()
export class Sku extends TimestampEntity implements ISku {
  @NameColumn() sku!: string;
  @TextColumn() barcode!: string;
}
