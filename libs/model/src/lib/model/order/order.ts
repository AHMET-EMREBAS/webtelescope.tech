import { IID, ITimestamp } from '../../common';

/**
 * Store order
 * @param id {@link IID.id}
 * @param owner {@link IOwner.owner} ShoppingCart
 */
export interface IOrder<Sku extends IID, ShoppingCart extends IID> extends ITimestamp {
  /**
   * Associated sku
   */
  sku: Sku;

  /**
   * Associated shopping cart
   */
  shoppingCart: ShoppingCart;

  /**
   * Quantity of the item
   */
  quantity: number;
}
