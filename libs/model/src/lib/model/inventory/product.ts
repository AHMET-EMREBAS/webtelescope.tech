import { IID, ITimestamp } from '../../common';

/**
 * @param id {@link IID.id}
 * @param productName {@link productName}
 * @param productDescription {@link productDescription}
 * @param barcode {@link barcode}
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface IProduct extends ITimestamp, IID {
  productName: string;
  productDescription: string;
  barcode: string;
}
