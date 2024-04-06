import { ISku } from '@webpackages/model';
import {
  TimestampEntity,
  Entity,
  UniqueNameColumn,
} from '@webpackages/typeorm';

@Entity()
export class Sku extends TimestampEntity implements ISku {
  @UniqueNameColumn() sku!: string;
  @UniqueNameColumn() barcode!: string;
}
