import { IID, IName, ITimestamp } from '../../common';

/**
 * @param id {@link IID.id}
 * @param name {@link IName.name}
 * @param barcode {@link barcode}
 * @param description {@link description}
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface IProduct extends IName, ITimestamp, IID {
  /**
   * Unique barcode
   */
  barcode: string;

  /**
   * Description
   */
  description: string;
}
