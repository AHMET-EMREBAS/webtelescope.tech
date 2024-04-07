import { IID, ITimestamp } from '../../common';

/**
 * ShopingCart is associated with one/many orders and an owner( customer )
 * @param id {@link IID.id}
 * @param customer {@link customer}
 */
export interface IShoppingCart<Customer extends IID> extends IID, ITimestamp {
  /**
   * Associated customer
   */
  customer: Customer;
}
