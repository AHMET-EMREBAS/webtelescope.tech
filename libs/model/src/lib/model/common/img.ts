import { IID } from '../../common';
import { IURL } from './link';

/**
 * Store image name and url
 * @param id {@link IURL.id}
 * @param imageName {@link imageName}
 * @param href {@link IURL.url}
 * @param owner {@link Owner}
 */
export interface IImg<Owner extends IID> extends IURL<Owner> {
  /**
   * Image name or description.
   */
  imageName: string;

  /**
   * Whose image is this?
   */
  owner: Owner;
}
