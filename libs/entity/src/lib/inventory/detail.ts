import {
  IDEntity,
  ObjectColumn,
  OwnerRelation,
  Entity,
} from '@webpackages/typeorm';
import { Sku } from './sku';

@Entity()
export class Detail extends IDEntity {
  @ObjectColumn() detail!: string;
  @OwnerRelation(Sku) sku!: Sku;
}
