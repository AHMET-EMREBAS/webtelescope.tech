import {
  BooleanProperty,
  DescriptionProperty,
  Model,
  OwnerRelation,
} from '@webpackages/meta';
import { CustomerModel } from '../customer';
import { StoreModel, UserModel } from '../common';

export const CartModel: Model = {
  modelName: 'Cart',
  properties: {
    description: DescriptionProperty(),
    checked: BooleanProperty({ description: 'Is chart checked out or not?' }),
  },
  relations: {
    customer: OwnerRelation(CustomerModel),
    employee: OwnerRelation(UserModel),
    store: OwnerRelation(StoreModel),
  },
};
