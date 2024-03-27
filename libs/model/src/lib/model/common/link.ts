import { IID } from '../../common';

/**
 * @param id {@link IID.id}
 * @param href {@link href}
 */
export interface ILink extends IID {
  href: string;
}
