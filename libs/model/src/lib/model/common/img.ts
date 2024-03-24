import { IID, IName } from '../../common';
import { IOwner } from '../../common/owner';

/**
 * Store image name and url
 * @param id {@link IName.id}
 * @param name {@link IName.name}
 * @param owner {@link IOwner.owner}
 */
export interface IImg<Owner extends IID> extends IID, IName, IOwner<Owner> {
  /**
   * Image location url
   */
  href: string;
}
