import { IID, IName, ITimestamp } from '../../common';

/**
 * @param id {@link IID.id}
 * @param name {@link IName.name}
 * @param priceLevel {@link PriceLevel}
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface IStore<PriceLevel> extends IName, ITimestamp, IID {
  /**
   * Each store is associated with a price level
   */
  priceLevel: PriceLevel;
}
