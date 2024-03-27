import { IID, ITimestamp } from '../../common';

/**
 * Product variant based on size, color, or any product specification
 * @param id {@link IID.id}
 * @param sku {@link sku}
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface ISku extends ITimestamp, IID {
  /**
   * Stack tracing unit number/code
   */
  sku: string;
  /**
   * Unique barcode
   */
  barcode: string;
}
