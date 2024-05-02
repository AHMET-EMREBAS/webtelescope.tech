import { Model, OwnerRelation, PositiveNumberProperty } from '../../core';
import { PriceLevel } from '../common';
import { ProductModel } from './product';

export const PriceModel: Model = {
  modelName: 'Price',
  properties: {
    price: PositiveNumberProperty({ required: true, description: 'Price' }),
    cost: PositiveNumberProperty({ required: true, description: 'Cost' }),
  },
  relations: {
    priceLevel: OwnerRelation(PriceLevel),
    product: OwnerRelation(ProductModel),
  },
};
