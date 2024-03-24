import { IID, ITimestamp } from '../../common';

/**
 * @param id {@link IID.id}
 * @param quantity {@link quantity}
 * @param store {@link Store}
 * @param sku {@link Sku}
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface IQuantity<Sku, Store> extends ITimestamp, IID {
  /**
   * Quantity of the associated product in the associated store.
   */
  quantity: number;

  /**
   * Associated sku entity
   */
  sku: Sku;

  /**
   * Associated store entity
   */
  store: Store;
}
