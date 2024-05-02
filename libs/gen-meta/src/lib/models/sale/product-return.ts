import {
  LongTextProperty,
  Model,
  OwnerRelation,
  PositiveNumberProperty,
} from '../../core';
import { UserModel } from '../user';
import { OrderModel } from './order';

export const ProductReturn: Model = {
  modelName: 'ProductReturn',
  properties: {
    description: LongTextProperty({ required: true }),
    quantity: PositiveNumberProperty({ required: true }),
  },
  relations: {
    order: OwnerRelation(OrderModel),
    employee: OwnerRelation(UserModel),
  },
};
