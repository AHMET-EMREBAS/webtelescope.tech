import { IID, IOwner } from '../../common';

/**
 * Store order
 * @param id {@link IID.id}
 * @param owner {@link IOwner.owner} ShoppingCart
 */
export interface IOrder<Sku, Owner extends IID> extends IID, IOwner<Owner> {
  /**
   * Associated sku
   */
  sku: Sku;

  /**
   * Quantity of the item
   */
  quantity: number;
}
