import { IID, IOwner } from '../../common';

/**
 * Extra information about the associated entity such us product details, sku details etc.
 * @param details {@link record}
 * @param id {@link IID.id}
 * @param owner {@link IID.owner}
 */
export interface IRecord<Owner extends IID> extends IID, IOwner<Owner> {
  /**
   * JSON data
   */
  record: Record<string, string>;
}
