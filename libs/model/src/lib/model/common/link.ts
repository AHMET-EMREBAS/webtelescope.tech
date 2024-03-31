import { IID } from '../../common';

/**
 * @param id {@link IID.id}
 * @param href {@link url}
 * @param owner {@link Owner}
 */
export interface IURL<Owner> extends IID {
  /**
   * Url
   */
  url: string;
  
  /**
   * Owner of the link
   */
  owner: Owner;
}
