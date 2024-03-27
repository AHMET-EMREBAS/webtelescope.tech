import { IID } from '../../common';

/**
 * Store the name of subscriptions.
 * Some applications provide multiple subscription types like basic, medium, advance, gold, premium etc.
 * @param id {@link IID.id}
 * @param subscriptionName {@link subscriptionName}
 */
export interface ISubscription extends IID {
  subscriptionName: string;
}
