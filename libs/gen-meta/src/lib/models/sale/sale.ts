import {
  CurrencyProperty,
  Model,
  OwnerRelation,
  PositiveNumberProperty,
} from '@webpackages/meta';
import { CartModel } from './cart';
import { CustomerModel } from '../customer';

export const SaleModel: Model = {
  modelName: 'Sale',
  properties: {
    total: CurrencyProperty({ required: true }),
    subtotal: CurrencyProperty({ required: true }),
    tax: CurrencyProperty({ required: true }),
    discount: PositiveNumberProperty(),
  },
  relations: {
    cart: OwnerRelation(CartModel),
    customer: OwnerRelation(CustomerModel),
  },
};
