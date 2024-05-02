import {
  BooleanProperty,
  DescriptionProperty,
  Model,
  OwnerRelation,
} from '../../core';
import { CustomerModel } from '../customer';
import { StoreModel } from '../common';
import { UserModel } from '../user';

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
