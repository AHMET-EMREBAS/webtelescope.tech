import { IID } from '../../common';
import { ILink } from './link';

/**
 * Store image name and url
 * @param id {@link ILink.id}
 * @param imageName {@link imageName}
 * @param href {@link ILink.href}
 * @param owner {@link Owner}
 */
export interface IImg<Owner extends IID> extends ILink<Owner> {
  /**
   * Image name or description.
   */
  imageName: string;

  /**
   * Whose image is this?
   */
  owner: Owner;
}
