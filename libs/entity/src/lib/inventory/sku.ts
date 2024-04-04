import { ISku } from '@webpackages/model';
import { StringColumn, TimestampEntity, Entity } from '@webpackages/typeorm';

@Entity()
export class Sku extends TimestampEntity implements ISku {
  @StringColumn({ unique: true }) sku!: string;
  @StringColumn({ unique: true }) barcode!: string;
}
