import { IID, ITimestamp } from '../../common';

/**
 * Store the name of subscriptions.
 * Some applications provide multiple subscription types like basic, medium, advance, gold, premium etc.
 * @param id {@link IID.id}
 * @param subscriptionName {@link subscriptionName}
 * @param description {@link description}
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface ISubscription extends ITimestamp, IID {
  subscriptionName: string;
  description: string;
}
