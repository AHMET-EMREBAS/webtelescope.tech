import { IID, ITimestamp } from '../../common';

/**
 * @param id {@link IID.id}
 * @param storeName {@link storeName}
 * @param priceLevel {@link PriceLevel}
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface IStore<PriceLevel> extends ITimestamp, IID {
  storeName: string;
  /**
   * Each store is associated with a price level
   */
  priceLevel: PriceLevel;
}
