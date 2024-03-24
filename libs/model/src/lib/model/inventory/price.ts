import { IID, ITimestamp } from '../../common';

/**
 * @param id {@link IID.id}
 * @param price {@link price}
 * @param cost {@link cost}
 * @param sku {@link sku}
 * @param priceLevel {@link priceLevel}
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface IPrice<PriceLevel, Sku> extends ITimestamp, IID {
  /**
   * Product price for the associated price-level and sku
   */
  price: number;

  /**
   * Product cost for the associated price-level and sku
   */
  cost: number;

  /**
   * Associated sku
   */
  sku: Sku;

  /**
   * Associated price-level
   */
  priceLevel: PriceLevel;
}
