import { IID } from '../../common';

/**
 * Extra information about the associated entity such us product details, sku details etc.
 * @param id {@link IID.id}
 * @param details {@link record}
 * @param record {@link record}
 * @param owner {@link owner}
 */
export interface IRecord<Owner extends IID> extends IID {
  /**
   * JSON data
   */
  record: Record<string, string>;

  /**
   * Whose record is this?
   */
  owner: Owner;
}
