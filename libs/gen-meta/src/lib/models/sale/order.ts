import {
  CurrencyProperty,
  LongTextProperty,
  Model,
  OwnerRelation,
  PositiveNumberProperty,
} from '@webpackages/meta';
import { SkuModel } from '../inventory';
import { CartModel } from './cart';

export const OrderModel: Model = {
  modelName: 'Order',
  properties: {
    quantity: PositiveNumberProperty({ required: true, icon: 'quantity' }),
    total: CurrencyProperty({ required: true }),
    subTotal: CurrencyProperty({ required: true }),
    tax: CurrencyProperty({ required: true }),
    description: LongTextProperty({
      description: 'Order description or notes',
    }),
  },
  relations: {
    sku: OwnerRelation(SkuModel),
    cart: OwnerRelation(CartModel),
  },
};
