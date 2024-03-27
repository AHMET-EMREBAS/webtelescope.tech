import { IID } from '../../common';

/**
 * @param id {@link IID.id}
 * @param href {@link href}
 * @param owner {@link Owner}
 */
export interface ILink<Owner> extends IID {
  /**
   * Url
   */
  href: string;
  
  /**
   * Owner of the link
   */
  owner: Owner;
}
