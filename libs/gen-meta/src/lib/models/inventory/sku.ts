import {
    BarcodeProperty,
  LongTextProperty,
  Model,
  OwnerRelation,
  ShortTextProperty,
  UniqueNameProperty,
} from '../../core';
import { ProductModel } from './product';

export const SkuModel: Model = {
  modelName: 'Sku',
  properties: {
    barcode: BarcodeProperty(),
    sku: ShortTextProperty({ required: true, unique: true }),
    name: UniqueNameProperty(),
    description: LongTextProperty(),
  },
  relations: {
    product: OwnerRelation(ProductModel),
  },
};
