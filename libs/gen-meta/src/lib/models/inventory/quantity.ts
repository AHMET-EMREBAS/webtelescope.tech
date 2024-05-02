import { Model, OwnerRelation, PositiveNumberProperty } from '../../core';
import { StoreModel } from '../common';
import { SkuModel } from './sku';

export const QuantityModel: Model = {
  modelName: 'Quantity',
  properties: {
    quanitty: PositiveNumberProperty({
      required: true,
      description: 'Quantity of the Product-Sku in the store.',
    }),
  },
  relations: {
    sku: OwnerRelation(SkuModel),
    store: OwnerRelation(StoreModel),
  },
};
