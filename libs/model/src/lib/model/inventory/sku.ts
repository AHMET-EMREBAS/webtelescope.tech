import { IID, IName, ITimestamp } from '../../common';

/**
 * Product variant based on size, color, or any product specification
 * @param id {@link IID.id}
 * @param name {@link IName.name}
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface ISku extends IName, ITimestamp, IID {
  /**
   * Unique barcode
   */
  barcode: string;
}
