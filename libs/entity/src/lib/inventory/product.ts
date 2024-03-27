import { IProduct } from '@webpackages/model';
import {
  NameDescriptionEntity,
  UniqueTextColumn,
  WithTimestampEntity,
} from '../common';
import { Entity } from 'typeorm';

@Entity()
export class Product
  extends WithTimestampEntity(NameDescriptionEntity)
  implements IProduct
{
  @UniqueTextColumn() barcode!: string;
}
