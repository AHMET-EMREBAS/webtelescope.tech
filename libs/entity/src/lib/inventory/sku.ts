import { ISku } from '@webpackages/model';
import { NameColumn, TextColumn, TimestampEntity } from '../common';
import { Entity } from 'typeorm';

@Entity()
export class Sku extends TimestampEntity implements ISku {
  @NameColumn() sku!: string;
  @TextColumn() barcode!: string;
}
